require 'rails-helper'

RSpec.describe Message, type: :model do
  describe '#create' do

    context 'can save' do
      It "is valid with content" do
        expect(build(:message, image: nil)).to be_valid
      end

      It "is valid with image" do
        expect(build(:message, cotent: nil)).to be_valid
      end

      It "is valid with content and image" do
        expect(build(:message)).to be_valid
      end
    end

    context "can not save" do
      It "is invalid without content and image" do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("can't be blank")
      end

      It "is invalid without group_id" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("can't be blank")
      end

      It "is invalid without user_id" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("can't be blank")
      end
    end

  end
end