module Api
  # :nodoc:
  class ParticipationsController < ApplicationController
    before_action :require_authenticated_user

    def show
      @participation = Participation.find(params[:id])
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
      @participation = Participation.find(params[:id])
      authorize! @participation

      if @participation.update(params.permit(:submission_title, :submission_description))
        # Add/Attach files
        @participation.submission_files.attach(params[:submission_files_new].pluck(:file))

        # Remove/Purge files
        attachment_ids_to_purge = params[:submission_files_persisted].select { _1[:remove] == 'true' }.pluck(:id)

        @participation
          .submission_files
          .where(id: attachment_ids_to_purge)
          .each(&:destroy)

        render :show, status: :ok, location: api_participation_url(@participation)
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
