# :nodoc:
module ApplicationHelper
  def user_avatar_full_url(user)
    GenerateAvatarUrl.call(username: user.full_name)
  end
end
