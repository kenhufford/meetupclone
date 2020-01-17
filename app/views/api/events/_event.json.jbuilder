json.extract! event, :id, :title, :description, :location_id, :image_url, :group_id, :start_time, :end_time, :address, :max_attendance, :recurring_type
json.(event.group, :name)
json.reservationIds do
    json.array! event.reservations.pluck(:id)
end

json.current_user_attending @current_user_attending