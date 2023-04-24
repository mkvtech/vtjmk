# Participation model
class Participation < ApplicationRecord
  belongs_to :user
  belongs_to :reviewer, class_name: 'User', inverse_of: :reviewing_participations, optional: true
  belongs_to :event

  enum status: { pending: 'pending', approved: 'approved', rejected: 'rejected' }

  has_many_attached :submission_files

  validates :status, presence: true
end
