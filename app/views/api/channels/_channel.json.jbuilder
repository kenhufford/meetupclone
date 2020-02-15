
json.extract! channel, :id, :name, :channel_icon, :channel_icon2, :group_id, :hash_string, :dm

json.channelshipId do
    json.array! channel.channelships.where(:channelships => {:user_id => current_user.id}).pluck(:id)
end