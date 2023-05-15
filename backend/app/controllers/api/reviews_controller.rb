module Api
  # Handles Review actions
  class ReviewsController
    before_action :set_review

    def update
      authorize! @review

      @review.update(params.permit(:status, :comment))
    end

    private

    def set_review
      @review = Review.includes(:user, event: { participation: :event }).find(params[:review_id])
    end
  end
end
