# :nodoc:
class EventPolicy < ApplicationPolicy
  # TODO: Rename to attendances_index?
  def view_attendances?
    user && read_or_manage?
  end

  def update?
    user && manage?
  end

  def manage?
    Permission.exists?(user:, target: [record, record.conference], action: %i[manage])
  end

  def read_or_manage?
    Permission.exists?(user:, target: [record, record.conference], action: %i[read manage])
  end
end
