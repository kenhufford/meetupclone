json.userChannelships do
  @user_channelships.each do |channelship|
    json.set! channelship.id do
      json.partial! 'channelship', channelship: channelship
    end
  end
end
