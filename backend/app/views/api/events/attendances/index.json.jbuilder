json.array! @attendances do |attendance|
  json.extract! attendance, :status, :created_at, :updated_at

  json.id attendance.id.to_s
  json.user_id attendance.user_id.to_s
  json.event_id attendance.event_id.to_s

  json.user do
    json.partial! 'api/users/user', user: attendance.user
  end
end
