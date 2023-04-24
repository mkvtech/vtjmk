module Api
  module Participations
    # :nodoc:
    class UsersController < ApplicationController
      before_action :require_authenticated_user

      # Lists available users to review participation request
      def available_reviewers_index
        @participation = Participation.find(params[:participation_id])
        authorize! @participation, to: :update_reviewer, with: ParticipationPolicy
        @users = ::User.all
      end
    end
  end
end
