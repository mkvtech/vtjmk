json.id event.id.to_s
json.conference_id event.conference_id.to_s
json.extract!(
  event,
  *%i[
    title description date status registration_from registration_to auto_assign_reviewers_count created_at updated_at
  ]
)
json.url api_event_url(event, format: :json)
