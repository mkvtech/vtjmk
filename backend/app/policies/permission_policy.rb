# :nodoc:
class PermissionPolicy < ApplicationPolicy
  pre_check :require_user, :allow_admin

  def index?
    false
  end

  def create?
    false
  end

  def destroy?
    false
  end
end
