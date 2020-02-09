class Api::MessagesController < ApplicationController
    before_action :require_logged_in, only: [:index, :create, :destroy]

  def index
      @messages = Channel.find(params[:channel_id]).messages.order(created_at: :asc).limit(40)
      render "api/messages/index"
  end

  def create
    # @message = Message.new(message_params)
    # if @message.save
    #     @messages = Channel.find(params[:channel_id]).messages.order(created_at: :asc).limit(20)
    #     render "api/messages/index"
    # else
    #     render json: [@message.errors.full_messages], status: 401
    # end
  end

  def destroy
    @message = Message.find(params[:id])
     if !@message.destroy
        render json: ["No message to destroy"], status: 404
     end
    @messages = Channel.find(@message.channel_id).messages.order(created_at: :asc).limit(20)
    render "api/messages/index"
  end

  private

  def message_params
    params.require(:message).permit(
    :id,
    :message,
    :channel_id,
    :user_id)
  end
end
