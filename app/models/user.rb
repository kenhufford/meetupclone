class User < ApplicationRecord
    attr_reader :password
    attr_accessor :active_rivals, :pending_rivals, :pending_challengers
  
    validates :email, :password_digest, :session_token, presence: true
    validates :email, uniqueness: true
    validates :password, length: { minimum: 6 }, allow_nil: true
    validates_numericality_of :power, :in => 1..100
    validates_numericality_of :speed, :in => 1..100
    validates_numericality_of :guts, :in => 1..100
    validates_numericality_of :technique, :in => 1..100
  
    after_initialize :ensure_session_token
    
    belongs_to :location

    has_many :memberships,
    dependent: :destroy

    has_many :groups, 
    through: :memberships,
    source: :group

    has_many :reservations,
    dependent: :destroy

    has_many :events,
    through: :reservations,
    source: :event

    has_many :messages,
    dependent: :destroy

    has_many :channelships,
    dependent: :destroy

    has_many :channels,
    through: :channelships,
    source: :channel

    has_many :sent_connections,
    foreign_key: :user_id,
    class_name: "Connection",
    dependent: :destroy

    has_many :received_connections,
    foreign_key: :rival_id,
    class_name: "Connection",
    dependent: :destroy

    has_many :rivals,
    through: :sent_connections,
    source: :rival

    has_many :challengers,
    through: :received_connections,
    source: :user

    def active_rivals
      @active_rivals = rivals.select{ |rival| rival.rivals.include?(self) }  
    end

    def pending_rivals
      @pending_rivals = rivals.select{ |rival| !rival.rivals.include?(self) }  
    end

    def pending_challengers
      @pending_challengers = challengers.select{ |challenger| !rivals.include?(challenger) }  
    end

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
  

 