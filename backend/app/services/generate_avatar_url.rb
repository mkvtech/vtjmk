# Generates full URL to an avatar
class GenerateAvatarUrl
  include LetterAvatar::AvatarHelper

  method_object %i[username!]

  def call
    base_url = ENV.fetch('AVATAR_BASE_URL', nil)
    return letter_avatar_url(username, 64) if base_url.blank?

    URI.join(base_url, letter_avatar_url(username, 64))
  end
end
