module Api
  module Conferences
    # :nodoc:
    class EventsController < ApplicationController
      before_action :require_authenticated_user

      def create
        @conference = Conference.find(params[:conference_id])
        authorize! @conference, to: :manage?, with: ConferencePolicy

        create_event
        copy_title_from_conference
        copy_description_from_conference

        if @event.save
          render 'api/events/show', status: :created, location: api_event_url(@event)
        else
          render json: { errors: serialize_errors(@event.errors) }, status: :unprocessable_entity
        end
      end

      private

      def create_event
        event_params = params.permit(:title, :description, :date, :registration_from, :registration_to)
        @event = Event.new(conference_id: params[:conference_id], **event_params)
      end

      def copy_title_from_conference
        return unless params[:copy_title_from_conference]

        @conference.title_backend.locales.each do |locale|
          title = @conference.title(locale:)
          @event.title_backend.write(locale, title)
        end
      end

      def copy_description_from_conference
        return unless params[:copy_description_from_conference]

        @conference.description_backend.locales.each do |locale|
          description = @conference.description(locale:)
          @event.description_backend.write(locale, description)
        end
      end
    end
  end
end
