module Api
  module Events
    # Actions related to Event DocumentTemplates
    class DocumentTemplatesController < ApplicationController
      before_action :require_authenticated_user

      def index
        event = Event.find(params[:event_id])
        authorize! event, to: :participations_index?, with: EventPolicy

        @document_templates =
          DocumentTemplate
          .where(conference_id: event.conference_id, document_type: :participants_list)
      end
    end
  end
end
