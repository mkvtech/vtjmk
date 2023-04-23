module Api
  # :nodoc:
  class ParticipationsController < ApplicationController
    def show
      @participation = Participation.find(params[:id])
      authorize! @participation
    end

    def create
      authorize!
      @participation = Participation.new(
        status: 'pending', user: current_user,
        **params.permit(:event_id, submission_files: []) # TODO: :submissionTitle
      )

      if @participation.save
        render :show, status: :created, location: api_participation_url(@participation)
      else
        render json: @participation.errors, status: :unprocessable_entity
      end
    end

    def update_status
      @participation = Participation.find(params[:id])
      authorize! Event.find(@participation.event_id), to: :manage?, with: EventPolicy

      unless @participation.update(params.permit(:status))
        return render json: @participation.errors, status: :unprocessable_entity
      end

      render :show, status: :ok, location: api_participation_url(@participation)
    end
  end
end
