if @old_channel 
    json.partial! '/api/channels/oldchannel', old_channel: @old_channel
else
    json.partial! '/api/channels/channel', channel: @channel
end

