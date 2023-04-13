module Api
  # Generates documents and returns files
  class DocumentsController < ApplicationController
    def generate_participation_certificate
      participation = Participation.where(user: current_user).find(params[:participation_id])
      document_template =
        DocumentTemplate
        .where(
          document_type: 'participation_certificate',
          conference_id: participation.event.conference_id
        )
        .find(params[:document_template_id])

      docx = Docx::Document.open(document_template.docx.download)

      docx.paragraphs.each do |paragraph|
        paragraph.each_text_run do |text_run|
          text_run.substitute('placeholder', Time.zone.now.to_i.to_s)
        end
      end

      send_data(
        docx.stream.string.force_encoding('binary'),
        filename: "document_#{Time.zone.now.to_i}.docx",
        disposition: :attachment,
        type: 'application/docx'
      )
    end
  end
end
