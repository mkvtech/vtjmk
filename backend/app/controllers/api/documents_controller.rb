module Api
  # Generates documents and returns files
  class DocumentsController < ApplicationController
    def generate_participation_certificate # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
      participation = Participation.where(user: current_user).find(params[:participation_id])
      document_template =
        DocumentTemplate
        .where(
          document_type: 'participation_certificate',
          conference_id: participation.event.conference_id
        )
        .find(params[:document_template_id])

      docx = GenerateParticipationCertificate.call(document_template:, participation:)

      send_data(
        docx.stream.string.force_encoding('binary'),
        filename: "document_#{Time.zone.now.to_i}.docx",
        disposition: :attachment,
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      )
    end
  end
end
