require 'rails_helper'

RSpec.describe '/api/event/:event_id/users' do
  let(:headers) { auth_headers_for(user) }
  let(:user) { create(:user) }
  let(:conference) { create(:conference) }
  let(:event) { create(:event, conference:) }

  describe 'GET /' do
    subject(:make_request) { get("/api/events/#{event.id}/users/available_as_reviewers", headers:) }

    let!(:available_reviewer) { create(:user) }

    before do
      create(:permission, user:, target: conference, action: :manage)
    end

    it 'returns current user participations' do
      make_request
      expect(response).to have_http_status(:ok)
      expect(json_response).not_to be_empty
      expect(json_response).to include(
        a_hash_including(
          id: available_reviewer.id.to_s,
          fullName: available_reviewer.full_name
        )
      )
    end
  end
end
