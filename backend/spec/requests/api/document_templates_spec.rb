require 'rails_helper'

RSpec.describe '/api/document_templates' do
  describe 'GET /:id' do
    subject(:make_request) { get("/api/document_templates/#{document_template.id}", headers:) }

    let(:headers) { auth_headers_for(user) }
    let(:user) { create(:user) }
    let(:conference) { create(:conference) }
    let(:document_template) { create(:document_template, conference:) }

    context 'when not authenticated' do
      let(:headers) { {} }

      it 'returns unauthorized' do
        make_request
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'without permission' do
      it 'returns unauthorized' do
        make_request
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'with permission' do
      before do
        create(:permission, user:, target: conference, action: :manage)
      end

      it 'returns document_template' do
        make_request
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body).to include(
          'id' => document_template.id.to_s,
          'name' => document_template.name,
          'conferenceId' => conference.id.to_s
        )
      end
    end
  end

  describe 'POST' do
    subject(:make_request) { post('/api/document_templates', params:, headers:) }

    let(:headers) { auth_headers_for(user) }
    let(:user) { create(:user) }
    let(:conference) { create(:conference) }

    context 'when not authenticated' do
      let(:headers) { {} }
      let(:params) { nil }

      it 'returns unauthorized' do
        make_request
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'without permission' do
      let(:params) do
        {
          name: 'Participation Certificate Template',
          documentType: 'participation_certificate',
          placeholderPrefix: '',
          placeholderPostfix: '',
          conferenceId: conference.id.to_s
        }
      end

      it 'returns error' do
        expect { make_request }.not_to change(DocumentTemplate, :count)
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'with permission' do
      let(:params) do
        {
          name: 'Participation Certificate Template',
          documentType: 'participation_certificate',
          placeholderPrefix: '',
          placeholderPostfix: '',
          conferenceId: conference.id.to_s
        }
      end

      before do
        create(:permission, user:, target: conference, action: :manage)
      end

      it 'creates DocumentTemplate' do
        expect { make_request }.to change(DocumentTemplate, :count).by(1)
        expect(response).to have_http_status(:success)
        expect(response.parsed_body).to include(
          'name' => 'Participation Certificate Template',
          'documentType' => 'participation_certificate',
          'placeholderPrefix' => '',
          'placeholderPostfix' => '',
          'conferenceId' => conference.id.to_s
        )
      end
    end
  end
end
