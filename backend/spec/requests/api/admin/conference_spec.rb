require 'rails_helper'

RSpec.describe '/api/admin/conferences' do
  let(:headers) { auth_headers_for(user) }
  let(:user) { create(:user, privilege_level: :admin) }

  describe 'GET /' do
    subject(:make_request) { get('/api/admin/conferences', headers:) }

    let!(:conference) { create(:conference) }

    it 'returns all conferences' do
      make_request
      expect(response).to have_http_status(:ok)
      expect(json_response.size).to be(1)
      expect(json_response).to contain_exactly(
        a_hash_including(
          id: conference.id.to_s,
          title: conference.title
        )
      )
    end
  end
end
