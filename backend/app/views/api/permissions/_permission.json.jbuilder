json.id permission.id.to_s
json.user_id permission.user_id.to_s
json.target_id permission.target_id.to_s
json.extract!(
  permission,
  *%i[target_type action created_at updated_at]
)

json.user do
  json.partial! 'api/users/user', user: permission.user
end

json.target do
  json.id permission.target.id.to_s
  json.title permission.target.title
end
