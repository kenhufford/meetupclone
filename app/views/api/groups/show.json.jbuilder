
    json.extract! @group, :id, :name, :description, :location_id, :lat, :long, :image_url
    json.current_user_member !!@group.members.find_by(id: current_user.id)
    json.memberships @group.memberships, partial: '/api/groups/membership', as: :membership
    json.members do
        @group.members.each do |member|
            json.set! member.id do
                json.extract! member, :name
            end
        end
    end
    json.categories do
        @group.categories.each do |category|
            json.set! category.id do
                json.extract! category, :name
            end
        end
    end

