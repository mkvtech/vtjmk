module Participations
  # Updates participation
  class UpdateAttachments
    method_object %i[participation! params!]

    def call
      attach_new_attachments
      destroy_persisted_attachments
    end

    def attach_new_attachments
      return if params[:submission_files_new].blank?

      participation.submission_files.attach(params[:submission_files_new].pluck(:file))
    end

    def destroy_persisted_attachments
      return if params[:submission_files_persisted].blank?

      attachment_ids_to_destroy = params[:submission_files_persisted].select { _1[:remove] == 'true' }.pluck(:id)

      participation
        .submission_files
        .where(id: attachment_ids_to_destroy)
        .each(&:destroy)
    end
  end
end
