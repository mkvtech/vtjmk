# User
class User < ApplicationRecord
  has_secure_password

  has_many :participations, dependent: :restrict_with_exception
  has_many(
    :reviewing_participations,
    class_name: 'Participation',
    dependent: :restrict_with_exception,
    inverse_of: 'reviewer'
  )

  validates :email, uniqueness: true, presence: true
  validates :password, length: { minimum: 8 }, allow_nil: true
  validates :full_name, presence: true

  enum privilege_level: { default: 'default', admin: 'admin' }
end
