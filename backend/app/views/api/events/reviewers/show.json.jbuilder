json.id reviewer.id.to_s
json.avatar_url user_avatar_full_url(reviewer)
json.extract! reviewer, :full_name, :email, :created_at, :updated_at
json.url api_user_url(reviewer, format: :json)
