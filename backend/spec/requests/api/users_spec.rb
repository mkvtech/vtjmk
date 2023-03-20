require 'rails_helper'

RSpec.describe '/users' do
  describe '#valid?' do
    subject(:user) { create(:user) }

    it { is_expected.to be_valid }

    it 'is valid when reloaded or queried' do
      expect(user.reload).to be_valid
      expect(User.find(user.id)).to be_valid
    end
  end
end
