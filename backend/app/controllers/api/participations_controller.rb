module Api
  # :nodoc:
  class ParticipationsController < ApplicationController
    before_action :require_authenticated_user
    before_action :set_participation, only: %i[show update update_reviewer update_status destroy]

    def show
      authorize! @participation
    end

    def create
      event = Event.find(params[:event_id])
      authorize! event, to: :participate?, with: EventPolicy
      @participation = build_participation

      if @participation.save
        AutoAssignReviewers.call(participation: @participation)

        render :show, status: :created, location: api_participation_url(@participation)
      else
        render json: @participation.errors, status: :unprocessable_entity
      end
    end

    def update
      authorize! @participation

      if @participation.update(params.permit(:submission_title, :submission_description))
        ::Participations::UpdateAttachments.call(
          participation: @participation,
          params: params.slice(:submission_files_new, :submission_files_persisted)
        )

        render :show, status: :ok, location: api_participation_url(@participation)
      else
        render json: @participation.errors, status: :unprocessable_entity
      end
    end

    def update_status
      authorize! @participation

      @participation.update!(params.permit(:status))

      render :show, status: :ok, location: api_participation_url(@participation)
    end

    def update_reviewer
      authorize! @participation

      unless @participation.update(params.permit(:reviewer_id))
        return render json: @participation.errors, status: :unprocessable_entity
      end

      render :show, status: :ok, location: api_participation_url(@participation)
    end

    def destroy
      @participation.destroy
    end

    private

    def set_participation
      @participation = Participation.find(params[:id])
    end

    def build_participation
      Participation.new(
        status: 'pending', user: current_user,
        **params.permit(:event_id, :submission_title, :submission_description, submission_files: [])
      )
    end
  end
end
