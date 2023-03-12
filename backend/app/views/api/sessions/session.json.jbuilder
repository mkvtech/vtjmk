json.user do
  json.partial!('api/users/user', user:)
end
json.jwt jwt
