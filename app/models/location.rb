class Location < ApplicationRecord
    validates :name, :lat, :long, presence: :true

    has_many :users
    has_many :events
    has_many :groups

    def order_by_squad_size
        groups = self.groups
            .select('groups.name, COUNT(*) AS num_members')
            .joins(:members)
            .group('groups.name')
            .order('num_members DESC')
    end

    def order_by_squad_strength
        groups = self.groups
        groups.sort{|a,b| a.power_level <=> b.power_level}
        groups
    end
end
