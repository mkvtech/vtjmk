# Base controller for all controllers in this app
class ApplicationController < ActionController::Base
  skip_forgery_protection

  rescue_from ActionPolicy::Unauthorized do
    head :forbidden
  end

  def self.require_authenticated_user(only:)
    before_action only: do
      next unless current_user.nil?

      render json: { errors: [{ type: 'not_authenticated', fullMessage: 'Not authenticated' }] }, status: :unauthorized
    end
  end

  def current_user
    return @current_user if defined?(@current_user)

    @current_user = begin
      encoded_jwt = request.headers['Authorization']&.split&.second
      id = Authentication.jwt_to_user_id(encoded_jwt)
      User.find(id)
    rescue JWT::DecodeError
      nil
    end
  end

  def serialize_errors(errors)
    errors.map do |error|
      {
        path: error.attribute.to_s.camelcase(:lower),
        type: error.type,
        message: error.message,
        full_message: error.full_message,

        **error.details
      }
    end
  end
end
