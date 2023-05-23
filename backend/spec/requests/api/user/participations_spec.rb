require 'rails_helper'

RSpec.describe '/api/user/participations' do
  let(:headers) { auth_headers_for(user) }
  let(:user) { create(:user) }
  let(:conference) { create(:conference) }
  let(:event) { create(:event, conference:) }

  describe 'GET /' do
    subject(:make_request) { get('/api/user/participations', headers:) }

    let!(:participation) { create(:participation, user:, event:) }

    it 'returns current user participations' do
      make_request
      expect(response).to have_http_status(:ok)
      expect(json_response).not_to be_empty
      expect(json_response).to include(
        a_hash_including(
          id: participation.id.to_s,
          user: a_hash_including(
            id: user.id.to_s,
            fullName: user.full_name
          )
        )
      )
    end
  end
end
