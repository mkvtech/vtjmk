module Api
  module Events
    # :nodoc:
    class ParticipationsController < ApplicationController
      before_action :require_authenticated_user, only: %i[index]

      ALLOWED_ORDER_INPUT = %w[created_at users.full_name status].freeze

      def index
        authorize! Event.find(params[:event_id]), to: :participations_index?, with: EventPolicy

        @participations = Participation.where(event_id: params[:event_id]).includes(:user)
        @participations = @participations.where(status: status_param) if status_param.present?
        @participations = @participations.order(order_param) if order_param.present?
      end

      def status_param
        params[:status]&.underscore
      end

      def order_param
        input = params[:order]&.underscore
        ALLOWED_ORDER_INPUT.include?(input) ? input : nil
      end
    end
  end
end
