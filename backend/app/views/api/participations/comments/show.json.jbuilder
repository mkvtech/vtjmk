json.id @comment.id.to_s

json.user_id @comment.user_id.to_s
json.user do
  json.id @comment.user.id.to_s
  json.extract! @comment.user, *%i[full_name email]
end

json.extract! @comment, *%i[text created_at updated_at]
