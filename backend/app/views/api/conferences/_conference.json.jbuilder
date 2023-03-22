json.id conference.id.to_s
json.extract! conference, :title, :description, :created_at, :updated_at
json.url api_conference_url(conference, format: :json)
