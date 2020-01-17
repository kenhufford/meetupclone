class Reservation < ApplicationRecord
    validates :is_organizer, inclusion: {in: [true, false]}
    validates_uniqueness_of :user_id, scope: :event_id

    belongs_to :user,
    class_name: "User",
    foreign_key: :user_id

    belongs_to :event,
    class_name: "Event",
    foreign_key: :event_id
end
