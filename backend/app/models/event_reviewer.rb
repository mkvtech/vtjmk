# Join table model for Event & User (named as reviewer)
class EventReviewer < ApplicationRecord
  belongs_to :event
  belongs_to :reviewer, class_name: 'User'
end
