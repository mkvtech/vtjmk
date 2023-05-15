module Api
  module User
    # :nodoc:
    class ReviewsController < ApplicationController
      before_action :require_authenticated_user

      def index
        @reviews = Review.includes(:user, participation: %i[event user]).where(user: current_user)
      end
    end
  end
end
