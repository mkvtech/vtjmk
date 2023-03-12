# Participations Controller
class ParticipationsController < ApplicationController
  before_action :set_participation, only: %i[show update destroy]

  # GET /participations
  # GET /participations.json
  def index
    @participations = Participation.all
  end

  # GET /participations/1
  # GET /participations/1.json
  def show; end

  # POST /participations
  # POST /participations.json
  def create
    @participation = Participation.new(participation_params)

    if @participation.save
      render :show, status: :created, location: @participation
    else
      render json: @participation.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /participations/1
  # PATCH/PUT /participations/1.json
  def update
    if @participation.update(participation_params)
      render :show, status: :ok, location: @participation
    else
      render json: @participation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /participations/1
  # DELETE /participations/1.json
  def destroy
    @participation.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_participation
    @participation = Participation.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def participation_params
    params.require(:participation).permit(:status, :user_id, :event_id)
  end
end
