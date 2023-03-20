# User
class User < ApplicationRecord
  has_secure_password

  validates :email, uniqueness: true, presence: true
  validates :password, length: { minimum: 8 }, allow_nil: true
  validates :full_name, presence: true

  enum privilege_level: { default: 'default', admin: 'admin' }
end
