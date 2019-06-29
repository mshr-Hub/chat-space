class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
  end

  private

  def set_group
    @group = Group.find(params[:group_id])
  end
end
