require 'rails_helper'

RSpec.describe UserPolicy do
  subject(:policy) { described_class.new(nil, user:) }

  let(:user) { create(:user) }

  describe 'admin?' do
    subject(:admin?) { policy.apply(:admin?) }

    it { is_expected.to be_falsey }

    context 'when user is admin' do
      let(:user) { create(:user, privilege_level: :admin) }

      it { is_expected.to be_truthy }
    end
  end

  describe 'manage_events?' do
    subject(:manage_events?) { policy.apply(:manage_events?) }

    it { is_expected.to be_falsey }

    context 'when user has permission to manage any conference' do
      let(:conference) { create(:conference) }

      before do
        create(:permission, user:, target: conference, action: :manage)
      end

      it { is_expected.to be_truthy }
    end
  end

  describe 'reviews_index?' do
    subject(:reviews_index?) { policy.apply(:reviews_index?) }

    it { is_expected.to be_falsey }

    context 'when user is assigned to review any participation request' do
      let(:event) { create(:event, :with_conference) }
      let(:participant) { create(:user) }
      let(:participation) { create(:participation, user: participant, event:) }

      before do
        create(:review, participation:, user:)
      end

      it { is_expected.to be_truthy }
    end
  end
end
