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
        expect(json_response.pluck(:id)).to match_array(events.map(&:id))
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
        expect(json_response.pluck(:id)).to match_array(conference1_events.map(&:id))
      end
    end

    context 'with "from" parameter' do
      let(:params) { { from: Time.zone.today } }

      let(:conference) { create(:conference) }
      let!(:events) do
        [
          create(:event, conference:, date: 1.month.ago),
          create(:event, conference:, date: 1.month.from_now),
          create(:event, conference:, date: 2.years.from_now)
        ]
      end

      it 'returns events from specified time range' do
        make_request
        expect(json_response.pluck(:id)).to contain_exactly(events[1].id, events[2].id)
      end
    end

    context 'with "to" parameter' do
      let(:params) { { to: 1.year.from_now } }

      let(:conference) { create(:conference) }
      let!(:events) do
        [
          create(:event, conference:, date: 1.month.ago),
          create(:event, conference:, date: 1.month.from_now),
          create(:event, conference:, date: 2.years.from_now)
        ]
      end

      it 'returns events from specified time range' do
        make_request
        expect(json_response.pluck(:id)).to contain_exactly(events[0].id, events[1].id)
      end
    end

    context 'with "from" and "to" parameters' do
      let(:params) { { from: Time.zone.today, to: 1.year.from_now } }

      let(:conference) { create(:conference) }
      let!(:events) do
        [
          create(:event, conference:, date: 1.month.ago),
          create(:event, conference:, date: 1.month.from_now),
          create(:event, conference:, date: 2.years.from_now)
        ]
      end

      it 'returns events from specified time range' do
        make_request
        expect(json_response.pluck(:id)).to contain_exactly(events[1].id)
      end
    end
  end

  describe 'GET /api/events/:id' do
    subject(:make_request) { get("/api/events/#{event.id}") }

    let(:conference) { create(:conference) }
    let!(:event) { create(:event, conference:) }

    it 'renders a successful response' do
      make_request
      expect(response).to be_successful
      expect(json_response.keys).to match_array(
        %i[id title description attendeesLimit participantsLimit date conferenceId createdAt updatedAt url]
      )
      expect(json_response).to include(
        {
          id: event.id,
          title: event.title,
          description: event.description,
          attendeesLimit: event.attendees_limit,
          participantsLimit: event.participants_limit
        }
      )
    end
  end

  describe 'POST /api/events' do
    subject(:make_request) { post('/api/events', params:) }

    context 'with valid parameters' do
      let(:params) do
        {
          title: 'Test',
          description: 'Description',
          attendeesLimit: 5,
          participantsLimit: 5,
          date: Time.zone.today,
          conferenceId: conference.id,
          registrationFrom: 5.days.ago,
          registrationTo: 5.days.from_now
        }
      end

      let(:conference) { create(:conference) }

      it 'creates a new Event' do
        expect { make_request }.to change(Event, :count).by(1)
      end

      it 'renders a JSON response with the new event' do
        make_request
        expect(response).to have_http_status(:created)
        expect(json_response).to include(
          {
            title: 'Test',
            description: 'Description',
            attendeesLimit: 5,
            participantsLimit: 5,
            conferenceId: conference.id
          }
        )
      end
    end

    context 'with invalid parameters' do
      let(:params) do
        {
          title: 'Test',
          description: 'Description',
          attendees_limit: 5,
          participants_limit: 5,
          date: Time.zone.today
        }
      end

      it 'does not create a new Event' do
        expect { make_request }.not_to change(Event, :count)
      end

      it 'renders a JSON response with errors for the new event' do
        make_request
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response).to eq({ errors: { conference: ['must exist'] } })
      end
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
  end

  describe 'DELETE /api/event/:id' do
    subject(:make_request) { delete("/api/events/#{event.id}") }

    let(:conference) { create(:conference) }
    let!(:event) { create(:event, conference:) }

    it 'destroys the requested event' do
      expect { make_request }.to change(Event, :count).by(-1)
    end
  end
end
