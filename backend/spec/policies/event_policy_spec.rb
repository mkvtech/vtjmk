require 'rails_helper'

RSpec.describe EventPolicy do
  subject(:policy) { described_class.new(event, user:) }

  let(:user) { create(:user) }
  let(:event) { create(:event, :with_conference) }

  describe '#update?' do
    subject(:update?) { policy.apply(:update?) }

    context 'without user' do
      let(:user) { nil }

      it { is_expected.to be_falsey }
    end

    context 'with user' do
      it { is_expected.to be_falsey }
    end

    context 'when user has permission to manage event' do
      before do
        create(:permission, user:, target: event, action: :manage)
      end

      it { is_expected.to be_truthy }
    end

    context 'when user has permission to manage other event' do
      let(:other_event) { create(:event, :with_conference) }

      before do
        create(:permission, user:, target: other_event, action: :manage)
      end

      it { is_expected.to be_falsey }
    end

    context 'when user has permission to manage conference' do
      let(:event) { create(:event, conference:) }
      let(:conference) { create(:conference) }

      before do
        create(:permission, user:, target: conference, action: :manage)
      end

      it { is_expected.to be_truthy }
    end

    context 'when user is admin' do
      let(:user) { create(:user, privilege_level: :admin) }

      it { is_expected.to be_truthy }
    end
  end
end
