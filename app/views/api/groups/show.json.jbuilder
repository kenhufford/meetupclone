
    json.extract! @group, :id, :name, :description, :lat, :long, :image_url
    json.memberships @group.memberships, partial: '/api/groups/membership', as: :membership

