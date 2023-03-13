require 'rails_helper'

RSpec.describe '/api/attendances' do
  describe 'GET /api/attendances' do
    context 'when not authenticated' do
      it 'return :unauthorized' do
        get('/api/attendances')
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when multiple attenandances exist for several users' do
      let(:conference) { create(:conference) }
      let(:event) { create(:event, conference:) }
      let!(:attendances) do
        [
          create(:attendance, event:, user: user1),
          create(:attendance, event:, user: user2),
          create(:attendance, event:, user: user3)
        ]
      end

      let(:user1) { create(:user) }
      let(:user2) { create(:user) }
      let(:user3) { create(:user) }

      it 'returns attendances only for current user' do
        get('/api/attendances', headers: auth_headers_for(user1))
        expect(response).to have_http_status(:success)
        expect(json_response.pluck(:id)).to contain_exactly(attendances[0].id.to_s)
      end
    end

    context 'when multiple attendances exist for single user for several events' do
      let(:conference) { create(:conference) }
      let(:event1) { create(:event, conference:) }
      let(:event2) { create(:event, conference:) }
      let(:event3) { create(:event, conference:) }
      let!(:attendances) do
        [
          create(:attendance, event: event1, user:),
          create(:attendance, event: event2, user:),
          create(:attendance, event: event3, user:)
        ]
      end
      let(:user) { create(:user) }

      it 'returns attendance only for selected event' do
        get("/api/attendances?event_id=#{event1.id}", headers: auth_headers_for(user))
        expect(response).to have_http_status(:success)
        expect(json_response.pluck(:id)).to contain_exactly(attendances[0].id.to_s)
      end
    end
  end

  describe 'POST /api/attendances' do
    context 'when not authenticated' do
      it 'return :unauthorized' do
        post('/api/attendances', params: {})
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when is authenticated' do
      subject(:make_request) { post('/api/attendances', params:, headers: auth_headers_for(user)) }

      let(:conference) { create(:conference) }
      let(:event) { create(:event, conference:) }
      let(:user) { create(:user) }

      let(:params) { { eventId: event.id, comment: '' } }

      it 'creates attendance' do
        expect { make_request }.to change(Attendance, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end
  end
end
