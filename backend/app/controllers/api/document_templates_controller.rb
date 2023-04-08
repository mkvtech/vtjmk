module Api
  # :nodoc:
  class DocumentTemplatesController < ApplicationController
    before_action :set_api_document_template, only: %i[show update destroy]

    def index
      @api_document_templates = Api::DocumentTemplate.all
    end

    def show; end

    def create
      @api_document_template = Api::DocumentTemplate.new(api_document_template_params)

      if @api_document_template.save
        render :show, status: :created, location: @api_document_template
      else
        render json: @api_document_template.errors, status: :unprocessable_entity
      end
    end

    def update
      if @api_document_template.update(api_document_template_params)
        render :show, status: :ok, location: @api_document_template
      else
        render json: @api_document_template.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @api_document_template.destroy
    end

    private

    def set_api_document_template
      @api_document_template = Api::DocumentTemplate.find(params[:id])
    end

    def api_document_template_params
      params
        .require(:api_document_template)
        .permit(:name, :document_type, :placeholder_prefix, :placeholder_postfix, :conference_id)
    end
  end
end
