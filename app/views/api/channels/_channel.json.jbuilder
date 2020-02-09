json.extract! channel, :id, :name, :channel_icon, :group_id

json.memberIds do
    json.array! channel.users.pluck(:id)
end