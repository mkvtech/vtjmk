json.id event_reviewer.id.to_s
json.event_id event_reviewer.event_id.to_s
json.extract! event_reviewer, *%i[created_at updated_at]

json.reviewer_id event_reviewer.reviewer_id.to_s
json.reviewer do
  json.id event_reviewer.reviewer.id.to_s
  json.avatar_url user_avatar_full_url(event_reviewer.reviewer)
  json.extract! event_reviewer.reviewer, *%i[full_name email created_at updated_at]
end
