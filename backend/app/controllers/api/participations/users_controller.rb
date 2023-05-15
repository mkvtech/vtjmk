module Api
  module Participations
    # :nodoc:
    class UsersController < ApplicationController
      before_action :require_authenticated_user

      # Lists available users to review participation request
      def available_reviewers_index
        participation =
          Participation
          .includes(:reviews, event: { event_reviewers: :reviewer })
          .find(params[:participation_id])

        authorize! participation, to: :update_reviewer?, with: ParticipationPolicy

        skip_user_ids = participation.reviews.map(&:user_id) + [participation.user_id]
        @event_reviewers = participation.event.event_reviewers.where.not(reviewer_id: skip_user_ids)
      end
    end
  end
end
