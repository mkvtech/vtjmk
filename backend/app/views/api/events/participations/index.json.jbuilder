json.array! @participations do |participation|
  json.id participation.id.to_s

  json.event_id participation.event_id.to_s

  json.user_id participation.user_id.to_s
  json.user do
    json.partial! 'api/users/user', user: participation.user
  end

  json.extract! participation, *%i[order time status submission_title created_at updated_at]
end
