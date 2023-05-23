# Review model authorization
class ReviewPolicy < ApplicationPolicy
  pre_check :require_user, :allow_admin

  def update?
    reviewer?
  end

  def reviewer?
    record.user_id == user.id
  end
end
