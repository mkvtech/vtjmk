require 'libreconv'

module Api
  # Generates documents and returns files
  class DocumentsController < ApplicationController
    before_action :require_authenticated_user

    def generate_participation_certificate
      participation = Participation.where(user: current_user).find(params[:participation_id])

      authorize! participation, to: :generate_certificate?, with: ParticipationPolicy

      document_template =
        DocumentTemplate
        .where(document_type: 'participation_certificate', conference_id: participation.event.conference_id)
        .find(params[:document_template_id])

      docx = GenerateParticipationCertificate.call(document_template:, participation:)

      send_generated_document(docx)
    end

    def generate_participants_list
      event = Event.find(params[:event_id])

      authorize! event, to: :generate_participants_list?, with: EventPolicy

      document_template =
        DocumentTemplate
        .where(document_type: 'participants_list', conference_id: event.conference_id)
        .find(params[:document_template_id])

      # TODO: Generate file
      docx = DocumentGeneration::ParticipantsList::GenerateParticipantsList.call(document_template:, event:)

      send_generated_document(docx)
    end

    private

    def send_generated_document(docx)
      # Allow client to read file name
      response.set_header('Access-Control-Expose-Headers', ['Content-Disposition'])

      if params[:document_type] == 'pdf'
        convert_to_pdf_and_send(docx)
      else
        send_docx(docx)
      end
    end

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
