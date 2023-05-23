require 'rails_helper'

RSpec.describe '/api/participations/:participation_id/reviews' do
  let(:headers) { auth_headers_for(user) }
  let(:user) { create(:user) }
  let(:conference) { create(:conference) }
  let(:event) { create(:event, conference:) }
  let(:participant) { create(:user) }
  let(:participation) { create(:participation, user:, event:) }

  describe 'GET /' do
    subject(:make_request) { get("/api/participations/#{participation.id}/reviews", headers:) }

    let(:reviewer) { user }
    let!(:review) { create(:review, user: reviewer, participation:) }

    before do
      create(:permission, user:, action: :manage, target: conference)
    end

    it 'returns reviews' do
      make_request
      expect(response).to have_http_status(:ok)
      expect(json_response).not_to be_empty
      expect(json_response).to include(
        a_hash_including(
          id: review.id.to_s,
          user: a_hash_including(
            id: reviewer.id.to_s,
            fullName: reviewer.full_name
          )
        )
      )
    end
  end

  describe 'POST /' do
    subject(:make_request) { post("/api/participations/#{participation.id}/reviews", headers:, params:) }

    before do
      create(:permission, user:, action: :manage, target: conference)
    end

    context 'with invalid params' do
      let(:params) { { user_id: 'invalid' } }

      it 'does not update review' do
        expect { make_request }.not_to change(Review, :count)
      end

      it 'returns error' do
        make_request
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'with valid params' do
      let(:params) do
        {
          user_id: reviewer.id
        }
      end
      let(:reviewer) { user }

      it 'creates review' do
        expect { make_request }.to change(Review, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end
  end
end
