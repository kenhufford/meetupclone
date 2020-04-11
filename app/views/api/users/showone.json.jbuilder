
json.partial! "api/users/user", user: @user
json.set! :groups_count, @groups.count
json.set! :events_count, @events.count
json.set! :squad_leader_count, @squad_leader.count
json.set! :captain_count, @captain.count
json.set! :initiate_count, @initiate.count
json.set! :organizer_count, @organizer.count
json.set! :rsvp_count, @rsvp.count



