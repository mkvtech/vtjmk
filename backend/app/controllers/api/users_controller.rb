module Api
  # Users Controller
  class UsersController < ApplicationController
    before_action :require_authenticated_user

    def index
      @users = ::User.all
    end
  end
end
