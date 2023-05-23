require 'rails_helper'

RSpec.describe '/api/participations/:participation_id/comments' do
  let(:headers) { auth_headers_for(user) }
  let(:user) { create(:user) }
  let(:conference) { create(:conference) }
  let(:event) { create(:event, conference:) }
  let(:participant) { create(:user) }
  let(:participation) { create(:participation, user:, event:) }

  describe 'GET /' do
    subject(:make_request) { get("/api/participations/#{participation.id}/comments", headers:) }

    let(:commenter) { user }
    let!(:comment) { create(:comment, user: commenter, commentable: participation) }

    before do
      create(:permission, user:, action: :manage, target: conference)
    end

    it 'returns comments' do
      make_request
      expect(response).to have_http_status(:ok)
      expect(json_response).not_to be_empty
      expect(json_response).to include(
        a_hash_including(
          id: comment.id.to_s,
          user: a_hash_including(
            id: commenter.id.to_s,
            fullName: commenter.full_name
          )
        )
      )
    end
  end

  describe 'POST /' do
    subject(:make_request) { post("/api/participations/#{participation_id}/comments", headers:, params:) }

    before do
      create(:permission, user:, action: :manage, target: conference)
    end

    context 'with invalid params' do
      let(:params) { nil }
      let(:participation_id) { 'invalid' }

      it 'does not create comment' do
        expect { make_request }.not_to change(Comment, :count)
      end

      it 'returns error' do
        make_request
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'with valid params' do
      let(:params) do
        {
          text: 'text'
        }
      end

      let(:participation_id) { participation.id }

      it 'creates comment' do
        expect { make_request }.to change(Comment, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end
  end
end
