# :nodoc:
class ParticipationPolicy < ApplicationPolicy
  pre_check :require_user, :allow_admin

  def show?
    participant? || reviewer? || manage_conference?
  end

  def generate_certificate?
    participant? && record.approved?
  end

  def comment?
    participant? || reviewer? || manage_conference?
  end

  def update?
    participant? || manage_conference?
  end

  def update_status?
    manage_conference?
  end

  def update_reviewer?
    manage_conference?
  end

  def destroy?
    manage_conference?
  end

  def reviews_index?
    participant? || reviewer? || manage_conference?
  end

  def reviews_create?
    manage_conference?
  end

  def reviews_destroy?
    manage_conference?
  end

  private

  def participant?
    record.user_id == user.id
  end

  def reviewer?
    record.reviewer_id == user.id || record.reviews.any? { |review| review.user_id == user.id }
  end

  def manage_conference?
    Permission.exists?(user:, target: [record.event, record.event.conference], action: %i[manage])
  end
end
