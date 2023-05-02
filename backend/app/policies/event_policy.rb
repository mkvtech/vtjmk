# :nodoc:
class EventPolicy < ApplicationPolicy
  # TODO: Rename to attendances_index?
  def view_attendances?
    read_or_manage?
  end

  def participate?
    require_user

    record.registration_from <= current_date && current_date <= record.registration_to
  end

  def participations_index?
    read_or_manage?
  end

  def reviewers_manage?
    manage?
  end

  def show?
    record.open? || manage?
  end

  def update?
    manage?
  end

  def manage?
    require_user
    allow_admin

    Permission.exists?(user:, target: [record, record.conference], action: %i[manage])
  end

  def read_or_manage?
    require_user
    allow_admin

    Permission.exists?(user:, target: [record, record.conference], action: %i[read manage])
  end

  private

  def current_date
    Time.zone.today
  end
end
