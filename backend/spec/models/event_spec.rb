require 'rails_helper'

RSpec.describe Event do
  describe '#valid?' do
    context 'with valid event' do
      subject(:event) { build(:event, :with_conference) }

      it { is_expected.to be_valid }
    end

    context 'with invalid registration period' do
      subject(:event) do
        build(:event, :with_conference, registration_from: 5.days.from_now, registration_to: 5.days.ago)
      end

      it 'is invalid' do
        expect(event).to be_invalid
      end
    end
  end
end
