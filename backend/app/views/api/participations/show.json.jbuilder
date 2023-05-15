json.id @participation.id.to_s
json.extract! @participation, :status, :submission_title, :submission_description, :created_at, :updated_at

json.user_id @participation.user_id.to_s
json.user do
  json.id @participation.user.id.to_s
  json.avatar_url user_avatar_full_url(@participation.user)
  json.extract! @participation.user, *%i[email full_name]
end

json.event_id @participation.event_id.to_s
json.event do
  json.id @participation.event.id.to_s
  json.extract! @participation.event, *%i[title date]
end

json.reviewer_id @participation.reviewer_id.to_s
if @participation.reviewer.present?
  json.reviewer do
    json.id @participation.reviewer.id.to_s
    json.avatar_url user_avatar_full_url(@participation.reviewer)
    json.extract! @participation.reviewer, *%i[email full_name]
  end
else
  json.reviewer nil
end

if allowed_to? :reviews_index?, @participation
  json.reviews do
    json.array! @participation.reviews do |review|
      json.id review.id.to_s

      json.user_id review.user_id.to_s
      json.user review.user.to_builder_simple

      json.extract! review, *%i[status comment created_at updated_at]
    end
  end
else
  json.reviews nil
end

json.submission_files do
  json.array! @participation.submission_files_attachments do |attachment|
    json.id attachment.id.to_s
    json.name attachment.filename
    json.size attachment.byte_size
    json.download_url url_for(attachment)
  end
end
