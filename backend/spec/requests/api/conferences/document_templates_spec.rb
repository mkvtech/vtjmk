require 'rails_helper'

RSpec.describe '/api/conferences/:conference_id/document_templates' do
  describe 'GET' do
    subject(:make_request) { get("/api/conferences/#{conference.id}/document_templates", headers:) }

    let(:headers) { auth_headers_for(user) }
    let(:user) { create(:user) }

    context 'without permission' do
      let(:conference) { create(:conference) }

      it 'returns unauthorized' do
        make_request
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'with multiple document templates from different conferences' do
      subject(:make_request) { get("/api/conferences/#{conference1.id}/document_templates", headers:) }

      let(:conference1) { create(:conference) }
      let(:conference2) { create(:conference) }

      let!(:document_template1) { create(:document_template, conference: conference1) }

      before do
        create(:document_template, conference: conference2)
        create(:permission, user:, target: conference1, action: :manage)
      end

      it 'returns document templates only from specified conference' do
        make_request
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body).to contain_exactly(
          include(
            'id' => document_template1.id.to_s
          )
        )
      end
    end
  end
end
