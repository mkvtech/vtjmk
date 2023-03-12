json.id user.id.to_s
json.extract! user, :full_name, :email, :created_at, :updated_at
json.url api_user_url(user, format: :json)
