require 'rails_helper'

RSpec.describe '/api/participations/:participation_id/users' do
  let(:headers) { auth_headers_for(user) }
  let(:user) { create(:user) }
  let(:conference) { create(:conference) }
  let(:event) { create(:event, conference:) }
  let(:participant) { create(:user) }
  let!(:participation) { create(:participation, user: participant, event:) }

  describe 'GET /available_reviewers' do
    subject(:make_request) { get("/api/participations/#{participation.id}/available_reviewers", headers:) }

    let(:reviewer) { create(:user) }
    let!(:event_reviewer) { create(:event_reviewer, reviewer:, event:) }

    before do
      create(:permission, user:, action: :manage, target: conference)
    end

    it 'returns available reviewers' do
      make_request
      expect(response).to have_http_status(:ok)
      expect(json_response).not_to be_empty
      expect(json_response).to include(
        a_hash_including(
          id: event_reviewer.id.to_s,
          reviewer: a_hash_including(
            id: reviewer.id.to_s,
            fullName: reviewer.full_name
          )
        )
      )
    end
  end
end
