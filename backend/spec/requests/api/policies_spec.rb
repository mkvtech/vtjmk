require 'rails_helper'

RSpec.describe '/api/policies' do
  describe 'POST /api/policies' do
    subject(:make_request) { post('/api/policies', params:, headers:) }

    context 'when not authenticated' do
      let(:headers) { {} }
      let(:params) { {} }

      it 'returns unauthorized' do
        make_request
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when is authenticated' do
      let(:headers) { auth_headers_for(user) }
      let(:user) { create(:user) }
      let(:params) do
        {
          'policies' => {
            'events' => {
              'items' => {
                event.id.to_s => 'update'
              }
            }
          }
        }
      end
      let(:event) { create(:event, :with_conference) }

      it 'returns policies for current user' do
        make_request
        expect(response).to have_http_status(:success)
        expect(response.parsed_body).to eq(
          {
            'policies' => {
              'events' => {
                'items' => {
                  event.id.to_s => {
                    'update' => false
                  }
                }
              }
            }
          }
        )
      end

      context 'when is allowed' do
        before do
          create(:permission, user:, target: event, action: :manage)
        end

        it 'returns policies for current user' do
          make_request
          expect(response).to have_http_status(:success)
          expect(response.parsed_body).to eq(
            {
              'policies' => {
                'events' => {
                  'items' => {
                    event.id.to_s => {
                      'update' => true
                    }
                  }
                }
              }
            }
          )
        end
      end
    end

    context 'with UserPolicy' do
      let(:headers) { auth_headers_for(user) }
      let(:user) { create(:user, privilege_level: :admin) }
      let(:params) do
        {
          'policies' => {
            'user' => {
              'general' => %w[manageEvents admin]
            }
          }
        }
      end
      let(:event) { create(:event, :with_conference) }

      it 'returns policies for current user' do
        make_request
        expect(response).to have_http_status(:success)
        expect(response.parsed_body).to eq(
          {
            'policies' => {
              'user' => {
                'general' => {
                  'manageEvents' => true,
                  'admin' => true
                }
              }
            }
          }
        )
      end
    end
  end
end
