class User < ApplicationRecord
    attr_reader :password
  
    validates :email, :password_digest, :session_token, presence: true
    validates :email, uniqueness: true
    validates :password, length: { minimum: 6 }, allow_nil: true
    validates_numericality_of :power, :in => 1..100
    validates_numericality_of :speed, :in => 1..100
    validates_numericality_of :guts, :in => 1..100
    validates_numericality_of :technique, :in => 1..100
  
    after_initialize :ensure_session_token
    
    has_many :memberships,
    class_name: "Membership",
    foreign_key: :user_id,
    dependent: :destroy

    has_many :groups, 
    through: :memberships,
    source: :group

    has_many :reservations,
    class_name: "Reservation",
    foreign_key: :user_id,
    dependent: :destroy

    has_many :events,
    class_name: "Event",
    through: :reservations,
    source: :event

    has_many :messages,
    class_name: "Message",
    foreign_key: :user_id,
    dependent: :destroy

    has_many :channelships,
    class_name: "Channelship",
    foreign_key: :user_id,
    dependent: :destroy

    has_many :channels,
    class_name: "Channel",
    through: :channelships,
    source: :channel
  
    def self.find_by_credentials(email, password)
      user = User.find_by(email: email)
      return nil unless user
      user.is_password?(password) ? user : nil
    end
  
    def password=(password)
      @password = password
      self.password_digest = BCrypt::Password.create(password)
    end
  
    def is_password?(password)
      BCrypt::Password.new(self.password_digest).is_password?(password)
    end
  
    def reset_session_token!
      generate_unique_session_token
      save!
      self.session_token
    end
  
    private
  
    def ensure_session_token
      generate_unique_session_token unless self.session_token
    end
  
    def new_session_token
      SecureRandom.urlsafe_base64
    end
  
    def generate_unique_session_token
      self.session_token = new_session_token
      while User.find_by(session_token: self.session_token)
        self.session_token = new_session_token
      end
      self.session_token
    end
  
  end
  

 