# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#validations' do
    context 'with factory default' do
      subject { create(:user) }

      it { is_expected.to be_valid }
    end

    context 'without email' do
      subject { create(:user, email: nil) }

      it { expect { subject }.to raise_error(ActiveRecord::RecordInvalid, 'Validation failed: Email is invalid') }
    end

    context 'when email is not correctly formatted' do
      subject { create(:user, email: 'not.an.email') }

      it { expect { subject }.to raise_error(ActiveRecord::RecordInvalid, 'Validation failed: Email is invalid') }
    end

    context 'when email is not unique' do
      subject { create(:user, email: 'used@email.com') }

      before { create(:user, email: 'used@email.com') }

      it { expect { subject }.to raise_error(ActiveRecord::RecordInvalid, /Email has already been taken/) }
    end
  end
end
