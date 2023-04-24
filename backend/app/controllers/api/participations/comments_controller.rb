module Api
  module Participations
    # :nodoc:
    class CommentsController < ApplicationController
      before_action :require_authenticated_user
      before_action :set_participation

      def index
        authorize! @participation, to: :show?, with: ParticipationPolicy
        @comments = @participation.comments
      end

      def create
        authorize! @participation, to: :comment?, with: ParticipationPolicy

        @comment = Comment.new(new_comment_params)

        if @comment.save
          render :show, status: :created
        else
          render json: @comment.errors, status: :unprocessable_entity
        end
      end

      private

      def set_participation
        @participation = Participation.includes(:comments).find(params[:participation_id])
      end

      def new_comment_params
        {
          user_id: current_user.id,
          commentable_type: 'Participation',
          commentable_id: params[:participation_id],
          text: params[:text]
        }
      end
    end
  end
end
