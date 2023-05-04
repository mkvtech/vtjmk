# Generates full URL to an avatar
class GenerateAvatarUrl
  include LetterAvatar::AvatarHelper

  method_object %i[username!]

  def call
    URI.join(root_url, letter_avatar_url(username, 64))
  end

  def root_url
    # TODO: Use ENV['ROOT_URL']
    'http://localhost:3000/'
  end
end
