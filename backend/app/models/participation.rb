# Participation model
class Participation < ApplicationRecord
  belongs_to :user
  belongs_to :reviewer, class_name: 'User', inverse_of: :reviewing_participations, optional: true
  belongs_to :event
  has_many :comments, as: :commentable, dependent: :destroy

  enum status: { pending: 'pending', approved: 'approved', rejected: 'rejected' }

  has_many_attached :submission_files

  validates :status, presence: true
end
