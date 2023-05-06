module Api
  # Handles requests for Event model
  class EventsController < ApplicationController
    before_action :set_event, only: %i[show update update_participations_order]

    def index # rubocop:disable Metrics/AbcSize
      @events = Event.order(:date).where(status: :open)
      @events = @events.where(conference_id: params[:conference_id]) if params[:conference_id].present?
      @events = @events.where(date: params[:from]..) if params[:from].present?
      @events = @events.where(date: ..params[:to]) if params[:to].present?
    end

    def show
      render status: :not_found unless allowed_to? :show?, @event
    end

    def update
      authorize! @event

      event_params = params.permit(
        :title, :description, :date, :participants_limit, :registration_from, :registration_to, :status
      )

      if @event.update(event_params)
        render :show, status: :ok, location: api_event_url(@event)
      else
        render json: { errors: serialize_errors(@event.errors) }, status: :unprocessable_entity
      end
    end

    def update_participations_order
      authorize! @event

      participations_input = params.require(:participations_order)
      Participation.transaction do
        @event.participations.each do |participation|
          participation_input = participations_input.fetch(participation.id.to_s, {})
          participation.update(order: participation_input[:order])
        end
      end

      render :show, status: :ok, location: api_event_url(@event)
    end

    private

    def set_event
      @event = Event.includes(participations: :user).find(params[:id])
    end
  end
end
