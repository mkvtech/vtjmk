json.id @comment.id.to_s

json.user_id @comment.user_id.to_s
json.user do
  json.id @comment.user.id.to_s
  json.avatar_url user_avatar_full_url(@comment.user)
  json.extract! @comment.user, *%i[full_name email]
end

json.extract! @comment, *%i[text created_at updated_at]
