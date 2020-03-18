json.set! :all_events do 
  @events.each do |event|
    json.set! event.id do
      json.partial! 'event', event: event
    end
  end
end

json.set! :user_events do 
  @user_events.each do |event|
    json.set! event.id do
      json.partial! 'event', event: event
    end
  end
end
