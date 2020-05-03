class Connection < ApplicationRecord
    validates_presence_of :user_id, :rival_id
    validate :user_is_not_equal_rival
    validates_uniqueness_of :user_id, scope: [:rival_id]

    belongs_to :user

    belongs_to :rival, 
    class_name: 'User'

    def is_mutual
        self.rival.rivals.include?(self.user)
    end

    private
    def user_is_not_equal_rival
        errors.add(:rival, "can't be the same as the user") if self.user == self.rival
    end
end
