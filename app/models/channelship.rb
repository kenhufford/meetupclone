class Channelship < ApplicationRecord
    validates :moderator, inclusion: {in: [true, false]}
    validates_uniqueness_of :user_id, scope: :channel_id

    belongs_to :user,
    class_name: "User",
    foreign_key: :user_id

    belongs_to :channel,
    class_name: "Channel",
    foreign_key: :channel_id
end
