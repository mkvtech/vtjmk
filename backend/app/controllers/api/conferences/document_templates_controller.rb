module Api
  module Conferences
    # :nodoc:
    class DocumentTemplatesController < ApplicationController
      def index
        authorize! Conference.find(params[:conference_id]), to: :manage?, with: ConferencePolicy
        @document_templates = DocumentTemplate.where(conference_id: params[:conference_id])
      end
    end
  end
end
