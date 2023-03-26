module Api
  # :nodoc:
  class ParticipationsController < ApplicationController
    def create
      @participation = Participation.new(
        status: 'pending', user: current_user, event_id: params[:event_id], comment: params[:comment]
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
