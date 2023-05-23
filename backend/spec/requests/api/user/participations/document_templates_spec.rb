require 'rails_helper'

RSpec.describe '/api/user/participations/:participation_id/document_templates' do
  let(:headers) { auth_headers_for(user) }
  let(:user) { create(:user, privilege_level: :admin) }
  let(:conference) { create(:conference) }
  let(:event) { create(:event, conference:) }
  let(:participation) { create(:participation, user:, event:) }

  describe 'GET /' do
    subject(:make_request) { get("/api/user/participations/#{participation.id}/document_templates", headers:) }

    let!(:document_template) { create(:document_template, conference:, document_type: :participation_certificate) }

    it 'returns document templates' do
      make_request
      expect(response).to have_http_status(:ok)
      expect(json_response.size).to be(1)
      expect(json_response).to contain_exactly(
        a_hash_including(
          id: document_template.id.to_s,
          name: document_template.name
        )
      )
    end
  end
end
