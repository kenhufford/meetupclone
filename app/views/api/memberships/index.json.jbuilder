json.group_memberships @group_memberships, partial: '/api/groups/membership', as: :membership
json.user_memberships @user_memberships, partial: '/api/groups/membership', as: :membership