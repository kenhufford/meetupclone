class Reservation < ApplicationRecord
    validates :is_organizer, inclusion: {in: [true, false]}

    belongs_to :user,
    class_name: "User",
    foreign_key: :user_id

    belongs_to :event,
    class_name: "Event",
    foreign_key: :event_id
end
