class ChatChannel < ApplicationCable::Channel
  def subscribed
    @chat_channel = Channel.find(params[:id])
    stream_for @chat_channel
  end

  def speak(data)
    message = Message.new(message: data['message'])
    message.user_id = data['user_id']
    message.channel_id = data['channel_id']
    if message.save
      socket = { message: message, type: 'message' }
      ChatChannel.broadcast_to(@chat_channel, socket)
    end
  end

  def unsubscribed; end
end