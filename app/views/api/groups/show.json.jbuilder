
    json.extract! @group, :id, :name, :description, :lat, :long, :image_url
    json.memberships @group.memberships, partial: '/api/groups/membership', as: :membership
    json.members @group.members, partial: '/api/groups/members', as: :members

