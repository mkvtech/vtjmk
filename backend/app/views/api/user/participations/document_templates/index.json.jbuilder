json.array! @document_templates do |document_template|
  json.id document_template.id.to_s
  json.extract!(document_template, :name)
end
