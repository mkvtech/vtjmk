module Api
  module User
    module Participations
      # :nodoc:
      class DocumentTemplatesController < ApplicationController
        def index
          participation = Participation.where(user: current_user).find(params[:participation_id])
          @document_templates =
            DocumentTemplate
            .where(conference_id: participation.event.conference_id, document_type: :participation_certificate)
        end
      end
    end
  end
end
