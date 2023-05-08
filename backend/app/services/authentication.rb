# Handles authentication process for inside
class Authentication
  SECRET_KEY = Rails.application.secret_key_base.to_s
  JWT_EXPIRATION_LENGTH = Rails.env.development? ? 1.year : 2.hours
  JWT_ALGORITHM = 'HS256'.freeze

  def self.create_jwt(user_id:)
    payload = { id: user_id, exp: JWT_EXPIRATION_LENGTH.from_now.to_i }
    JWT.encode(payload, SECRET_KEY, JWT_ALGORITHM)
  end

  def self.jwt_to_user_id(jwt)
    JWT.decode(jwt, SECRET_KEY, true, { algorithm: JWT_ALGORITHM }).first['id']
  end
end
