
json.extract! channel, :id, :name, :channel_icon, :channel_icon2, :group_id, :hash_string, :updated_at, :dm

json.memberIds do
    json.array! channel.users.pluck(:id)
end