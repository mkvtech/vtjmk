require 'rails_helper'

RSpec.describe '/api/conferences/:conference_id/events' do
  describe 'POST /' do
    subject(:make_request) { post("/api/conferences/#{conference.id}/events", headers:, params:) }

    let(:params) { {} }
    let(:headers) { auth_headers_for(user) }
    let(:user) { create(:user) }
    let(:conference) { create(:conference) }

    context 'without permission' do
      it 'returns unauthorized' do
        make_request
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'with invalid params' do
      let(:params) { nil }

      before do
        create(:permission, user:, action: :manage, target: conference)
      end

      it 'does not create conference event' do
        expect { make_request }.not_to change(Event, :count)
      end

      it 'returns error' do
        make_request
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response[:errors]).not_to be_empty
        expect(json_response[:errors]).to include(a_hash_including({ path: 'date', message: "can't be blank" }))
      end
    end

    context 'with valid params' do
      let(:params) do
        {
          date: Date.new(2023, 5, 1),
          registration_from: Date.new(2023, 1, 1),
          registration_to: Date.new(2023, 4, 1),
          copy_title_from_conference: true,
          copy_description_from_conference: true
        }
      end

      before do
        create(:permission, user:, action: :manage, target: conference)
      end

      it 'creates new conference event' do
        expect { make_request }.to change(Event, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end
  end
end
