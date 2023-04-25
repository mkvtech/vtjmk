module Api
  module Events
    # :nodoc:
    class ReviewersController < ApplicationController
      before_action :require_authenticated_user

      def index
        event = Event.includes(:reviewers, event_reviewers: :reviewer).find(params[:event_id])
        authorize! event, to: :reviewers_manage, with: EventPolicy
        @event_reviewers = event.event_reviewers
      end

      def create
        event = Event.find(params[:event_id])
        authorize! event, to: :reviewers_manage, with: EventPolicy

        @event_reviewer = EventReviewer.new(params.permit(:event_id, :reviewer_id))

        if @event_reviewer.save
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
