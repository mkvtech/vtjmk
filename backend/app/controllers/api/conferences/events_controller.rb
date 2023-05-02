module Api
  module Conferences
    # :nodoc:
    class EventsController < ApplicationController
      before_action :require_authenticated_user

      def create
        @conference = Conference.find(params[:conference_id])
        authorize! @conference, to: :manage?, with: ConferencePolicy

        event_params = params.permit(:title, :description, :date, :registration_from, :registration_to)
        @event = Event.new(conference_id: params[:conference_id], **event_params)

        if @event.save
          render 'api/events/show', status: :created, location: api_event_url(@event)
        else
          render json: { errors: serialize_errors(@event.errors) }, status: :unprocessable_entity
        end
      end
    end
  end
end
