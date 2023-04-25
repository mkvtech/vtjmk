# :nodoc:
module ApplicationHelper
  include LetterAvatar::AvatarHelper

  def user_avatar_full_url(user)
    # Consider edge cases for URI#join: https://apidock.com/ruby/URI/join/class
    URI.join(root_url, letter_avatar_url(user.full_name, 64))
  end
end
