module Api
  module Events
    # :nodoc:
    class ReviewersController < ApplicationController
      before_action :require_authenticated_user

      def index
        event = Event.find(params[:event_id])
        authorize! event, to: :reviewers_manage, with: EventPolicy
        @reviewers = event.reviewers
      end

      def create
        event = Event.find(params[:event_id])
        authorize! event, to: :reviewers_manage, with: EventPolicy

        @event_reviewer = EventReviewer.new(params.permit(:event_id, :reviewer_id))

        if @event_reviewer.save
          @reviewer = @event_reviewer.reviewer
          render :show, status: :created
        else
          render json: @event_reviewer.errors, status: :unprocessable_entity
        end
      end

      def destroy
        event = Event.find(params[:event_id])
        authorize! event, to: :reviewers_manage, with: EventPolicy

        event_reviewer = event.event_reviewers.find_by!(reviewer_id: params[:reviewer_id])
        event_reviewer.destroy
      end
    end
  end
end
