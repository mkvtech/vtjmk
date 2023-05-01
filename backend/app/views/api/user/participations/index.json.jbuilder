json.array! @participations do |participation|
  json.id participation.id.to_s
  json.extract! participation, *%i[status submission_title submission_description created_at updated_at]

  json.user_id participation.user_id.to_s
  json.user do
    json.id participation.user.id.to_s
    json.avatar_url user_avatar_full_url(participation.user)
    json.extract! participation.user, *%i[email full_name]
  end

  json.event_id participation.event_id.to_s
  json.event do
    json.id participation.event.id.to_s
    json.conference_id participation.event.conference_id.to_s
    json.extract! participation.event, *%i[title date registration_from registration_to status]
  end

  json.reviewer_id participation.reviewer_id.to_s
  if participation.reviewer.present?
    json.reviewer do
      json.id participation.reviewer.id.to_s
      json.avatar_url user_avatar_full_url(participation.reviewer)
      json.extract! participation.reviewer, *%i[email full_name]
    end
  else
    json.reviewer nil
  end
end
