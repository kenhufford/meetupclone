json.group_channels do 
  @group_channels.each do |channel|
    json.set! channel.id do
      json.partial! 'channel', channel: channel
    end
  end
end

json.user_channels do 
  @user_channels.each do |channel|
    json.set! channel.id do
      json.partial! 'channel', channel: channel
    end
  end
end
