# Given input of policies and actions, returns which actions are allowed
class TestPolicies
  include ActionPolicy::Behaviour

  RESOURCE_NAME_TO_CONFIG_MAP = {
    user: {
      policy_class: UserPolicy,
      general: %w[admin manage_events]
    },
    events: {
      policy_class: EventPolicy,
      resource_class: Event,
      items: %w[update participations_index]
    }
  }.freeze

  method_object %i[input! user!]

  authorize :user, through: :user

  def call
    input
      .symbolize_keys
      .select { |k| RESOURCE_NAME_TO_CONFIG_MAP.keys.include?(k) }
      .each_with_object({}) do |(resource_name, policy_input), output|
        output[resource_name] = resource_policies(
          input: policy_input.with_indifferent_access,
          config: RESOURCE_NAME_TO_CONFIG_MAP[resource_name]
        )
      end
  end

  private

  def resource_policies(input:, config:)
    output = {}

    output[:general] = general_actions(input: input[:general], config:) if input.key?(:general) && config.key?(:general)
    output[:items] = items_actions(input: input[:items], config:) if input.key?(:items) && config.key?(:items)

    output
  end

  def general_actions(input:, config:)
    input
      .map(&:underscore)
      .intersection(config[:general])
      .index_with { |action| !!allowed_to?("#{action}?", with: config[:policy_class]) }
  end

  def items_actions(input:, config:) # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
    resources = config[:resource_class].where(id: input.keys).index_by(&:id)

    input.to_h do |resource_id, actions_input|
      actions = Array(actions_input)
      resource = resources[resource_id.to_i]

      next if resource.nil?

      [
        resource_id,
        actions
          .map(&:underscore)
          .intersection(config[:items])
          .index_with { |action| !!allowed_to?("#{action}?", resource) } # rubocop:disable Style/DoubleNegation
      ]
    end
  end
end
