# :nodoc:
class DocumentTemplate < ApplicationRecord
  belongs_to :conference
  has_one_attached :docx
end
