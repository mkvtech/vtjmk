json.id review.id.to_s
json.extract! review, *%i[status comment created_at updated_at]

json.user_id review.user_id.to_s
json.user review.user.to_builder_simple

json.participation_id review.participation_id.to_s
json.participation do
  json.id review.participation.id.to_s
  json.extract! review.participation, *%i[status submission_title submission_description created_at updated_at]

  json.user_id review.participation.user_id.to_s
  json.user review.participation.user.to_builder_simple

  json.event_id review.participation.event_id.to_s
  json.event do
    json.id review.participation.event.id.to_s
    json.extract! review.participation.event, *%i[title date]
  end
end
