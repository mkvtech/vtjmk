json.id document_template.id.to_s
json.conference_id document_template.conference_id.to_s
json.extract!(
  document_template,
  *%i[name document_type placeholder_prefix placeholder_postfix created_at updated_at]
)
json.url api_document_template_url(document_template, format: :json)
