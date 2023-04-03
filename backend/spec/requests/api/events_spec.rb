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
      let(:params) { { conference_id: conference1.id } }
      let(:conference1) { create(:conference) }
      let(:conference2) { create(:conference) }
      let(:conference1_events) { create_list(:event, 2, conference: conference1) }
      let(:conference2_events) { create_list(:event, 2, conference: conference2) }

      before do
        conference1_events
        conference2_events
      end

      it 'returns events related to specified conference' do
        make_request
        expect(json_response.pluck(:id)).to match_array(conference1_events.map { _1.id.to_s })
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
        %i[
          id title description participantsLimit date conferenceId createdAt updatedAt url registrationFrom
          registrationTo status
        ]
      )
    end

    it 'renders a successful response' do
      make_request
      expect(response).to be_successful
      expect(json_response).to include(
        {
          id: event.id.to_s,
          title: event.title,
          description: event.description,
          participantsLimit: event.participants_limit
        }
      )
    end
  end

  describe 'PATCH /api/events/:id' do
    subject(:make_request) { patch("/api/events/#{event.id}", params:) }

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
            title: 'Updated',
            description: event.description
          }
        )
      end
    end

    context 'with invalid parameters' do
      let(:params) { { title: '' } }

      it 'renders a JSON response with errors for the event' do
        make_request
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response).to eq({ errors: { title: ["can't be blank"] } })
      end
    end

    context 'with invalid registration_from params' do
      let(:params) { { registration_from: 5.days.from_now, registration_to: 5.days.ago } }

      it 'renders a JSON response with errors for the event' do
        make_request
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response[:errors][:base]).to include('invalid registration period')
      end
    end
  end
end
