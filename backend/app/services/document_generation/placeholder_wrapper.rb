module DocumentGeneration
  # Adds prefix and postfix to placeholder
  class PlaceholderWrapper
    pattr_initialize %i[document_template!]

    def wrap(placeholder)
      "#{document_template.placeholder_prefix}#{placeholder.upcase}#{document_template.placeholder_postfix}"
    end
  end
end
