# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Registration', type: :request do
  describe 'POST /api/v1/auth/' do
    subject do
      post url, params: params
      response
    end

    let(:url) { '/api/v1/auth' }

    context 'with valid params' do
      let(:params) { { email: 'test@email.com', password: 'some-password' } }

      it { is_expected.to have_http_status(:success) }
      it { is_expected.to have_header('access-token') }
      it { is_expected.to have_header('client') }
      it { is_expected.to have_header('expiry') }
      it { is_expected.to have_header('uid') }
    end

    context 'with invalid params' do
      let(:body) { JSON.parse(subject.body) }
      let(:messages) { body['errors']['full_messages'] }

      context 'when missing password' do
        let(:params) { { email: 'test@email.com' } }

        it { is_expected.to have_http_status(422) }
        it { expect(messages).to eq(['Password can\'t be blank']) }
      end

      context 'when missing email' do
        let(:params) { { password: 'password' } }

        it { is_expected.to have_http_status(422) }
        it { expect(messages).to eq(['Email can\'t be blank']) }
      end

      context 'when email is invalid' do
        let(:params) { { email: 'test.email.com', password: 'password' } }

        it { is_expected.to have_http_status(422) }
        it { expect(messages).to eq(['Email is not an email']) }
      end

      context 'when email is already taken' do
        before { create(:user, email: 'test@email.com', password: 'password') }

        let(:params) { { email: 'test@email.com', password: 'password' } }

        it { is_expected.to have_http_status(422) }
        it { expect(messages).to eq(['Email has already been taken']) }
      end
    end
  end
end
