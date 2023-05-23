require 'rails_helper'

RSpec.describe '/api/events/:event_id/participations' do
  let(:headers) { auth_headers_for(user) }
  let(:user) { create(:user) }
  let(:conference) { create(:conference) }
  let(:event) { create(:event, conference:) }

  describe 'GET /' do
    subject(:make_request) { get("/api/events/#{event.id}/participations", headers:) }

    let(:participant) { create(:user) }
    let!(:participation) { create(:participation, user: participant, event:) }

    before do
      create(:permission, user:, action: :manage, target: conference)
    end

    it 'returns event participations' do
      make_request
      expect(response).to have_http_status(:ok)
      expect(json_response).not_to be_empty
      expect(json_response).to include(
        a_hash_including(
          id: participation.id.to_s,
          user: a_hash_including(
            id: participant.id.to_s,
            fullName: participant.full_name
          )
        )
      )
    end
  end
end
