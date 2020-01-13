
json.partial! "api/users/user", user: @user
json.memberships @user.memberships, partial: '/api/users/membership', as: :membership
json.groupIds do
    json.array! @user.groups.pluck(:id)
end
json.eventIds do
    json.array! @user.events.pluck(:id)
end



