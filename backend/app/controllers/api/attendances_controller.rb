module Api
  # AttendancesController
  class AttendancesController < ApplicationController
    require_authenticated_user only: %i[index create]
    before_action :set_attendance, only: %i[show update destroy]

    def index
      @attendances = Attendance.where(user_id: current_user.id)
      @attendances = @attendances.where(event_id: params[:event_id]) if params[:event_id].present?
    end

    def show; end

    def create
      @attendance = Attendance.new(
        { status: :pending, user_id: current_user.id, event_id: params[:event_id], comment: params[:comment] }
      )

      if @attendance.save
        render :show, status: :created, location: api_attendance_url(@attendance)
      else
        render json: @attendance.errors, status: :unprocessable_entity
      end
    end

    def update
      if @attendance.update(params.permit(:status))
        render :show, status: :ok, location: api_attendance_url(@attendance)
      else
        render json: @attendance.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @attendance.destroy
    end

    private

    def set_attendance
      @attendance = Attendance.find(params[:id])
    end
  end
end
