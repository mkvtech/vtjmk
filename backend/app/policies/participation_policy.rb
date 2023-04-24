# :nodoc:
class ParticipationPolicy < ApplicationPolicy
  pre_check :require_user, :allow_admin

  def create?
    true
  end

  def show?
    participant? || manage_conference?
  end

  def comment?
    participant? || manage_conference?
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

  private

  def participant?
    record.user_id == user.id
  end

  def manage_conference?
    Permission.exists?(user:, target: [record.event, record.event.conference], action: %i[manage])
  end
end
