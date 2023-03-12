json.extract!(
  event,
  *%i[id title description date participants_limit attendees_limit conference_id created_at updated_at]
)
json.url api_event_url(event, format: :json)
