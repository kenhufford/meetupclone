
json.partial! "api/users/user", user: @user
json.memberships @user.memberships, partial: '/api/users/membership', as: :membership

