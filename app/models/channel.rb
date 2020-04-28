class Channel < ApplicationRecord
    validates :name, presence: true

    belongs_to :group,
    class_name: "Group",
    foreign_key: :group_id

    has_many :channelships,
    class_name: "Channelship",
    foreign_key: :channel_id,
    dependent: :destroy

    has_many :users,
    class_name: "User",
    through: :channelships,
    source: :user

    has_many :messages,
    class_name: "Message",
    foreign_key: :channel_id,
    dependent: :destroy
end
