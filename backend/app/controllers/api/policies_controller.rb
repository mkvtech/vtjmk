module Api
  # :nodoc:
  class PoliciesController < ApplicationController
    RESOURCE_NAME_TO_POLICY_CLASS_MAP = {
      events: EventPolicy
    }.freeze

    RESOURCE_NAME_TO_RESOURCE_CLASS_MAP = {
      events: Event
    }.freeze

    RESOURCE_NAME_TO_TESTABLE_ACTIONS_MAP = {
      events: %w[view_attendances update]
    }.freeze

    require_authenticated_user only: :index

    # TODO: This method will get more features in the future and then be refactored
    # rubocop:disable Metrics/AbcSize, Metrics/CyclomaticComplexity, Metrics/MethodLength, Metrics/PerceivedComplexity
    def index
      json = params.permit![:policies].to_h.each_with_object({}) do |(resource_name_string, policy_input), output|
        resource_name = resource_name_string.to_sym

        policy_class = RESOURCE_NAME_TO_POLICY_CLASS_MAP[resource_name]

        next if policy_class.nil?

        output[resource_name] = {}

        next unless policy_input.key?(:items)

        resource_class = RESOURCE_NAME_TO_RESOURCE_CLASS_MAP[resource_name]

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
              .intersection(RESOURCE_NAME_TO_TESTABLE_ACTIONS_MAP[resource_name])
              .index_with { |action| allowed_to?("#{action}?", resource) }
          ]
        end
      end

      render json: { policies: json }, status: :ok
    end
    # rubocop:enable Metrics/AbcSize, Metrics/CyclomaticComplexity, Metrics/MethodLength, Metrics/PerceivedComplexity
  end
end
