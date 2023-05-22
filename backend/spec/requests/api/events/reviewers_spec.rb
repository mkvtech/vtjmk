require 'rails_helper'

RSpec.describe '/api/events/:event_id/reviewers' do
  let(:headers) { auth_headers_for(user) }
  let(:user) { create(:user) }
  let(:conference) { create(:conference) }
  let(:event) { create(:event, conference:) }

  describe 'GET /' do
    subject(:make_request) { get("/api/events/#{event.id}/reviewers", headers:) }

    let(:reviewer) { create(:user) }
    let!(:event_reviewer) { create(:event_reviewer, reviewer:, event:) }

    before do
      create(:permission, user:, action: :manage, target: conference)
    end

    it 'returns event reviewers' do
      make_request
      expect(response).to have_http_status(:ok)
      expect(json_response).not_to be_empty
      expect(json_response).to include(a_hash_including(id: event_reviewer.id.to_s))
    end
  end

  describe 'POST /' do
    subject(:make_request) { post("/api/events/#{event.id}/reviewers", headers:, params:) }

    let(:event) { create(:event, conference:) }

    context 'with invalid params' do
      let(:params) { nil }

      before do
        create(:permission, user:, action: :manage, target: conference)
      end

      it 'does not create event reviewer' do
        expect { make_request }.not_to change(EventReviewer, :count)
      end

      it 'returns error' do
        make_request
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'with valid params' do
      let(:params) do
        {
          reviewer_id: reviewer.id
        }
      end

      let(:reviewer) { create(:user) }

      before do
        create(:permission, user:, action: :manage, target: conference)
      end

      it 'creates new reviewer' do
        expect { make_request }.to change(EventReviewer, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end
  end

  describe 'DELETE /:reviewer_id' do
    subject(:make_request) { delete("/api/events/#{event.id}/reviewers/#{reviewer_id}", headers:) }

    let(:reviewer) { create(:user) }
    let!(:event_reviewer) { create(:event_reviewer, reviewer:, event:) }
    let(:reviewer_id) { event_reviewer.reviewer.id }

    before do
      create(:permission, user:, action: :manage, target: conference)
    end

    it 'deletes reviewer' do
      expect { make_request }.to change(EventReviewer, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end
