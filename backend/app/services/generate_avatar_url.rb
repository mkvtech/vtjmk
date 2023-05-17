# Generates full URL to an avatar
class GenerateAvatarUrl
  include LetterAvatar::AvatarHelper

  method_object %i[username!]

  def call
    letter_avatar_url(username, 64)
  end
end
