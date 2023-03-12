require 'rails_helper'

RSpec.describe '/api/conferences', type: :request do
  describe 'GET /api/conferences' do
    let!(:conferences) { create_list(:conference, 5) }

    it 'renders a successful response' do
      get '/api/conferences'
      expect(response).to be_successful
      expect(json_response.pluck(:id)).to match_array(conferences.map(&:id))
    end
  end

  describe 'GET /api/confernces/:id' do
    let!(:conference) { create(:conference) }

    it 'renders a successful response' do
      get("/api/conferences/#{conference.id}")
      expect(response).to be_successful
      expect(json_response).to include(
        {
          id: conference.id,
          title: conference.title,
          description: conference.description
        }
      )
    end
  end

  describe 'POST /api/conferences' do
    subject(:make_request) { post '/api/conferences', params: }

    context 'with valid parameters' do
      let(:params) do
        { title: 'Title', description: 'Description' }
      end

      it 'creates a new Conference' do
        expect { make_request }.to change(Conference, :count).by(1)
      end

      it 'renders a JSON response with the new conference' do
        make_request

        expect(response).to have_http_status(:created)
        expect(json_response.keys).to match_array(%i[id title description createdAt updatedAt url])
        expect(json_response).to include(
          {
            title: params[:title],
            description: params[:description]
          }
        )
      end
    end

    context 'with invalid parameters' do
      let(:params) do
        { description: 'Description' }
      end

      it 'does not create a new Conference' do
        expect { make_request }.not_to change(Conference, :count)
      end

      it 'renders a JSON response with errors for the new conference' do
        make_request
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response).to eq({ errors: { title: ["can't be blank"] } })
      end
    end
  end

  describe 'PATCH /api/conferences/:id' do
    subject(:make_request) { patch("/api/conferences/#{conference.id}", params:) }

    let(:conference) { create(:conference, title: 'Title', description: 'Description') }

    context 'with valid parameters' do
      let(:params) { { title: 'Updated' } }

      it 'updates the requested conference' do
        expect { make_request }.to change { conference.reload.title }.from('Title').to('Updated')
      end

      it 'renders a JSON response with the conference' do
        make_request
        expect(response).to have_http_status(:ok)
        expect(json_response).to include(
          {
            id: conference.id,
            title: 'Updated',
            description: conference.description
          }
        )
      end
    end

    context 'with invalid parameters' do
      let(:params) { { title: '' } }

      it 'renders a JSON response with errors for the conference' do
        make_request
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response).to eq({ errors: { title: ["can't be blank"] } })
      end
    end
  end

  describe 'DELETE /api/conferences/:id' do
    subject(:make_request) { delete("/api/conferences/#{conference.id}") }

    let!(:conference) { create(:conference) }

    it 'destroys the requested conference' do
      expect { make_request }.to change(Conference, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end
