require 'libreconv'

module Api
  # Generates documents and returns files
  class DocumentsController < ApplicationController
    before_action :require_authenticated_user

    def generate_participation_certificate # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
      participation = Participation.where(user: current_user).find(params[:participation_id])

      authorize! participation, to: :generate_certificate?, with: ParticipationPolicy

      document_template =
        DocumentTemplate
        .where(
          document_type: 'participation_certificate',
          conference_id: participation.event.conference_id
        )
        .find(params[:document_template_id])

      docx = GenerateParticipationCertificate.call(document_template:, participation:)

      # Allow client to read file name
      response.set_header('Access-Control-Expose-Headers', ['Content-Disposition'])

      if params[:document_type] == 'pdf'
        convert_to_pdf_and_send(docx)
      else
        send_docx(docx)
      end
    end

    private

    def send_docx(docx)
      send_data(
        docx.stream.string.force_encoding('binary'),
        filename: "document_#{Time.zone.now.to_i}.docx",
        disposition: :attachment,
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      )
    end

    def convert_to_pdf_and_send(docx)
      file_id = SecureRandom.uuid
      tmp_directory = Rails.root.join('tmp')
      docx_file_path = "#{tmp_directory}/#{file_id}.docx"
      pdf_file_path = "#{tmp_directory}/#{file_id}.pdf"

      docx.save(docx_file_path)
      Libreconv.convert(docx_file_path, pdf_file_path)

      File.open(pdf_file_path, 'r') { |file| send_pdf(file) }
    ensure
      FileUtils.rm_f(docx_file_path)
      FileUtils.rm_f(pdf_file_path)
    end

    def send_pdf(file)
      send_data(
        file.read,
        filename: "document_#{Time.zone.now.to_i}.pdf",
        disposition: :attachment,
        type: 'application/pdf'
      )
    end
  end
end
