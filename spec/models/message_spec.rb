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
    end

  end
end