# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Contact, type: :model do
  describe '#validations' do
    context 'with factory default' do
      subject { create(:contact) }

      it { is_expected.to be_valid }
    end

    context 'without name' do
      subject { create(:contact, name: nil) }

      it { expect { subject }.to raise_error(ActiveRecord::RecordInvalid, 'Validation failed: Name can\'t be blank') }
    end

    context 'without phone' do
      subject { create(:contact, phone: nil) }

      it { expect { subject }.to raise_error(ActiveRecord::RecordInvalid, 'Validation failed: Phone can\'t be blank') }
    end

    context 'without user' do
      subject { create(:contact, user: nil) }

      it { expect { subject }.to raise_error(ActiveRecord::RecordInvalid, 'Validation failed: User must exist') }
    end
  end
end
