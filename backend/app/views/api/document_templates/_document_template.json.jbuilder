json.extract!(
  api_document_template,
  %i[id name document_type placeholder_prefix placeholder_postfix conference_id created_at updated_at]
)
json.url api_document_template_url(api_document_template, format: :json)
