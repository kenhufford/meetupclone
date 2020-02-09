class Api::MessagesController < ApplicationController
    before_action :require_logged_in, only: [:index, :create, :destroy]

  def index
      @messages = Channel.find(params[:id]).messages.order(created_at: :asc).limit(40)
      render "api/messages/index"
  end

  def create
    @message = Message.new(message_params)
    
    # if params[:receiver_id] && !params[:channel_id]
    #     @receiver = User.find(params[receiver_id])
    #     @message_channel = Channel.new
    #     @message_channel.name = `#{current_user.name + " " + @receiver.name}`
    #     @message_channel.channel_icon = "defaultChannelURL"
    #     @message.channel_id = @message_channel.id
    #     @receiver_channelship = Channelship.new
    #     @receiver_channelship.user_id = params[:receiver_id]
    #     @receiver_channelship.channel_id = @message_channel.id
    #     @receiver_channelship.moderator = true;
    #     @sender_channelship = Channelship.new
    #     @sender_channelship.user_id = current_user.id
    #     @sender_channelship.channel_id = @message_channel.id
    #     @sender_channelship.moderator = true;
    # end
    if @message.save
        @messages = Channel.find(params[:channel_id]).messages.order(created_at: :asc).limit(20)
        render "api/messages/index"
    else
        render json: [@message.errors.full_messages], status: 401
    end
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
