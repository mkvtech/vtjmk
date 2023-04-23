json.id @participation.id.to_s
json.extract! @participation, :status, :submission_title, :submission_description, :created_at, :updated_at

json.user_id @participation.user_id.to_s
json.user do
  json.id @participation.user.id.to_s
  json.extract! @participation.user, *%i[email full_name]
end

json.event_id @participation.event_id.to_s
json.event do
  json.id @participation.event.id.to_s
  json.extract! @participation.event, *%i[title date]
end

json.submission_files do
  json.array! @participation.submission_files_attachments do |attachment|
    json.id attachment.id.to_s
    json.name attachment.filename
    json.size attachment.byte_size
    json.download_url url_for(attachment)
  end
end
