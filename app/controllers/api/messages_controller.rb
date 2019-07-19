class Api::MessagesController < ApplicationController
  def index
    @messages = Message.where('id > ?', params[:id])
  end
end