module Api
  module User
    # :nodoc:
    class ParticipationsController < ApplicationController
      def index
        @participations = Participation.includes(:event).where(user: current_user)
        @participations = @participations.where(event_id: params[:event_id]) if params[:event_id].present?
      end
    end
  end
end
