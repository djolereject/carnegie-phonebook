# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Contacts', type: :request do
  shared_context 'api call' do |method|
    subject do
      send(method, url, params: params) # get, post, patch or delete
      response
    end

    let(:url) { {} }
    let(:params) { {} }
    let(:current_user) { create(:user, password: 'password') }
    let(:json) { JSON.parse(subject.body, symbolize_names: true) }
  end

  describe 'GET /api/v1/contacts' do
    include_context 'api call', :get

    let(:url) { '/api/v1/contacts' }

    context 'when signed in' do
      sign_in(:current_user)

      it { is_expected.to have_http_status(:success) }

      context 'with contacts for user' do
        let!(:contacts) { create_list(:contact, 2, user: current_user) }

        it { expect(json.first).to include(name: contacts.first.name, phone: contacts.first.phone) }
        it { expect(json.second).to include(name: contacts.second.name, phone: contacts.second.phone) }
      end

      context 'without contacts for user' do
        let!(:contacts) { create_list(:contact, 2) }

        it { expect(json).to eq([]) }
      end
    end

    context 'when not signed in' do
      it { is_expected.to have_http_status(:unauthorized) }
    end
  end

  describe 'GET /api/v1/contacts/:id' do
    include_context 'api call', :get

    let(:url) { "/api/v1/contacts/#{id}" }
    let(:id) { 0 }

    context 'when signed in' do
      sign_in(:current_user)

      let(:id) { contact.id }

      context 'with requested contact' do
        let!(:contact) { create(:contact, user: current_user) }

        it { is_expected.to have_http_status(:success) }
        it { expect(json).to include(name: contact.name, phone: contact.phone) }
      end

      context 'without requested contact' do
        let!(:contact) { create(:contact) }

        it { is_expected.to have_http_status(:not_found) }
      end
    end

    context 'when not signed in' do
      it { is_expected.to have_http_status(:unauthorized) }
    end
  end

  describe 'POST /api/v1/contacts' do
    include_context 'api call', :post

    let(:url) { '/api/v1/contacts' }

    context 'when signed in' do
      sign_in(:current_user)

      context 'with valid params' do
        let(:params) { { contact: { name: 'Name', phone: '123-456' } } }

        it { is_expected.to have_http_status(:created) }
        it { expect(json).to include(name: 'Name', phone: '123-456') }
      end

      context 'with invalid params' do
        let(:params) { { name: 'not nested', phone: '123-456' } }

        it { is_expected.to have_http_status(:unprocessable_entity) }
      end

      context 'without name' do
        let(:params) { { contact: { name: nil, phone: '123-456' } } }

        it { is_expected.to have_http_status(:unprocessable_entity) }
      end

      context 'without phone' do
        let(:params) { { contact: { name: 'A Name', phone: nil } } }

        it { is_expected.to have_http_status(:unprocessable_entity) }
      end
    end

    context 'when not signed in' do
      it { is_expected.to have_http_status(:unauthorized) }
    end
  end

  describe 'PATCH /api/v1/contacts/:id' do
    include_context 'api call', :patch

    let(:url) { "/api/v1/contacts/#{id}" }
    let(:id) { 0 }

    context 'when signed in' do
      sign_in(:current_user)

      context 'with existing contact' do
        let(:id) { contact.id }
        let(:contact) { create(:contact, user: current_user) }

        context 'with valid params' do
          let(:params) { { contact: { name: 'new name', phone: 'new phone' } } }

          it { is_expected.to have_http_status(:success) }
        end

        context 'when contact does not belong to user' do
          let(:contact) { create(:contact) }

          it { is_expected.to have_http_status(:not_found) }
        end

        context 'when params are invalid' do
          let(:params) { { name: 'not nested', phone: '123-456' } }

          it { is_expected.to have_http_status(:unprocessable_entity) }
        end
      end

      context 'without existing contact' do
        it { is_expected.to have_http_status(:not_found) }
      end
    end

    context 'when not signed in' do
      it { is_expected.to have_http_status(:unauthorized) }
    end
  end

  describe 'DELETE /api/v1/contacts/:id' do
    include_context 'api call', :delete

    let(:url) { "/api/v1/contacts/#{id}" }
    let(:id) { 0 }

    context 'when signed in' do
      sign_in(:current_user)

      context 'with existing contact' do
        let(:id) { contact.id }
        let(:contact) { create(:contact, user: current_user) }

        it { is_expected.to have_http_status(:success) }

        context 'when contact does not belong to user' do
          let(:contact) { create(:contact) }

          it { is_expected.to have_http_status(:not_found) }
        end
      end

      context 'without existing contact' do
        it { is_expected.to have_http_status(:not_found) }
      end
    end

    context 'when not signed in' do
      it { is_expected.to have_http_status(:unauthorized) }
    end
  end
end
