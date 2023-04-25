module Api
  module Events
    # :nodoc:
    class UsersController < ApplicationController
      before_action :require_authenticated_user

      def available_as_reviewers_index
        event = Event.find(params[:event_id])
        authorize! event, to: :reviewers_manage, with: EventPolicy
        @users = ::User.where.not(id: event.reviewers.select(:id))
      end
    end
  end
end
