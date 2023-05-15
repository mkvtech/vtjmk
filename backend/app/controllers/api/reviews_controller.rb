module Api
  # Handles Review actions
  class ReviewsController < ApplicationController
    before_action :set_review

    def update
      authorize! @review

      @review.update(params.permit(:status, :comment))
    end

    def destroy
      authorize! @review
      @review.destroy
    end

    private

    def set_review
      @review = Review.includes(:user, participation: :event ).find(params[:id])
    end
  end
end
