json.array! @participations do |participation|
  json.extract! participation, :status, :created_at, :updated_at

  json.id participation.id.to_s
  json.user_id participation.user_id.to_s
  json.event_id participation.event_id.to_s

  json.event do
    json.partial! 'api/events/event', event: participation.event
  end
end