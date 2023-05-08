require 'rails_helper'

RSpec.describe '/events' do
  describe 'GET /api/events' do
    subject(:make_request) { get('/api/events', params:) }

    context 'without parameters' do
      let(:params) { nil }

      let(:conference) { create(:conference) }
      let!(:events) { create_list(:event, 5, conference:) }

      it 'renders a successful response' do
        make_request
        expect(response).to be_successful
        expect(json_response.pluck(:id)).to match_array(events.map { _1.id.to_s })
      end
    end

    context 'with conference_id' do
      let(:params) { { conference_id: target_conference.id } }
      let(:target_conference) { create(:conference) }
      let(:other_conference) { create(:conference) }
      let(:target_conference_events) { create_list(:event, 2, conference: target_conference) }
      let(:other_conference_events) { create_list(:event, 2, conference: other_conference) }

      before do
        target_conference_events
        other_conference_events
      end

      it 'returns events related to specified conference' do
        make_request
        expect(json_response.pluck(:id)).to match_array(target_conference_events.map { _1.id.to_s })
      end
    end

    context 'with "from" parameter' do
      let(:params) { { from: Time.zone.today } }

      let(:conference) { create(:conference) }
      let!(:events) do
        [
          create(
            :event, conference:, registration_from: 3.months.ago, registration_to: 2.months.ago, date: 1.month.ago
          ),
          create(
            :event, conference:, registration_from: 3.months.ago, registration_to: 2.months.ago, date: 1.month.from_now
          ),
          create(
            :event, conference:, registration_from: 3.months.ago, registration_to: 2.months.ago, date: 2.years.from_now
          )
        ]
      end

      it 'returns events from specified time range' do
        make_request
        expect(json_response.pluck(:id)).to contain_exactly(events[1].id.to_s, events[2].id.to_s)
      end
    end

    context 'with "to" parameter' do
      let(:params) { { to: 1.year.from_now } }

      let(:conference) { create(:conference) }
      let!(:events) do
        [
          create(
            :event, conference:, registration_from: 3.months.ago, registration_to: 2.months.ago, date: 1.month.ago
          ),
          create(
            :event, conference:, registration_from: 3.months.ago, registration_to: 2.months.ago, date: 1.month.from_now
          ),
          create(
            :event, conference:, registration_from: 3.months.ago, registration_to: 2.months.ago, date: 2.years.from_now
          )
        ]
      end

      it 'returns events from specified time range' do
        make_request
        expect(json_response.pluck(:id)).to contain_exactly(events[0].id.to_s, events[1].id.to_s)
      end
    end

    context 'with "from" and "to" parameters' do
      let(:params) { { from: Time.zone.today, to: 1.year.from_now } }

      let(:conference) { create(:conference) }
      let!(:events) do
        [
          create(
            :event, conference:, registration_from: 3.months.ago, registration_to: 2.months.ago, date: 1.month.ago
          ),
          create(
            :event, conference:, registration_from: 3.months.ago, registration_to: 2.months.ago, date: 1.month.from_now
          ),
          create(
            :event, conference:, registration_from: 3.months.ago, registration_to: 2.months.ago, date: 2.years.from_now
          )
        ]
      end

      it 'returns events from specified time range' do
        make_request
        expect(json_response.pluck(:id)).to contain_exactly(events[1].id.to_s)
      end
    end
  end

  describe 'GET /api/events/:id' do
    subject(:make_request) { get("/api/events/#{event.id}") }

    let(:conference) { create(:conference) }
    let!(:event) { create(:event, conference:) }

    it 'renders all event fields' do
      make_request
      expect(response).to be_successful
      expect(json_response.keys).to match_array(
        %i[id title description date conferenceId createdAt updatedAt url registrationFrom registrationTo status]
      )
    end

    it 'renders a successful response' do
      make_request
      expect(response).to be_successful
      expect(json_response).to include(
        {
          id: event.id.to_s,
          title: event.title,
          description: event.description
        }
      )
    end
  end

  describe 'PATCH /api/events/:id' do
    subject(:make_request) { patch("/api/events/#{event.id}", params:, headers:) }

    let(:headers) { auth_headers_for(user) }
    let(:user) { create(:user) }

    let(:conference) { create(:conference) }
    let(:event) { create(:event, title: 'Title', conference:) }

    context 'with valid parameters' do
      let(:params) { { title: 'Updated' } }

      it 'updates the requested event' do
        expect { make_request }.to change { event.reload.title }.from('Title').to('Updated')
      end

      it 'renders a JSON response with the event' do
        make_request
        expect(response).to have_http_status(:ok)
        expect(json_response).to include(
          {
            id: event.id.to_s,
            title: 'Updated',
            description: event.description
          }
        )
      end
    end

    context 'with invalid registration_from params' do
      let(:params) { { registration_from: Date.new(2023, 4, 1), registration_to: Date.new(2023, 3, 1) } }

      it 'renders a JSON response with errors for the event' do
        make_request
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response[:errors]).to contain_exactly(
          include(
            path: 'registrationTo',
            type: 'greaterThanOrEqualTo',
            message: 'must be greater than or equal to 2023-04-01',
            fullMessage: 'Registration end date must be greater than or equal to 2023-04-01'
          )
        )
      end

      context 'with lt translation' do
        let(:headers) { super().merge({ 'Accept-Language': 'lt' }) }

        it 'renders errors with lt translation' do
          make_request
          expect(response).to have_http_status(:unprocessable_entity)
          expect(json_response[:errors]).to contain_exactly(
            include(
              path: 'registrationTo',
              type: 'greaterThanOrEqualTo',
              message: 'turi būti didesnė arba lygi 2023-04-01',
              fullMessage: 'Registracijos pabaigos data turi būti didesnė arba lygi 2023-04-01'
            )
          )
        end
      end
    end
  end
end
