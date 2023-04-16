module Api
  # :nodoc:
  class PermissionsController < ApplicationController
    before_action :require_authenticated_user

    def index
      authorize! with: PermissionPolicy
      @permissions = Permission.includes(:user, :target).all
    end

    def show
      @permission = Permission.includes(:user, :target).find(params[:id])
      authorize! @permission, with: PermissionPolicy
    end

    def create
      authorize! with: PermissionPolicy

      @permission = Permission.new(**params.permit(:user_id, :action, :target_type, :target_id))

      if @permission.save
        render :show, status: :created, location: api_permission_url(@permission)
      else
        render json: @permission.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @permission = Permission.find(params[:id])
      authorize! @permission, with: PermissionPolicy
      @permission.destroy
    end
  end
end
