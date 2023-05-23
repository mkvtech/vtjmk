# :nodoc:
class DocumentTemplatePolicy < ApplicationPolicy
  pre_check :require_user, :allow_admin

  def show?
    conference_manage?
  end

  def destroy?
    conference_manage?
  end

  def conference_manage?
    Permission.exists?(user:, target_id: record.conference_id, target_type: 'Conference', action: :manage)
  end
end
