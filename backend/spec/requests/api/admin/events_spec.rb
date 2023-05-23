require 'rails_helper'

RSpec.describe '/api/admin/events' do
  let(:headers) { auth_headers_for(user) }
  let(:user) { create(:user, privilege_level: :admin) }

  describe 'GET /' do
    subject(:make_request) { get('/api/admin/events', headers:) }

    let(:conference) { create(:conference) }
    let!(:event) { create(:event, conference:) }

    it 'returns all events' do
      make_request
      expect(response).to have_http_status(:ok)
      expect(json_response.size).to be(1)
      expect(json_response).to contain_exactly(
        a_hash_including(
          id: event.id.to_s,
          title: event.title,
          conferenceId: conference.id.to_s
        )
      )
    end
  end
end
