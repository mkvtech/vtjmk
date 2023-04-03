require 'rails_helper'

RSpec.describe User do
  describe '#valid?' do
    context 'with valid user' do
      subject(:user) { build(:user) }

      it { is_expected.to be_valid }
    end

    context 'when user with the same email exists' do
      subject(:user) { build(:user) }

      before do
        create(:user, email: user.email)
      end

      it 'is invalid' do
        expect(user).to be_invalid
      end
    end
  end
end
