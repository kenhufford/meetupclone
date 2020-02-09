class Channelship < ApplicationRecord
    validates :moderator, presence: true

    belongs_to :user,
    class_name: "User",
    foreign_key: :user_id

    belongs_to :channel,
    class_name: "Channel",
    foreign_key: :channel_id
end
