json.set! :all_groups do 
  @groups.each do |group|
    json.set! group.id do
      json.partial! "api/groups/group", group: group
    end
  end
end

json.set! :user_groups do 
  @user_groups.each do |group|
    json.set! group.id do
      json.partial! "api/groups/group", group: group
    end
  end
end


json.all_groups_count @all_groups_count
json.user_groups_count @user_groups_count


