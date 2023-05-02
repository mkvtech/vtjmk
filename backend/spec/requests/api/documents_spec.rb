require 'rails_helper'

RSpec.describe '/api/documents' do
  describe 'POST /generate_participation_certificate' do
    subject(:make_request) { post('/api/documents/generate_participation_certificate', headers:, params:) }

    let(:headers) { auth_headers_for(user) }
    let(:user) { create(:user) }
    let(:conference) { create(:conference) }
    let(:document_template) { create(:document_template, conference:) }

    context 'when not authenticated' do
      let(:headers) { {} }
      let(:params) { {} }

      it 'returns unauthorized' do
        make_request
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'with invalid participation_id' do
      let(:params) { { participation_id: 'invalid' } }

      it 'returns not_found' do
        make_request
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'with unapproved participation' do
      let(:params) { { participation_id: participation.id } }
      let(:participation) { create(:participation, event:, user:) }
      let(:event) { create(:event, conference:) }

      it 'returns not_found' do
        make_request
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'with invalid document_template_id' do
      let(:params) { { participation_id: participation.id, document_template_id: 'invalid' } }
      let(:participation) { create(:participation, event:, user:, status: 'approved') }
      let(:event) { create(:event, conference:) }

      it 'returns not_found' do
        make_request
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'with valid params' do
      let(:params) { { participation_id: participation.id, document_template_id: document_template.id } }
      let(:participation) { create(:participation, event:, user:, status: 'approved') }
      let(:event) { create(:event, conference:) }
      let(:document_template) { create(:document_template, conference:) }
      let(:docx) { Rails.root.join('db/seeds/Participation_Certificate_EN_1.docx').open }

      before do
        document_template.docx.attach(io: docx, filename: 'template.docx')
      end

      it 'returns file' do
        make_request
        expect(response).to have_http_status(:success)
      end
    end

    context 'with document_type == pdf' do
      let(:params) do
        {
          participation_id: participation.id,
          document_template_id: document_template.id,
          document_type: 'pdf'
        }
      end
      let(:participation) { create(:participation, event:, user:, status: 'approved') }
      let(:event) { create(:event, conference:) }
      let(:document_template) { create(:document_template, conference:) }
      let(:docx) { Rails.root.join('db/seeds/Participation_Certificate_EN_1.docx').open }

      before do
        document_template.docx.attach(io: docx, filename: 'template.docx')
      end

      it 'returns file' do
        make_request
        expect(response).to have_http_status(:success)
      end
    end
  end
end
