module Api
  # Handles requests for Event model
  class EventsController < ApplicationController
    before_action :set_event, only: %i[show update]

    def index # rubocop:disable Metrics/AbcSize
      @events = Event.order(:date)
      @events = @events.where(conference_id: params[:conference_id]) if params[:conference_id].present?
      @events = @events.where(date: params[:from]..) if params[:from].present?
      @events = @events.where(date: ..params[:to]) if params[:to].present?
    end

    def show; end

    def update
      event_params = params.permit(
        :title, :description, :date, :participants_limit, :registration_from, :registration_to, :status
      )

      if @event.update(event_params)
        render :show, status: :ok, location: api_event_url(@event)
      else
        render json: { errors: @event.errors }, status: :unprocessable_entity
      end
    end

    private

    def set_event
      @event = Event.find(params[:id])
    end
  end
end
