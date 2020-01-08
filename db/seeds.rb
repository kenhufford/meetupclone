
require "faker"
User.destroy_all
Event.destroy_all
Group.destroy_all
Membership.destroy_all
Location.destroy_all


total_users = 20;
total_groups = 5;

location_names = ["San Francisco", "Oakland", "San Jose", "Orange County", "Los Angeles", "San Diego"]
location_lat_long = [ [37.7749, 122.4194], [37.8044, 122.2712], [ 37.3382, 121.8863], [34.0522,118.2437], [33.7175,117.8311], [32.7157, 117.1611] ]

location_names.length.times do |i|
    Location.create!(
        name: location_names[i],
        lat: location_lat_long[i][0],
        long: location_lat_long[i][1]
    )
end

demo = User.create!(name: 'Demo', email: 'demo@gmail.com', password: '123456', lat: 37.799247, long: -122.401320, location_id: 1)

total_users.times do 
    User.create!(
        name: Faker::Name.first_name,
        email: Faker::Internet.email,
        password: '123456',
        lat: (Faker::Number.within(range: 37698217..37789758) / 1000000),
        long: (Faker::Number.within(range: -122508186..-122397017) / 1000000),
        location_id: (Faker::Number.within(range: 1..location_names.length))
    )
end

group_names = ["Street Fighters", "Kombatants", "Guilty Gearheads", "Smash Sisters", "Tekkies"]
description = ["If you can only live your life when the Guile theme is playing, this group is for you.  We roam the mean streets of SF looking for fights",
"Only join if you kan handle extreme kombat with brutal, photorealistic karacters such as ourselves.  Don't bothering kalling us if you are a part of the Street Fighters",
"We really don't like fighting and only want to build custom cars.  We then ram our cars into each others cars over and over again until we have to fix them",
"We are a PG rated fighting group! Come join us if you don't like fatalities and really enjoy a casual vibe and environment",
"Come join us at Tekkies and code the coolest code and only fight bravely behind a keyboard, where no one can hurt you."]

total_groups.times do |i|
    Group.create!(
        name: group_names[i-1],
        description: description[i-1],
        location_id: (Faker::Number.within(range: 1..location_names.length))
    )
end

member_types = ["Admin", "Organizer", "Member"]

50.times do |i|
    Membership.create!(
        group_id: (Faker::Number.within(range: 1..total_groups)),
        user_id: (Faker::Number.within(range: 2..total_users)),
        member_type: member_types.sample
    )
end

4.times do |i|
    Membership.create!(
        group_id: i+1,
        user_id: 1,
        member_type: "Member"
    )
end

event_titles = ["Yoga in the Park", "Football in the Streets", "Magic in a Dungeon"]
group_ids = [1, 2, 3, 4, 5]
descriptions = ["We stretch a bunch and lounge around in stretchy pants", "We play out in the streets until someone yells at us or a major injury happens", "We play in my basement until my mom yells at us to stop coming to her house"]
max_attendance = [100, 20, 5]

group_ids.length.times do |i|
    Membership.create!(
        group_id: i,
        user_id: i+1,
        member_type: "Organizer"
    )
end

event_titles.each_with_index do |event, i|
    Event.create!(title: event, 
    group_id: group_ids[i], 
    description: descriptions[i], 
    max_attendance: max_attendance[i], 
    start_time: Faker::Time.between_dates(from: Date.today - 1, to: Date.today, period: :all),
    end_time: Faker::Time.between_dates(from: Date.today, to: Date.today+10, period: :all),
    address: Faker::Address.street_address,
    lat: (Faker::Number.within(range: 37698217..37789758) / 1000000),
    long: (Faker::Number.within(range: -122508186..-122397017) / 1000000))
end