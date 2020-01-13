json.extract! event, :id, :title, :description, :location_id, :image_url, :group_id, :start_time, :end_time
json.reservations event.reservations, partial: '/api/events/reservation', as: :reservation
json.attendees do
    event.attendees.each do |attendee|
        json.set! attendee.id do
            json.extract! attendee, :name, :created_at, :image_url
        end
    end
end
json.current_user_attending @current_user_attending