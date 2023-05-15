module Api
  # Handles Review actions
  class ReviewsController < ApplicationController
    before_action :set_review

    def update
      authorize! @review

      if @review.update(params.permit(:status, :comment))
        render :show, status: :ok, location: api_review_url(@review)
      else
        render json: { errors: serialize_errors(@review.errors) }, status: :unprocessable_entity
      end
    end

    def destroy
      authorize! @review.participation, to: :reviews_destroy?, with: ParticipationPolicy
      @review.destroy
    end

    private

    def set_review
      @review = Review.includes(:user, participation: :event).find(params[:id])
    end
  end
end
