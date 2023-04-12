module Api
  # :nodoc:
  class DocumentTemplatesController < ApplicationController
    before_action :require_authenticated_user
    before_action :set_document_template, only: %i[show update destroy]

    def show
      authorize! @document_template
    end

    def create # rubocop:disable Metrics/MethodLength
      authorize! Conference.find(params[:conference_id]), to: :document_templates_create?, with: ConferencePolicy

      @document_template =
        DocumentTemplate.new(
          document_type: params[:document_type].underscore,
          **params.permit(:name, :placeholder_prefix, :placeholder_postfix, :conference_id, :docx)
        )

      if @document_template.save
        render :show, status: :created, location: api_document_template_url(@document_template)
      else
        render json: @document_template.errors, status: :unprocessable_entity
      end
    end

    def update
      authorize! @document_template

      document_template_params = params.permit(:name, :document_type, :placeholder_prefix, :placeholder_postfix)

      if @document_template.update(document_template_params)
        render :show, status: :ok, location: api_document_template_url(@document_template)
      else
        render json: @document_template.errors, status: :unprocessable_entity
      end
    end

    def destroy
      authorize! @document_template
      @document_template.destroy
    end

    private

    def set_document_template
      @document_template = DocumentTemplate.includes(:conference).find(params[:id])
    end
  end
end
