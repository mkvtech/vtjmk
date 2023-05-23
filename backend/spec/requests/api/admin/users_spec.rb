require 'rails_helper'

RSpec.describe '/api/admin/users' do
  let(:headers) { auth_headers_for(user) }
  let(:user) { create(:user, privilege_level: :admin) }

  describe 'GET /' do
    subject(:make_request) { get('/api/admin/users', headers:) }

    let!(:other_user) { create(:user) }

    it 'returns all users' do
      make_request
      expect(response).to have_http_status(:ok)
      expect(json_response.size).to be(2)
      expect(json_response).to contain_exactly(
        a_hash_including(
          id: user.id.to_s,
          fullName: user.full_name
        ),
        a_hash_including(
          id: other_user.id.to_s,
          fullName: other_user.full_name
        )
      )
    end
  end
end
