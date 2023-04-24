json.array! @users do |user|
  json.id user.id.to_s
  json.extract! user, :email, :full_name
end
