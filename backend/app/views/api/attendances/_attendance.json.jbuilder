json.id attendance.id.to_s
json.user_id attendance.user_id.to_s
json.event_id attendance.event_id.to_s

json.extract! attendance, :status, :created_at, :updated_at
json.url api_attendance_url(attendance, format: :json)
