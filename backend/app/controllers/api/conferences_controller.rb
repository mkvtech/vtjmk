module Api
  # ConferencesController
  class ConferencesController < ApplicationController
    before_action :set_conference, only: %i[show update destroy]

    def index
      @conferences = Conference.i18n.order(:title).all
    end

    def show; end

    def create
      @conference = Conference.new(conference_params)

      if @conference.save
        render :show, status: :created, location: api_conference_url(@conference)
      else
        render json: { errors: @conference.errors }, status: :unprocessable_entity
      end
    end

    def update
      if @conference.update(conference_params)
        render :show, status: :ok, location: api_conference_url(@conference)
      else
        render json: { errors: @conference.errors }, status: :unprocessable_entity
      end
    end

    def destroy
      @conference.destroy
    end

    private

    def set_conference
      @conference = Conference.find(params[:id])
    end

    def conference_params
      params.permit(:title, :description)
    end
  end
end
