json.group_memberships @group_memberships, partial: '/api/memberships/membership', as: :membership
json.user_memberships @user_memberships, partial: '/api/memberships/membership', as: :membership
json.user_has_memberships @user_has_memberships