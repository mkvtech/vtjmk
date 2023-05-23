require 'rails_helper'

RSpec.describe '/api/reviews' do
  let(:headers) { auth_headers_for(user) }
  let(:user) { create(:user) }
  let(:conference) { create(:conference) }
  let(:event) { create(:event, conference:) }
  let(:participant) { create(:user) }
  let(:participation) { create(:participation, user:, event:) }

  describe 'PATCH /:review_id' do
    subject(:make_request) { patch("/api/reviews/#{review.id}", headers:, params:) }

    let(:reviewer) { user }
    let(:review) { create(:review, user: reviewer, participation:) }

    context 'with invalid params' do
      let(:params) { { status: :invalid } }

      it 'does not update review' do
        expect { make_request }.not_to(change { review.reload.status })
      end
    end

    context 'with valid params' do
      let(:params) do
        {
          status: :approved
        }
      end

      it 'updates review' do
        expect { make_request }.to change { review.reload.status }.from('pending').to('approved')
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'DELETE /:review_id' do
    subject(:make_request) { delete("/api/reviews/#{review.id}", headers:) }

    let(:reviewer) { user }
    let!(:review) { create(:review, user: reviewer, participation:) }

    before do
      create(:permission, user:, action: :manage, target: conference)
    end

    it 'deletes review' do
      expect { make_request }.to change(Review, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end
