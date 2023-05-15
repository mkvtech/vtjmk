# Review model authorization
class ReviewPolicy < ApplicationPolicy
  pre_check :require_user, :allow_admin

  def update?
    reviewer?
  end

  def destroy?
    manage_conference?
  end

  def reviewer?
    record.user_id == user.id
  end

  def manage_conference?
    event = record.participation.event
    Permission.exists?(user:, target: [event, event.conference], action: %i[manage])
  end
end
