require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe "#index" do

    context "log in" do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      it "assigns @message" do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it "assigns @group" do
        expect(assigns(:group)).to eq group
      end

      it "renders index" do
        expect(response).to render_template :index
      end
    end

    context "not log in" do
      before do
        get :index, params: { group_id: group.id }
      end
    end

  end
end