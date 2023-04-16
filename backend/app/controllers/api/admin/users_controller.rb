module Api
  module Admin
    # :nodoc:
    class UsersController < ApplicationController
      before_action :require_authenticated_user, :require_admin

      def index
        @users = ::User.all
        render 'api/users/index'
      end
    end
  end
end
