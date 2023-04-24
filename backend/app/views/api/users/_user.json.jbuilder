json.id user.id.to_s
json.avatar_url "#{root_url}#{letter_avatar_url(user.full_name, 64)}"
json.extract! user, :full_name, :email, :created_at, :updated_at
json.url api_user_url(user, format: :json)
