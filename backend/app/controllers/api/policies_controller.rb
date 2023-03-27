module Api
  # :nodoc:
  class PoliciesController < ApplicationController
    RESOURCE_NAME_TO_INPUT_MAP = {
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

    # TODO: This method will get more features in the future and then be refactored
    # rubocop:disable Metrics/AbcSize, Metrics/CyclomaticComplexity, Metrics/MethodLength, Metrics/PerceivedComplexity
    def index
      json = params.permit![:policies].to_h.each_with_object({}) do |(resource_name_string, policy_input), output|
        resource_name = resource_name_string.to_sym
        defined_input = RESOURCE_NAME_TO_INPUT_MAP[resource_name]

        policy_class = defined_input[:policy_class]

        next if policy_class.nil?

        output[resource_name] = {}

        if policy_input.key?(:general) && defined_input.key?(:general)
          output[resource_name][:general] =
            policy_input[:general]
            .map(&:underscore)
            .intersection(defined_input[:general])
            .index_with { |action| !!allowed_to?("#{action}?", with: policy_class) } # rubocop:disable Style/DoubleNegation
        end

        if policy_input.key?(:items) && defined_input.key?(:items)
          resource_class = defined_input[:resource_class]

          next if resource_class.nil?

          output[resource_name][:items] = policy_input[:items].to_h do |resource_id, actions_input|
            actions = actions_input.is_a?(String) ? [actions_input] : actions_input
            # TODO: Eager-load resources
            resource = resource_class.find_by(id: resource_id)

            next if resource.nil?

            [
              resource_id,
              actions
                .map(&:underscore)
                .intersection(defined_input[:items])
                .index_with { |action| !!allowed_to?("#{action}?", resource) } # rubocop:disable Style/DoubleNegation
            ]
          end
        end
      end

      render json: { policies: json }, status: :ok
    end
    # rubocop:enable Metrics/AbcSize, Metrics/CyclomaticComplexity, Metrics/MethodLength, Metrics/PerceivedComplexity
  end
end
