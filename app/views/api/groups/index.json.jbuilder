@groups.each do |group|
  json.set! group.id do
    json.extract! group, :id, :name, :description, :lat, :long, :image_url
    json.members group.memberships, partial: 'memberships/membership', as: :memberships
  end
end
