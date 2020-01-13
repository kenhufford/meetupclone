
require "faker"
User.destroy_all
Event.destroy_all
Group.destroy_all
Membership.destroy_all
Location.destroy_all
Type.destroy_all
Category.destroy_all


def pair_generator(range1, range2)
    results = []

    (1..range1).to_a.each do |i|
        (1..range2).to_a.each do |j|
            results << [i,j]
        end
    end
    results
end

category_names = ["Spamming only", "Air juggling", "I only know how to smash", "This isn't even my final form", "Pillow Fighting",
"5000 times kaioken", "Pure cheese", "Only crab style", "Ankle picks and imanari rolls", "up up down down left right left right b a",
"Song and dance!"]

category_names.each do |category|
    Category.create!(
        name: category
    )
end

total_users = 18;

location_names = ["San Francisco", "Oakland", "San Jose", "Orange County", "Los Angeles", "New York City"]
location_lat_long = [ [37.7749, 122.4194], [37.8044, 122.2712], [ 37.3382, 121.8863], [34.0522,118.2437], [33.7175,117.8311], [40.7128, 74.0060] ]

location_names.length.times do |i|
    Location.create!(
        name: location_names[i],
        lat: location_lat_long[i][0],
        long: location_lat_long[i][1]
        )
end

    group_names = ["Street Fighters", "Mortal Kombatants", "Soul Calibur Online", "Smash Siblings", 
    "Tekkies", "Only Arnolds", "My Hero AppAcademia", "Z Fighters", "The BEST Team", "The Bad Guys", 
    "The Men In Tights", "History Buffs", "Rap Gods"]
    total_groups = group_names.length;
    group_images = ["streetfighterURL","mortalkombatURL","soulcaliburURL","smashbrothersURL",
    "tekkenURL","arnoldsURL","myheroURL","zfightersURL","bestteamURL","badguysURL", "tightsURL", "historyURL", "rapperURL"]
    description = ["Imagine yourself on mean city streets. The Guile theme is playing.  I'm holding back for two seconds and pressing forward + fierce.  If your heartrate is about 200 BPM, join us today.",
    "Kan handle extreme kombat with brutal, photorealistic karacters? Kan you believe they cast Christopher Lambert as Raiden? Kome to the Kombatants for a flawless victory",
    "When you were partying, We studied the blade. When you were coding, we mastered the blockchain. While you wasted your days at the gym in pursuit of vanity, we cultivated inner strength. And now that the world is on fire and the barbarians are at the gate you have the audacity to come to us for help.",
    "We are a PG rated fighting squad! Come join us if you enjoy a casual, fun fight club!  No try hards here! If you wanna be like that go join the Bad Guys or something",
    "Come join us at Tekkies, write the coolest code and only fight bravely behind a keyboard, where no one can hurt you.",
    "Commando.  Terminator.  Conan.  Dutch.  Mr. Freeze.  Only the greatest warriors can assemble under our banner.  Are you in?",
    "One-time winners of the Rails Olympics.  Solvers of dubious riddles.  The greatest minds of 825 Battery Street are all that stands between the Earth and imminent peril. Will you stand with us?",
    "If you're interested in spending 95% of your time standing in power stance while yelling at the top of your lungs, hoping your opponent will let you charge up, and possibly fighting for the remaining 5%, this group is for you.",
    "I am starting the best squad in this galaxy! I don't know if you can join because you're probably not strong enough and certainly not as strong as me but you can apply and maybe I'll think about letting you in.",
    "This is a private squad of pure evil.  The worst, most villanous refuse of all the other Beatup squads have congregated and joined forces here. You need not apply unless you've been thrown out of at least 3 other Beatup squads.",
    "We're men, we're men in tights.
    We roam around the forest looking for fights.
    We're men, we're men in tights.

    We rob from the rich and give to the poor, that's right!
    We may look like sissies, but watch what you say or else we'll put out your lights!
    We're men, we're men in tights,

    Always on guard defending the people's rights.",
    "The only thing we take more seriously than history is a good fight. We are the most experienced squad on the planet.  Someone famous once said 'Walk softly and carry a big stick'.  Walk with us.",
    "I miss the old Kanye, straight from the go Kanye
    Chop up the soul Kanye, set on his goals Kanye
    I hate the new Kanye, the bad mood Kanye
    The always rude Kanye, spaz in the news Kanye
    I miss the sweet Kanye, chop up the beats Kanye
    I gotta to say at that time I'd like to meet Kanye
    See I invented Kanye, it wasn't any Kanyes
    And now I look and look around and there's so many Kanyes
    I used to love Kanye, I used to love Kanye
    I even had the pink polo, I thought I was Kanye
    What if Kanye made a song about Kanye
    Called 'I Miss The Old Kanye, ' man that would be so Kanye
    That's all it was Kanye, we still love Kanye
    And I love you like Kanye loves Kanye, hahaha"
]

    group_names.each_with_index do |name, i|
        Group.create!(
            name: name,
            description: description[i],
            image_url: group_images[i],
            location_id: (Faker::Number.within(range: 1..location_names.length))
        )
    end
    
    
    streetfighter_user_names = ["Ken", "Guile", "Blanka", "M. Bison"]
    mortalkombat_user_names = ["Sub-Zero", "Shang Tsung", "Scorpion", "Liu Kang"]
    soulcalibur_user_names = ["Nightmare", "Astaroth", "Cervantes" ]
    smashbrothers_user_names = ["Villager", "Wii Fit Trainer", "Fox"]
    tekken_user_names = ["Eddy", "King", "Heihachi", "Jin"]
    arnolds_user_names = ["T-800", "Conan", "Douglas Quaid", "Commando", "Dutch", "Mr. Freeze"]
    aa_user_names = ["Duke", "Evans", "Linda", "Chris", "Helen", "Joseph", "Sami", "Kenny", "Abel","Ian","Julie"]
    dbz_user_names = ["Goku", "Vegeta", "Piccolo", "Trunks"]
    best_user_names = ["Krillin"]
    badguys_user_names = ["Isabelle", "Howard Langston", "Sebastian", "Sakura"]
    tights_user_names = ["Robin Hood", "Lil' Jon", "Dave Chapelle", "Blinkin"]
    history_user_names = ["Teddy", "Lincoln" "Caesar", "Joan of Arc"]
    rapper_user_names =["Kanye", "Kanye", "Kanye","Kanye"]
    
    user_names = [streetfighter_user_names, mortalkombat_user_names, soulcalibur_user_names, smashbrothers_user_names, tekken_user_names, 
    arnolds_user_names, aa_user_names, dbz_user_names, best_user_names, badguys_user_names, tights_user_names, history_user_names, rapper_user_names]
    
    streetfighter_image_url = ["kenURL", "guileURL", "blankaURL", "mbisonURL"] 
    mortalkombat_image_url = ["subzeroURL", "shangtsungURL", "scorpionURL", "liukangURL"]
    soulcalibur_image_url = ["nightmareURL", "astarothURL", "voldoURL"]
    smashbrothers_image_url = ["villagerURL", "wiifitURL", "foxURL"]
    tekken_image_url = [ "eddyURL", "kingURL","heihachiURL", "jinURL"]
    arnolds_image_url = ["t800URL", "conanURL", "douglasquaidURL", "commandoURL", "dutchURL", "mrfreezeURL"]
    aa_image_url = ["dukeURL", "evansURL", "lindaURL", "chrisURL", "helenURL", "josephURL",
     "samiURL", "kennyURL", "abelURL","ianURL","julieURL"]
    dbz_image_url = ["gokuURL", "vegetaURL", "piccoloURL", "trunksURL"]
    best_image_url = ["krillinURL"]
    badguys_image_url = ["isabelleURL", "howardlangstonURL", "sebastianURL", "sakuraURL"]
    tights_image_url = ["robinhoodURL", "liljonURL", "davechapelleURL", "blinkinURL"]
    history_image_url = ["teddyURL", "lincolnURL", "caesarURL", "joanofarcURL"]
    rapper_image_url = ["kanyeURL","kanye2URL", "kanye3URL", "kanye4URL"]
    
    image_urls = [streetfighter_image_url, mortalkombat_image_url, soulcalibur_image_url, smashbrothers_image_url, tekken_image_url, 
    arnolds_image_url, aa_image_url, dbz_image_url, best_image_url, badguys_image_url, tights_image_url, history_image_url, rapper_image_url]
    
    member_types = ["Admin", "Organizer", "Member"]
    
    user_names.each_with_index do |group_names, i|
        group_names.each_with_index do |name, j|
            user = User.create!(
                name: name,
                email: Faker::Internet.unique.email,
                password: '123456',
                location_id: (Faker::Number.within(range: 1..location_names.length)),
                image_url: image_urls[i][j]
                )
            j == 0 ? member_type = "Organizer" : member_type = member_types.sample  
            Membership.create!(
                group_id: i+1,
                user_id: user.id,
                member_type: member_type      
                )
        end
    end
                
    type_pairs = pair_generator(total_groups, category_names.length)
    
    type_pairs.each do |pair|
        Type.create!(
            group_id: pair[0],
            category_id: pair[1]
            )
    end
                    
    demo_user = User.create!(name: 'Demo', email: 'demo@gmail.com', password: '123456', lat: 37.799247, long: -122.401320, location_id: 1, image_url: "saitamaURL")
    Membership.create!(
        group_id: 7,
        user_id: demo_user.id,
        member_type: "Organizer"    
    )
    Membership.create!(
        group_id: 5,
        user_id: demo_user.id,
        member_type: "Organizer"    
    )
    Membership.create!(
        group_id: 1,
        user_id: demo_user.id,
        member_type: "Member"    
    )
    
    event_titles = ["Brawliday @ the Park", "Noob Friendly Fest", "No Magic Allowed", "Fireball Friday", 
    "Sharpen Skills Saturday", "Sunday Runday", "Magic Management",
    "Cheese Tactics Everyone Should Know", "Musical Monday with Song and Dance!"]
    group_ids = [1, 2, 3, 4, 5]
    descriptions = ["We stretch a bunch and lounge around in stretchy pants", "We play out in the streets until someone yells at us or a major injury happens", "We play in my basement until my mom yells at us to stop coming to her house"]
    max_attendance = [100, 20, 5]
    
    event_titles.each_with_index do |event, i|
        event = Event.create!(title: event, 
        group_id: group_ids.sample, 
        description: descriptions.sample, 
        max_attendance: max_attendance.sample, 
        start_time: Faker::Time.between_dates(from: Date.today - 1, to: Date.today, period: :all),
        end_time: Faker::Time.between_dates(from: Date.today, to: Date.today+10, period: :all),
        address: Faker::Address.street_address,
        location_id: (1...location_names.length).to_a.sample)

        10.times do |i|
            organizer = (i = 1) ? true : false
            Reservation.create!(
                event_id: event.id,
                user_id: i+1,
                is_organizer: organizer
            )
        end
    end

