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
  has_many(:event_reviewers, dependent: :destroy, foreign_key: :reviewer_id, inverse_of: :reviewer)
  has_many(:reviewing_events, through: :event_reviewers, source: :event)

  validates :email, uniqueness: true, presence: true
  validates :password, length: { minimum: 8 }, allow_nil: true
  validates :full_name, presence: true

  enum privilege_level: { default: 'default', admin: 'admin' }

  def to_builder_simple
    Jbuilder.new do |json|
      json.id id.to_s
      json.avatar_url avatar_full_url
      json.email email
      json.full_name full_name
    end
  end

  def avatar_full_url
    GenerateAvatarUrl.call(username: full_name)
  end
end
