@groups.each do |group|
  json.set! group.id do
    json.extract! group, :id, :name, :description, :location_id, :lat, :long, :image_url
    json.memberships group.memberships, partial: '/api/groups/membership', as: :membership
  end
end
