# Base controller for all controllers in this app
class ApplicationController < ActionController::Base
  skip_forgery_protection

  around_action :switch_locale

  rescue_from ActionPolicy::Unauthorized do
    head :forbidden
  end

  def home
    # TODO: Send client app
    head :ok
  end

  def react_app
    render file: 'public/index.html', layout: false
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
        type: error.type.to_s.camelcase(:lower),
        message: error.message,
        full_message: error.full_message,

        **error.details
      }
    end
  end

  def require_authenticated_user
    return unless current_user.nil?

    render json: { errors: [{ type: 'not_authenticated', fullMessage: 'Not authenticated' }] }, status: :unauthorized
  end

  def require_admin
    return if current_user.admin?

    head :forbidden
  end

  def forbid_production_env
    return unless Rails.env.production?

    head :forbidden
  end

  private

  # https://guides.rubyonrails.org/i18n.html#inferring-locale-from-the-language-header
  def switch_locale(&)
    logger.debug "* Accept-Language: #{request.env['HTTP_ACCEPT_LANGUAGE']}"
    locale = request.env['HTTP_ACCEPT_LANGUAGE']&.scan(/^[a-z]{2}/)&.first || I18n.default_locale
    logger.debug "* Locale set to '#{locale}'"
    I18n.with_locale(locale, &)
  end
end
