require 'rails_helper'

RSpec.describe '/api/events/:event_id/attendances', type: :request do
  describe 'GET /' do
    subject(:make_request) { get("/api/events/#{event.id}/attendances", headers:) }

    let(:event) { create(:event, :with_conference) }

    context 'when not authenticated' do
      it 'returns unauthorized' do
        make_request
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when not authorized' do
      let(:headers) { auth_headers_for(user) }
      let(:user) { create(:user) }

      it 'returns forbidden' do
        make_request
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when user has permission' do
      let(:headers) { auth_headers_for(user) }
      let(:user) { create(:user) }

      before do
        create(:permission, target: event, user:, action: :read)
      end

      it 'returns success' do
        make_request
        expect(response).to have_http_status(:success)
      end
    end

    context 'when user has permission to manage other event' do
      let(:headers) { auth_headers_for(user) }
      let(:user) { create(:user) }
      let(:other_event) { create(:event, :with_conference) }

      before do
        create(:permission, target: other_event, user:, action: :read)
      end

      it 'returns forbidden' do
        make_request
        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end
