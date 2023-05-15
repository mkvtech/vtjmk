json.id review.id.to_s

json.user_id review.user_id.to_s
json.user review.user.to_builder_simple

json.extract! review, *%i[status comment created_at updated_at]
