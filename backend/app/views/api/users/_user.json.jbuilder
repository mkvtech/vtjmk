json.id user.id.to_s
json.avatar_url user_avatar_full_url(user)
json.extract! user, :full_name, :email, :created_at, :updated_at
