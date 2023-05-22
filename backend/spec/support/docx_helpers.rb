# Utilities for working with DOCX data
module DocxHelpers
  def docx_to_s(docx)
    docx.paragraphs.map(&:text).filter(&:present?).join('\n')
  end

  def docx_table_to_csv(table)
    table
      .rows
      .map do |row|
        row
          .cells
          .map { docx_to_s(_1) }
          .join(',')
      end
      .join('\n')
  end
end
