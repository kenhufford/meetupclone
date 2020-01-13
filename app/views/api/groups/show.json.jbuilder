
    json.extract! @group, :id, :name, :description, :location_id, :lat, :long, :image_url
    json.current_user_member @current_user_member
    json.memberships @group.memberships, partial: '/api/groups/membership', as: :membership
    json.members do
        @group.members.each do |member|
            json.set! member.id do
                json.extract! member, :name, :created_at, :image_url
            end
        end
    end
    json.categoryIds do
        json.array! @group.categories.pluck(:id)
    end
    json.eventIds do
        json.array! @group.events.pluck(:id)
    end

