require 'rails_helper'

RSpec.describe ParticipationPolicy do
  subject(:policy) { described_class.new(participation, user: current_user) }

  let(:current_user) { create(:user) }
  let(:participation) { create(:participation, user:, event:) }
  let(:conference) { create(:conference) }
  let(:event) { create(:event, conference:) }
  let(:user) { create(:user) }

  describe '#show?' do
    subject(:show?) { policy.apply(:show?) }

    it { is_expected.to be_falsey }

    context 'when user is participant' do
      let(:participation) { create(:participation, event:, user: current_user) }

      it { is_expected.to be_truthy }
    end

    context 'when user is conference manager' do
      before do
        create(:permission, user: current_user, target: conference, action: :manage)
      end

      it { is_expected.to be_truthy }
    end
  end

  describe '#comment?' do
    subject(:comment?) { policy.apply(:comment?) }

    it { is_expected.to be_falsey }

    context 'when user is participant' do
      let(:participation) { create(:participation, event:, user: current_user) }

      it { is_expected.to be_truthy }
    end

    context 'when user is reviewer' do
      let(:participation) { create(:participation, event:, user:, reviewer: current_user) }

      it { is_expected.to be_truthy }
    end

    context 'when user is conference manager' do
      before do
        create(:permission, user: current_user, target: conference, action: :manage)
      end

      it { is_expected.to be_truthy }
    end
  end

  describe '#update?' do
    subject(:update?) { policy.apply(:update?) }

    it { is_expected.to be_falsey }

    context 'when user is participant' do
      let(:participation) { create(:participation, event:, user: current_user) }

      it { is_expected.to be_truthy }
    end

    context 'when user is reviewer' do
      let(:participation) { create(:participation, event:, user:, reviewer: current_user) }

      it { is_expected.to be_falsey }
    end

    context 'when user is conference manager' do
      before do
        create(:permission, user: current_user, target: conference, action: :manage)
      end

      it { is_expected.to be_truthy }
    end
  end

  describe '#update_status?' do
    subject(:update_status?) { policy.apply(:update_status?) }

    it { is_expected.to be_falsey }

    context 'when user is participant' do
      let(:participation) { create(:participation, event:, user: current_user) }

      it { is_expected.to be_falsey }
    end

    context 'when user is reviewer' do
      let(:participation) { create(:participation, event:, user:, reviewer: current_user) }

      it { is_expected.to be_falsey }
    end

    context 'when user is conference manager' do
      before do
        create(:permission, user: current_user, target: conference, action: :manage)
      end

      it { is_expected.to be_truthy }
    end
  end

  describe '#update_reviewer?' do
    subject(:update_reviewer?) { policy.apply(:update_reviewer?) }

    it { is_expected.to be_falsey }

    context 'when user is participant' do
      let(:participation) { create(:participation, event:, user: current_user) }

      it { is_expected.to be_falsey }
    end

    context 'when user is reviewer' do
      let(:participation) { create(:participation, event:, user:, reviewer: current_user) }

      it { is_expected.to be_falsey }
    end

    context 'when user is conference manager' do
      before do
        create(:permission, user: current_user, target: conference, action: :manage)
      end

      it { is_expected.to be_truthy }
    end
  end

  describe '#destroy?' do
    subject(:destroy?) { policy.apply(:destroy?) }

    it { is_expected.to be_falsey }

    context 'when user is participant' do
      let(:participation) { create(:participation, event:, user: current_user) }

      it { is_expected.to be_falsey }
    end

    context 'when user is reviewer' do
      let(:participation) { create(:participation, event:, user:, reviewer: current_user) }

      it { is_expected.to be_falsey }
    end

    context 'when user is conference manager' do
      before do
        create(:permission, user: current_user, target: conference, action: :manage)
      end

      it { is_expected.to be_truthy }
    end
  end
end
