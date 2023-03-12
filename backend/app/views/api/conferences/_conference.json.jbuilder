json.extract! conference, :id, :title, :description, :created_at, :updated_at
json.url api_conference_url(conference, format: :json)
