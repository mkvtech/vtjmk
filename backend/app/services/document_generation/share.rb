module DocumentGeneration
  # A place for simple methods that are too simple to be extracted into separate classes/files
  module Share
    def self.replace_placeholders_in_row(row:, data_fetcher:, placeholder_wrapper:)
      row.cells.each do |cell|
        replace_placeholders_in_document(document: cell, data_fetcher:, placeholder_wrapper:)
      end
    end

    def self.replace_placeholders_in_document(document:, data_fetcher:, placeholder_wrapper:)
      document.paragraphs.each do |paragraph|
        paragraph.each_text_run do |text_run|
          data_fetcher.placeholders.each do |placeholder|
            substitute_placeholder_and_log(text_run:, placeholder:, data_fetcher:, placeholder_wrapper:)
          end
        end
      end
    end

    def self.substitute_placeholder_and_log(text_run:, placeholder:, data_fetcher:, placeholder_wrapper:)
      text_to_replace = placeholder_wrapper.wrap(placeholder)

      Rails.logger.debug { "placeholder: #{placeholder}, text_to_replace: #{text_to_replace}" }

      # TODO: This should be optimized with cache
      data = data_fetcher.fetch_placeholder_value(placeholder)

      Rails.logger.debug { "placeholder data: #{data}" }

      text_run.substitute(text_to_replace, data)
    end

    def self.each_text_run(document:, &block)
      document.paragraphs.each do |paragraph|
        paragraph.each_text_run(&block)
      end
    end

    def self.fill_table(table:, data_array:)
      pattern_row = table.rows.last

      data_array.each_with_index do |data_array_item, index|
        new_row = pattern_row.copy
        new_row.insert_before(pattern_row)

        yield(data_array_item, new_row, index)
      end

      pattern_row.remove!
    end
  end
end
