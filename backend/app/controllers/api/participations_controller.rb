module Api
  # :nodoc:
  class ParticipationsController < ApplicationController
    before_action :require_authenticated_user
    before_action :set_participation, only: %i[show update update_status]

    def show
      authorize! @participation
    end

    def create
      authorize!
      @participation = Participation.new(
        status: 'pending', user: current_user,
        **params.permit(:event_id, :submission_title, :submission_description, submission_files: [])
      )

      if @participation.save
        render :show, status: :created, location: api_participation_url(@participation)
      else
        render json: @participation.errors, status: :unprocessable_entity
      end
    end

    def update
      authorize! @participation

      if @participation.update(params.permit(:submission_title, :submission_description))
        Participations::UpdateAttachments.call(
          participation: @participation,
          params: params.slice(:submission_files_new, :submission_files_persisted)
        )

        render :show, status: :ok, location: api_participation_url(@participation)
      else
        render json: @participation.errors, status: :unprocessable_entity
      end
    end

    def update_status
      authorize! Event.find(@participation.event_id), to: :manage?, with: EventPolicy

      unless @participation.update(params.permit(:status))
        return render json: @participation.errors, status: :unprocessable_entity
      end

      render :show, status: :ok, location: api_participation_url(@participation)
    end

    private

    def set_participation
      @participation = Participation.find(params[:id])
    end
  end
end
