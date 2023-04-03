json.id event.id.to_s
json.conference_id event.conference_id.to_s
json.extract!(
  event,
  *%i[title description date participants_limit status registration_from registration_to created_at updated_at]
)
json.url api_event_url(event, format: :json)
