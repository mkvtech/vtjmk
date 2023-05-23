require 'rails_helper'

RSpec.describe '/api/event/:event_id/document_templates' do
  let(:headers) { auth_headers_for(user) }
  let(:user) { create(:user) }
  let(:conference) { create(:conference) }
  let(:event) { create(:event, conference:) }

  describe 'GET /' do
    subject(:make_request) { get("/api/events/#{event.id}/document_templates", headers:) }

    let!(:document_template) { create(:document_template, conference:, document_type: :participants_list) }

    before do
      create(:permission, user:, target: conference, action: :manage)
    end

    it 'returns current user participations' do
      make_request
      expect(response).to have_http_status(:ok)
      expect(json_response).not_to be_empty
      expect(json_response).to include(
        a_hash_including(
          id: document_template.id.to_s,
          name: document_template.name
        )
      )
    end
  end
end
