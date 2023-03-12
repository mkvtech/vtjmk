module Api
  module Events
    # :nodoc:
    class AttendancesController < ApplicationController
      require_authenticated_user only: %i[index]

      def index
        authorize! Event.find(params[:event_id]), to: :view_attendances?, with: EventPolicy
        @attendances = Attendance.where(event_id: params[:event_id])
        render 'api/events/attendances/index'
      end
    end
  end
end
