require 'rails_helper'

RSpec.describe '/api/permissions' do
  let(:headers) { auth_headers_for(user) }
  let(:user) { create(:user, privilege_level: :admin) }
  let(:conference) { create(:conference) }

  describe 'GET /' do
    subject(:make_request) { get('/api/permissions', headers:) }

    let(:permission_user) { create(:user) }
    let!(:permission) { create(:permission, user: permission_user, action: :manage, target: conference) }

    context 'when user is not admin' do
      let(:user) { create(:user) }

      it 'returns error' do
        make_request
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when user is admin' do
      it 'returns permissions' do
        make_request
        expect(response).to have_http_status(:ok)
        expect(json_response).not_to be_empty
        expect(json_response).to include(
          a_hash_including(
            id: permission.id.to_s,
            user: a_hash_including(
              id: permission_user.id.to_s,
              fullName: permission_user.full_name
            )
          )
        )
      end
    end
  end

  describe 'POST /' do
    subject(:make_request) { post('/api/permissions', headers:, params:) }

    context 'when user is not admin' do
      let(:user) { create(:user) }
      let(:params) { nil }

      it 'returns error' do
        make_request
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'with invalid params' do
      let(:params) { { data: { action: :invalid } } }

      it 'does not create permission' do
        expect { make_request }.not_to change(Permission, :count)
      end

      it 'returns error' do
        make_request
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'with valid params' do
      let(:params) do
        {
          data: {
            action: :manage,
            target_type: 'Conference',
            target_id: conference.id,
            user_id: permission_user.id
          }
        }
      end
      let(:permission_user) { create(:user) }

      it 'creates new permission' do
        expect { make_request }.to change(Permission, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end
  end

  describe 'DELETE /:permission_id' do
    subject(:make_request) { delete("/api/permissions/#{permission.id}", headers:) }

    let(:permission_user) { create(:user) }
    let!(:permission) { create(:permission, user: permission_user, action: :manage, target: conference) }

    it 'deletes permission' do
      expect { make_request }.to change(Permission, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end

    context 'when user is not admin' do
      let(:user) { create(:user) }

      it 'returns error' do
        make_request
        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end
