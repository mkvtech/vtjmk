# :nodoc:
class EventPolicy < ApplicationPolicy
  pre_check :require_user, :allow_admin

  # TODO: Rename to attendances_index?
  def view_attendances?
    read_or_manage?
  end

  def participations_index?
    read_or_manage?
  end

  def reviewers_manage?
    manage?
  end

  def update?
    manage?
  end

  def manage?
    Permission.exists?(user:, target: [record, record.conference], action: %i[manage])
  end

  def read_or_manage?
    Permission.exists?(user:, target: [record, record.conference], action: %i[read manage])
  end
end
