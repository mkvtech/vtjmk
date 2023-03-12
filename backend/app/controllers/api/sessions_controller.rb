module Api
  # Handles authentication for outside
  class SessionsController < ApplicationController
    require_authenticated_user only: %i[me]

    def signup
      user = User.new(params.permit(:email, :password, :full_name))

      return render json: { errors: serialize_errors(user.errors) }, status: :unprocessable_entity unless user.save

      jwt = Authentication.create_jwt(user_id: user.id)
      render :session, locals: { jwt:, user: }
    end

    def login
      user = User.find_by(email: params[:email])

      if user.nil? || !user.authenticate(params[:password])
        error = { type: 'invalid_email_or_password', fullMessage: 'Invalid email or password' }
        return render json: { errors: [error] }, status: :unprocessable_entity
      end

      jwt = Authentication.create_jwt(user_id: user.id)
      render :session, locals: { jwt:, user: }
    end

    def me
      render partial: 'api/users/user', locals: { user: current_user }
    end
  end
end
