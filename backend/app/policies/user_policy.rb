# Authorization for authenticated user
class UserPolicy < ApplicationPolicy
  pre_check :require_user, :allow_admin

  def admin? # rubocop:disable Rails/Delegate
    user.admin?
  end

  def manage_events?
    Permission.exists?(user:, action: %i[read manage])
  end
end
