require 'rails_helper'

RSpec.describe 'Api::Sessions' do
  describe 'POST /api/signup' do
    subject(:make_request) { post('/api/signup', params:) }

    let(:email) { 'new_user@example.com' }
    let(:params) { { email:, password: 'password', fullName: 'Full Name' } }

    it 'returns created user data and JWT token' do
      make_request
      # TODO: Validate JWT
      expect(response).to have_http_status(:success)
      expect(json_response[:jwt]).to match(/^e/)
      expect(json_response[:user]).to include(
        id: an_instance_of(String),
        email:,
        fullName: 'Full Name'
      )
    end

    it 'creates new user in DB' do
      expect { make_request }.to change(User, :count).by(1)
    end

    context 'when user with the same email exists' do
      before do
        create(:user, email:)
      end

      it 'returns error' do
        make_request
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response).to match(
          {
            errors: [
              include(
                path: 'email',
                type: 'taken',
                fullMessage: 'Email has already been taken'
              )
            ]
          }
        )
      end

      it 'does not create user' do
        expect { make_request }.not_to change(User, :count)
      end
    end

    context 'with missing data' do
      let(:params) { { password: 'password' } }

      it 'returns error' do # rubocop:disable RSpec/ExampleLength
        make_request
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response).to match(
          {
            errors: [
              include(
                path: 'email',
                type: 'blank',
                fullMessage: "Email can't be blank"
              ),
              include(
                path: 'fullName',
                type: 'blank',
                fullMessage: "Full name can't be blank"
              )
            ]
          }
        )
      end

      it 'does not create user' do
        expect { make_request }.not_to change(User, :count)
      end
    end
  end

  describe 'POST /api/login' do
    subject(:make_request) { post('/api/login', params:) }

    let!(:user) { create(:user, email: 'test@example.com', password: 'password') }

    context 'with valid data' do
      let(:params) { { email: 'test@example.com', password: 'password' } }

      it 'returns user & JWT' do
        make_request
        expect(response).to have_http_status(:success)
        expect(json_response[:jwt]).to start_with(/^e/)
        expect(json_response[:user]).to include(
          id: user.id.to_s,
          email: user.email,
          fullName: user.full_name
        )
        # TODO: Check that jwt is valid & usable
      end
    end

    context 'with invalid email' do
      let(:params) { { email: 'invalid@exmaple.com', password: 'password' } }

      it 'returns error' do
        make_request
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response).to eq(
          {
            errors: [
              {
                type: 'invalid_email_or_password',
                fullMessage: 'Invalid email or password'
              }
            ]
          }
        )
      end
    end

    context 'with invalid password' do
      let(:params) { { email: 'test@exmaple.com', password: 'incorrect' } }

      it 'returns error' do
        make_request
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response).to eq(
          {
            errors: [
              {
                type: 'invalid_email_or_password',
                fullMessage: 'Invalid email or password'
              }
            ]
          }
        )
      end
    end
  end

  describe 'GET /api/me' do
    subject(:make_request) { get('/api/me', headers:) }

    context 'with valid JWT' do
      let(:user) { create(:user) }
      let(:token) { Authentication.create_jwt(user_id: user.id) }
      let(:headers) { { 'Authorization' => "Bearer #{token}" } }

      it 'shows user' do
        make_request
        expect(response).to have_http_status(:success)
        expect(json_response).to include(
          id: user.id.to_s,
          email: user.email,
          fullName: user.full_name
        )
      end
    end

    context 'with expired JWT' do
      let(:user) { create(:user) }
      let(:token) do
        JWT.encode({ id: user.id, exp: 1.day.ago.to_i }, Authentication::SECRET_KEY, Authentication::JWT_ALGORITHM)
      end
      let(:headers) { { 'Authorization' => "Bearer #{token}" } }

      it 'shows not authorized error' do
        make_request
        expect(response).to have_http_status(:unauthorized)
        expect(json_response).to eq({ errors: [{ type: 'not_authenticated', fullMessage: 'Not authenticated' }] })
      end
    end

    context 'with invalid JWT' do
      let(:headers) { { Authorization: 'test' } }

      it 'shows not authorized error' do
        make_request
        expect(response).to have_http_status(:unauthorized)
        expect(json_response).to eq({ errors: [{ type: 'not_authenticated', fullMessage: 'Not authenticated' }] })
      end
    end

    context 'without JWT' do
      it 'shows not authorized error' do
        make_request
        expect(response).to have_http_status(:unauthorized)
        expect(json_response).to eq({ errors: [{ type: 'not_authenticated', fullMessage: 'Not authenticated' }] })
      end
    end
  end
end
