json.array! @event_reviewers do |event_reviewer|
  json.id event_reviewer.id.to_s

  json.event_id event_reviewer.event_id.to_s

  json.reviewer_id event_reviewer.reviewer_id.to_s
  json.reviewer event_reviewer.reviewer.to_builder_simple

  json.extract! event_reviewer, *%i[created_at updated_at]
end
