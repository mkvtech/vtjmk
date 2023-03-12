# Utilities for RSpec tests
module HelperMethods
  def json_response
    return JSON.parse(response.body, symbolize_names: true) if response.body.present?

    nil
  end

  def auth_headers_for(user)
    user_id = user.is_a?(Integer) ? user : user.id
    token = Authentication.create_jwt(user_id:)

    { 'Authorization' => "Bearer #{token}" }
  end
end
