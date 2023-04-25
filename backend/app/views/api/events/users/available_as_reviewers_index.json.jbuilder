json.array! @users do |user|
  json.id user.id.to_s
  json.avatar_url user_avatar_full_url(user)
  json.extract! user, *%i[email full_name]
end
