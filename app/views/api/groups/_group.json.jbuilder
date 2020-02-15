
    json.extract! group, :id, :name, :description, :location_id, :lat, :long, :image_url, :icon_url

    json.membershipIds do
        json.array! group.memberships.pluck(:id)
    end
    json.categoryIds do
        json.array! group.categories.pluck(:id)
    end
    json.eventIds do
        json.array! group.events.pluck(:id)
    end

