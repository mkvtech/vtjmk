module Api
  module Events
    # :nodoc:
    class ParticipationsController < ApplicationController
      before_action :require_authenticated_user, only: %i[index]

      def index
        authorize! Event.find(params[:event_id]), to: :participations_index?, with: EventPolicy
        @participations = Participation.where(event_id: params[:event_id]).includes(:user)
      end
    end
  end
end
