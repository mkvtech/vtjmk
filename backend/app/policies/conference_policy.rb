# :nodoc:
class ConferencePolicy < ApplicationPolicy
  pre_check :require_user, :allow_admin

  def document_templates_create?
    manage?
  end

  def manage?
    Permission.exists?(user:, target: record, action: :manage)
  end
end
