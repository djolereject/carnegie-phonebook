# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Session', type: :request do
  describe 'POST /api/v1/auth/sign_in' do
    subject do
      post url, params: params
      response
    end

    let(:url) { '/api/v1/auth/sign_in' }

    context 'with valid params' do
      let(:params) { { email: 'test@email.com', password: 'some-password' } }

      context 'when user exists' do
        before { create(:user, email: 'test@email.com', password: 'some-password') }

        it { is_expected.to have_http_status(:success) }
        it { is_expected.to have_header('access-token') }
        it { is_expected.to have_header('client') }
        it { is_expected.to have_header('expiry') }
        it { is_expected.to have_header('uid') }
      end

      context 'when user does not exist' do
        it { is_expected.to have_http_status(:unauthorized) }
      end
    end

    context 'with invalid params' do
      before { create(:user, email: 'test@email.com', password: 'some-password') }

      context 'without email' do
        let(:params) { { password: 'some-password' } }

        it { is_expected.to have_http_status(:unauthorized) }
      end

      context 'without password' do
        let(:params) { { email: 'test@email.com' } }

        it { is_expected.to have_http_status(:unauthorized) }
      end

      context 'with wrong password' do
        let(:params) { { email: 'test@email.com', password: 'wrong-password' } }

        it { is_expected.to have_http_status(:unauthorized) }
      end
    end
  end

  describe 'DELETE /api/v1/auth/sign_out' do
    subject do
      login
      delete url, headers: headers
      response
    end

    let(:url) { '/api/v1/auth/sign_out' }

    context 'with valid params' do
      let(:login) do
        post '/api/v1/auth/sign_in', params: params
        response
      end
      let(:params) { { email: 'test@email.com', password: 'some-password' } }
      let(:headers) do
        { uid: login.headers['uid'],
          client: login.headers['client'],
          'access-token': login.headers['access-token'] }
      end

      context 'when user exists' do
        before { create(:user, email: 'test@email.com', password: 'some-password') }

        it { is_expected.to have_http_status(:success) }
      end

      context 'when user does not exist' do
        it { is_expected.to have_http_status(:not_found) }
      end

      context 'when missing header' do
        let(:headers) { { uid: login.headers['uid'], client: login.headers['client'] } }

        it { is_expected.to have_http_status(:not_found) }
      end
    end
  end
end
