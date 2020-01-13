json.extract! event, :id, :title, :description, :location_id, :image_url, :group_id, :start_time, :end_time, :address
json.reservations event.reservations, partial: '/api/events/reservation', as: :reservation
json.reservationIds do
    json.array! event.reservations.pluck(:id, :user_id)
end
json.attendeeIds do
    json.array! event.attendees.pluck(:id)
end

json.current_user_attending @current_user_attending