module Api
  module Events
    # :nodoc:
    class ParticipationsController < ApplicationController
      require_authenticated_user only: %i[index]

      def index
        authorize! Event.find(params[:event_id]), to: :manage?, with: EventPolicy
        @participations = Participation.where(event_id: params[:event_id]).includes(:user)
      end
    end
  end
end
