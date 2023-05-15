# Automatically assigns reviewers to a participation request taking into account their availability
class AutoAssignReviewers
  method_object %i[participation!]

  delegate :event, to: :participation, private: true

  def call
    return if reviews_to_create_count.nil? || reviews_to_create_count.zero?

    reviewers_sorted_by_availability.limit(reviews_to_create_count).each do |reviewer|
      participation.reviews.create!(user: reviewer)
    end
  end

  def reviewers_sorted_by_availability
    event.reviewers.left_joins(:reviews).group(:id).order('COUNT(reviews.id) ASC')
  end

  def reviews_to_create_count
    event.auto_assign_reviewers_count
  end
end
