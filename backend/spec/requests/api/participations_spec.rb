require 'rails_helper'

RSpec.describe '/api/participations/:participation_id' do
  let(:headers) { auth_headers_for(user) }
  let(:user) { create(:user) }
  let(:conference) { create(:conference) }
  let(:event) { create(:event, conference:) }

  describe 'GET /:participation_id' do
    subject(:make_request) { get("/api/participations/#{participation.id}", headers:) }

    let(:participant) { create(:user) }
    let(:participation) { create(:participation, user: participant, event:) }

    before do
      create(:permission, user:, action: :manage, target: conference)
    end

    it 'returns participation' do
      make_request
      expect(response).to have_http_status(:ok)
      expect(json_response).not_to be_empty
      expect(json_response).to include(
        id: participation.id.to_s,
        user: a_hash_including(
          id: participant.id.to_s,
          fullName: participant.full_name
        )
      )
    end
  end

  describe 'POST /' do
    subject(:make_request) { post('/api/participations', headers:, params:) }

    let(:event) { create(:event, conference:) }

    context 'with invalid params' do
      let(:params) { nil }

      it 'does not create participation' do
        expect { make_request }.not_to change(Participation, :count)
      end

      it 'returns error' do
        make_request
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'with valid params' do
      let(:params) do
        {
          event_id: event.id
        }
      end

      it 'creates new participation' do
        expect { make_request }.to change(Participation, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end

    context 'when event has auto_assign_reviewers setting enabled' do
      let(:params) { { event_id: event.id } }
      let(:event) { create(:event, conference:, auto_assign_reviewers_count: 1) }
      let(:reviewer) { create(:user) }

      before do
        create(:event_reviewer, event:, reviewer:)
      end

      it 'creates pending review' do
        expect { make_request }.to change(Review, :count).by(1)
      end
    end
  end

  describe 'PATCH /:participation_id' do
    subject(:make_request) { patch("/api/participations/#{participation.id}", headers:, params:) }

    let!(:participation) { create(:participation, user:, event:, submission_title: 'PREVIOUS') }

    context 'with valid params' do
      let(:params) do
        {
          submission_title: 'NEW'
        }
      end

      it 'creates new participation' do
        expect { make_request }.to change { participation.reload.submission_title }.from('PREVIOUS').to('NEW')
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'PATCH /:participation_id/update_status' do
    subject(:make_request) { patch("/api/participations/#{participation.id}/update_status", headers:, params:) }

    let!(:participation) { create(:participation, user:, event:) }
    let(:params) { { status: :approved } }

    before do
      create(:permission, user:, action: :manage, target: conference)
    end

    it 'updates participation status' do
      expect { make_request }.to change { participation.reload.status }.from('pending').to('approved')
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'DELETE /:participation_id' do
    subject(:make_request) { delete("/api/participations/#{participation.id}", headers:) }

    let(:participant) { create(:user) }
    let!(:participation) { create(:participation, user: participant, event:) }

    before do
      create(:permission, user:, action: :manage, target: conference)
    end

    it 'deletes participation' do
      expect { make_request }.to change(Participation, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end
