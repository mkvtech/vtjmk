module Api
  module Participations
    # :nodoc:
    class ReviewsController < ApplicationController
      before_action :set_participation

      def index
        authorize! @participation, to: :reviews_index?, with: ParticipationPolicy

        @reviews = @participation.reviews
      end

      def create
        authorize! @participation, to: :reviews_create?, with: ParticipationPolicy

        @review = @participation.reviews.new(user_id: params[:user_id])

        if @review.save
          render :show, status: :created
        else
          render json: @review.errors, status: :unprocessable_entity
        end
      end

      private

      def set_participation
        @participation = Participation.includes(:reviews).find(params[:participation_id])
      end
    end
  end
end
