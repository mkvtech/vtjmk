# Automatically updates participation status if *all* associated reviews were approved or rejected
# and participation didn't have status before
class AutoUpdateParticipationStatus
  method_object %i[participation!]

  def call
    return unless participation.pending?
    return if reviews_statuses.empty?
    return if reviews_statuses.uniq.count != 1

    participation.update!(status: reviews_statuses.first)
  end

  def reviews_statuses
    @reviews_statuses ||= participation.reviews.map(&:status)
  end
end
