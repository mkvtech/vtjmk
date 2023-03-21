module Api
  # Handles requests for Event model
  class EventsController < ApplicationController
    before_action :set_event, only: %i[show update destroy]

    def index # rubocop:disable Metrics/AbcSize
      @events = Event.all
      @events = @events.where(conference_id: params[:conference_id]) if params[:conference_id].present?
      @events = @events.where(date: params[:from]..) if params[:from].present?
      @events = @events.where(date: ..params[:to]) if params[:to].present?
    end

    def show; end

    def create
      @event = Event.new(event_params)

      if @event.save
        render :show, status: :created, location: api_event_url(@event)
      else
        render json: { errors: @event.errors }, status: :unprocessable_entity
      end
    end

    def update
      if @event.update(event_params)
        render :show, status: :ok, location: api_event_url(@event)
      else
        render json: { errors: @event.errors }, status: :unprocessable_entity
      end
    end

    def destroy
      @event.destroy
    end

    private

    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.permit(
        :title, :description, :date, :participants_limit, :attendees_limit, :conference_id, :registration_from,
        :registration_to
      )
    end
  end
end
