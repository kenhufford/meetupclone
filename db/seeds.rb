
require "faker"
User.destroy_all
Event.destroy_all
Group.destroy_all
Membership.destroy_all
Location.destroy_all
Type.destroy_all
Category.destroy_all
Reservation.destroy_all
Channel.destroy_all
Channelship.destroy_all
Message.destroy_all


def pair_generator(range1, range2)
    results = []

    (1..range1).to_a.each do |i|
        (1..range2).to_a.each do |j|
            results << [i,j]
        end
    end
    results.shuffle!
    results = results[0..results.length / 2]
end

category_names = ["Spam", "Air juggling", "I only know smash", "This isn't even my final form", "Pillow Fighting",
"5000 times kaioken", "Pure cheese", "Only crab style", "Rolling around", "Ancient Arts",
"Michael Jackson Style Dance Battle!", "Keyboard Warrior", "Drunken Boxing"]

category_image_urls = ["spamURL", "airURL", "smashURL", "finalURL", "pillowURL", "kaiokenURL", "cheeseURL", "crabURL", "rollURL",
"ancientURK", "mjURL", "keyboardURL", "drunkURL"]

category_ids = []

category_names.each_with_index do |category, i|
    category = Category.create!(
        name: category,
        image_url: category_image_urls[i]
    )
    category_ids << category.id
end

total_users = 18;

location_names = ["San Francisco", "The Shadow Realm", "A Dank Basement", "The Future", "Namek"]
location_lat_long = [ [37.7749, 122.4194], [37.8044, 122.2712], [ 37.3382, 121.8863], [34.0522,118.2437], [33.7175,117.8311]]
location_ids = []
location_names.length.times do |i|
    location = Location.create!(
        name: location_names[i],
        lat: location_lat_long[i][0],
        long: location_lat_long[i][1]
        )
    location_ids << location.id
end



    group_names = ["Street Fighters", "Mortal Kombatants", "Soul Calibur Online", "Smash Siblings", 
    "Tekkies", "Only Arnolds", "My Hero AppAcademia", "Z Fighters", "The BEST Team", "The Bad Guys", 
    "The Men In Tights", "History Buffs", "Rap Gods", "The Division"]
    total_groups = group_names.length;
    group_images = ["streetfighterURL","mortalkombatURL","soulcaliburURL","smashbrothersURL",
    "tekkenURL","arnoldsURL","myheroURL","zfightersURL","bestteamURL","badguysURL", "tightsURL", "historyURL", "rapperURL", "divisionURL"]
    group_icons = ["streetfightericonURL","mortalkombaticonURL","soulcaliburiconURL","smashbrothersiconURL",
    "tekkeniconURL","arnoldsiconURL","myheroiconURL","zfightersiconURL","bestteamiconURL","badguysiconURL", "tightsiconURL", "historyiconURL", "rappericonURL",  "divisioniconURL"]
    description = ["Imagine yourself on mean city streets. The Guile theme is playing.  I'm holding back for two seconds and pressing forward + fierce.  If your heartrate is about 200 BPM, join us today.",
    "Kan handle extreme kombat with brutal, photorealistic karacters? Kan you believe they cast Christopher Lambert as Raiden? Kome to the Kombatants for a flawless victory",
    "When you were partying, we studied the blade. When you were coding, we mastered the blockchain. While you wasted your days at the gym in pursuit of vanity, we cultivated inner strength. And now that the world is on fire and the barbarians are at the gate you have the audacity to come to us for help.",
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
    And I love you like Kanye loves Kanye, hahaha",
    "Introducing first, fighting out of the red corner, a kickboxing specialist from Brazil, holding a record of 19 wins and 4 losses, weighing in at 135 pounds, the reigning, defending, unnnnndispuutteeeddd champion of the world, AMANDA THE LIONNESS NUUUUUNNNEESSSSS!!!
    
    We take fighting more seriously than anyone on Beatup and we have the championship belts to prove it.  If you really want to test your might, come brawl with us."
]

    group_ids = []
    group_names.each_with_index do |name, i|
        index = i % location_ids.length
        location_id = location_ids[index]
        group = Group.create!(
            name: name,
            description: description[i],
            image_url: group_images[i],
            icon_url: group_icons[i],
            location_id: location_id
        )
        group_ids << group.id
    end
    
    
    streetfighter_user_names = ["Ken", "Guile", "Blanka", "M. Bison"]
    mortalkombat_user_names = ["Sub-Zero", "Shang Tsung", "Scorpion", "Liu Kang"]
    soulcalibur_user_names = ["Nightmare", "Astaroth", "Cervantes" ]
    smashbrothers_user_names = ["Villager", "Wii Fit Trainer", "Fox"]
    tekken_user_names = ["Eddy", "King", "Heihachi", "Jin"]
    arnolds_user_names = ["Mr. Freeze", "Conan", "Douglas Quaid", "Commando", "Dutch", "T-800"]
    aa_user_names = ["Helen","Duke", "Evans", "Linda", "Chris", "Joseph", "Sami", "Kenny", "Abel","Ian","Julie"]
    dbz_user_names = ["Goku", "Vegeta", "Piccolo", "Trunks"]
    best_user_names = ["Krillin"]
    badguys_user_names = ["Isabelle", "Sebastian", "Howard Langston", "Sakura"]
    tights_user_names = ["Robin Hood", "Lil Jon", "Dave Chapelle", "Blinkin"]
    history_user_names = ["Teddy", "Lincoln", "Caesar", "Joan of Arc"]
    rapper_user_names =["Kanye", "Yeezy", "Louis Vuitton Don","Ye"]
    division_user_names =["Amanda", "Weili", "Thug Rose", "JJ", "Holly", "Michelle"]
    
    user_names = [streetfighter_user_names, mortalkombat_user_names, soulcalibur_user_names, smashbrothers_user_names, tekken_user_names, 
    arnolds_user_names, aa_user_names, dbz_user_names, best_user_names, badguys_user_names, tights_user_names, history_user_names, rapper_user_names, division_user_names]
    
    streetfighter_image_url = ["kenURL", "guileURL", "blankaURL", "mbisonURL"] 
    mortalkombat_image_url = ["subzeroURL", "shangtsungURL", "scorpionURL", "liukangURL"]
    soulcalibur_image_url = ["nightmareURL", "astarothURL", "voldoURL"]
    smashbrothers_image_url = ["villagerURL", "wiifitURL", "foxURL"]
    tekken_image_url = [ "eddyURL", "kingURL","heihachiURL", "jinURL"]
    arnolds_image_url = ["mrfreezeURL","conanURL", "douglasquaidURL", "commandoURL", "dutchURL", "t800URL"]
    aa_image_url = ["helenURL","dukeURL", "evansURL", "lindaURL", "chrisURL", "josephURL",
     "samiURL", "kennyURL", "abelURL","ianURL","julieURL"]
    dbz_image_url = ["gokuURL", "vegetaURL", "piccoloURL", "trunksURL"]
    best_image_url = ["krillinURL"]
    badguys_image_url = ["isabelleURL", "sebastianURL", "howardlangstonURL", "sakuraURL"]
    tights_image_url = ["robinhoodURL", "liljonURL", "davechapelleURL", "blinkinURL"]
    history_image_url = ["teddyURL", "lincolnURL", "caesarURL", "joanofarcURL"]
    rapper_image_url = ["kanyeURL","kanye2URL", "kanye3URL", "kanye4URL"]
    division_image_url =["AmandaURL", "WeiliURL", "ThugRoseURL", "JJURL", "HollyURL", "MichelleURL"]
    
    image_urls = [streetfighter_image_url, mortalkombat_image_url, soulcalibur_image_url, smashbrothers_image_url, tekken_image_url, 
    arnolds_image_url, aa_image_url, dbz_image_url, best_image_url, badguys_image_url, tights_image_url, history_image_url, rapper_image_url, division_image_url]
  

    streetfighter_event_orgs = []
    mortalkombat_event_orgs = []
    soulcalibur_event_orgs = []
    smashbrothers_event_orgs = []
    tekken_event_orgs = []
    arnolds_event_orgs = []
    aa_event_orgs = []
    dbz_event_orgs = []
    best_event_orgs = []
    badguys_event_orgs = []
    tights_event_orgs = []
    history_event_orgs = []
    rapper_event_orgs = []
    division_event_orgs = []
    
    event_orgs = [streetfighter_event_orgs, mortalkombat_event_orgs, soulcalibur_event_orgs, smashbrothers_event_orgs, tekken_event_orgs, 
    arnolds_event_orgs, aa_event_orgs, dbz_event_orgs, best_event_orgs, badguys_event_orgs, tights_event_orgs, history_event_orgs, rapper_event_orgs, division_event_orgs]
    
    user_ids = []
    group_captains = []
    user_names.each_with_index do |group_names, i|
        group_names.each_with_index do |name, j|
            email = name.split(" ").join("") + "@gmail.com"

            user = User.create!(
                name: name,
                email: email,
                password: '123456',
                location_id: location_ids.sample,
                image_url: image_urls[i][j]
                )

            if j == 0 
                member_type = "Captain" 
                group_captains << user.id
            elsif j == 1
                member_type = "Squad Leader" 
                user_ids << user.id
            else 
                member_type = "Initiate"
                user_ids << user.id
            end

            Membership.create!(
                group_id: group_ids[i],
                user_id: user.id,
                member_type: member_type      
                )
        end
    end
                
    type_pairs = pair_generator(group_ids.length, category_ids.length)
    
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
        member_type: "Captain"    
    )
    Membership.create!(
        group_id: 5,
        user_id: demo_user.id,
        member_type: "Squad Leader"    
    )
    Membership.create!(
        group_id: 1,
        user_id: demo_user.id,
        member_type: "Member"    
    )
    
    sf_event_titles = ["Limb strength training", "A fun trip to wine country!", "Fuego Friday"]
    mk_event_titles  = ["A night of broken limbs", "Final Kombat", "BBQ Brawl"]
    sc_event_titles = ["A Study of Blades", "Civilized Weapons Only" ]
    sb_event_titles = ["BRAWLIDAY", "Casual Friday!"] 
    tekken_event_titles = ["Tek Tuesday", "Teknical Hit!", "Teknique Tuneup"] 
    arnold_event_titles = [ "Mr. Universe", "Pumpin' Iron"]
    aa_event_titles = ["Winner gets a USB-C-HDMI Adapter!", "HackerBrawl"]
    dbz_event_titles = ["World Martial Arts Tournament", "Hell in a Cell Games", "Vegeta's driving lessons!"]
    krillin_event_titles = ["BEST NIGHT EVER", "Definity not me by myself"]
    badguys_event_titles = ["Bring your decks", "Gardening 101", "Clean up our community!"]
    tights_event_titles = ["Castle Siege VI", "A Song of Silk and Spandex"]
    history_event_titles = ["Ancient Martial Arts", "Avoiding Asssassination"]
    rapper_event_titles = ["An Epic Rap Battle with the GOAT", "Fishsticks"]
    division_event_titles = ["Fight Night", "5 Rounds in the Cage", "Acai, Sugar and Water"]

    event_titles = [sf_event_titles, mk_event_titles, sc_event_titles, sb_event_titles, tekken_event_titles, arnold_event_titles,
    aa_event_titles, dbz_event_titles, krillin_event_titles, badguys_event_titles, tights_event_titles, history_event_titles,
    rapper_event_titles, division_event_titles]

    sf_event_desc = ["Meet us out at the pier around sunset for some stress relief and strength training.  
    We will provide water and food but please make sure to bring your car since we don't have any cars 
    anymore and Blanka isn't legally allowed to drive.", "Come join us on a relaxing trip to Sonoma! We'll start
    with a light pairing of whites and cheeses followed by some full-bodied reds.  Then we'll likely carry out
    our tradition of having some light sparring in the winery warehouse until we're thrown out or carried out.",
    "Make sure you show up early to Fuego Friday! We can only hold this event every so often, or really as often
    as the city fire department forgets to check down by the docks so we can stacks barrels full of fuel about 15 feet
    high, light them on fire and take turns kicking them, playing the most lethal version of Jenga known to man."]
    mk_event_desc  = ["Kome test your might.  We will be inkluding a variety of materials for you, our
    kontestants, to find the mightiest warriors who are kapable of joining our squad.  We suggest wearing
    long sleeve shirts (no tanktops for you show offs out there", "Final Kombat XVII.  It's like it says.  This is 
    our final, final, final, final, final, final, final, final, final, final, final, final, final
    , final, final, final, final event.  We are Mortal Kombantants.  We know how to finish.", "It's our most
    kasual kompetition of the year so bring your best meat or become it at the Kombatant's BBQ Brawl.  Special
    guest chef Scorpion will be at the grill all night so bring your appetite and we'll be kooking up a feast."]
    sc_event_desc = ["Come join us at Nightmare's house where we plan to watch seminal sword film and study 
    the blade.  We plan to watch Sword Art Online, Samurai Champloo, Kenshin and whatever else Nightmare's mom
    will allow us to watch before she yells at us to 'Go home and get a life'.  She will also likely be baking
    cookies so make sure you RSVP and come early!", "At dusk, we meet at the stage and put everything we learned
    to the test.  Unlike the other uncivilized squads, we only fight 1v1 so no one can complain and say '1v1 me 
    bro' when they are defeated.  No holding back and saying 'I was only testing your strength, now witness
    my true power!' No charging up for more than 10 minutes because we don't have all night."]
    sb_event_desc = ["BRAWLIDAY SEASON IS UPON US.  As always, we hold the biggest, best brawl of the year.  In
    true brawl spirit, everyone is invited and there are NO RULES.  Bring any weapons, any friends, any time,
    any place, anywhere.  Really this isn't an event, it's a fighting spirit. So come join the brawliest of
    brawls and maybe we can convince you to join the Smash Siblings Squad!", "The name says it all.  Kick
    off your shoes, because Smash Siblings is the most laidback squad on the coast.  We typically start off with some
    light 1v1v1v1 on a big moving stage with all items activated then move on to 1v1v1v1v1v1v1v1 on Final
    Destination with extra weapon drops and ultimates engaged.  Trophies and capri suns will be provided to
    all in attendance!"] 

    tekken_event_desc = ["Join us for another night huddled in a dark room, only lit by VSCode dark mode, as we dive down rabbit holes so deep, you'll wonder if we will emerge in the motherland, Japan itself", 
    "We're hosting a coding brawl, where the victor will be declared by the amount of Codewars problems solved or amount of coffee one can consume before keeling over.  Only one will emerge victorious.",
    "It's gonna be a night of level ups with the Tek Crew so bring the Dew and we'll be up all night sharing our best Tekniques for Teknical interviews.  This time we'll beat OurHeroAppAcademia!"] 
    arnold_event_desc = ["I don't have any weak points. I had weak points three years ago, but my main thing in mind is, my goal always was, to even out everything to the point... that everything is perfect. Which means if I want to increase one muscle a half inch, the rest of the body has to increase. I would never make one muscle increase or decrease, because everything fits together now, and all I have to do is get my posing routine down more perfect, which is almost impossible to do, you know. It's perfect already",
    "The greatest feeling you can get in a gym, or the most satisfying feeling you can get in the gym is... The Pump. Let's say you train your biceps. Blood is rushing into your muscles and that's what we call The Pump. You muscles get a really tight feeling, like your skin is going to explode any minute, and it's really tight - it's like somebody blowing air into it, into your muscle. It just blows up, and it feels really different. It feels fantastic."]
    aa_event_desc = ["Bring your best to 825 Battery St.  We are offering to the winner, a highly prized, oft-contested HDMI-USB-C adapter for all your dual-screen needs.",
    "It's happy hour at App Academy so we'll be handing out free beer and cheez-its to all in attendance at HackerBrawl! The challenge will be to stuff yourself as much as you can before you head off bravely to battle, full of vigor and empty calories!"]
    dbz_event_desc = ["Come to the 25th Number One Under Heaven Martial Arts Gathering!  We promise a fair brawl this time and we promise we won't use any sensu-beans, spirit bombs, insanely long transformations and chargeups or deus ex machinas this time!", 
    "To Earth: You have ten days to prepare for the ultimate Cell Games.  Any fighter who gives up or touch outside of the HELL IN A CELL will automatically lose.  ANY fighter who is killed will be immediately disqualifed and banned from the tournament FOREVER!", 
    "We are having a little bit of fun this time so everyone bring your cars (NO STREET FIGHTERS ALLOWED) as we use them to try to teach Vegeta to drive again! Everyone will get a turn to hop in the car with everyone's favorite Saiyan and feel a shot of adrenaline unlike any other!"]
    krillin_event_desc = ["Uhhh hey... hey guys! It's m-me! Krillin!  If you're like, not to busy and stuff, you should head on over to the coolest brawl in town and learn from the c-c-coolest martial artist on earth.",
     "I... I m-mean w-we... are having lots of people coming this time! So, so, so many in fact we are like, getting extra seats and benches and maybe bleachers brought over this time so everyone should sign up for this brawl because I actually purchased a whole cheese and chocolate fountain for the brawl so please come."]
    badguys_event_desc = ["Games are not boring. Games purify our souls and leave room for new development that challenges the mind! They are the products of human wisdom!", 
    "Come join us in doing some good for the community as we take some time of brawling and work on planting and weeding in the community garden.  Capri-suns will be provided for all all produce will be given away to charity!", 
    "Every brawl has a consequence.  We all love a good brawl but we never think of the mess we leave behind.  After every episode of Dragon Ball Z we come together to clean up the rubble created by the many kamehamehas and destructo-discs.  So come help us clean up after our community!"]
    tights_event_desc = ["We are hosting a 1v1 tournament style brawl at the Nottingham Creek Bridge.  Due to the narrow pass over this raging ravine, only two challengers at a time can fight and anyone who falls into the deep cold depths of the Mighty Nottingham will be disqualified if they survive.", 
    "As everyone well knows, we love singing and dancing more than every other Squad and find it to be the most invigorating fighting style due to it's incomparable spirit!  Find us at the Nottinham theater and prepare to be beset by the melodious music of the Mightiest Men."]
    history_event_desc = ["Stay awhile a listen to our 10 hour lecture followed by a 10 minute demonstration and 5 minute brawl (that's all the stamina we old timers have).  We will be debating the merits of Wushu sword arts in modern brawl combat.  Tea and herbs will be provided to all who pass out during the lecture.", 
    "We host another lecture to discuss the pros and cons of bodyguards, body armor and public spaces.  Use our knowledge, we beg of you."]
    rapper_event_desc = ["I think I do myself a disservice by comparing myself to Steve Jobs and Walt Disney and human beings that we've seen before. It should be more like Willy Wonka... and welcome to my chocolate factory.", 
    "I would hear stories about Steve Jobs and feel like he was at 100 percent exactly what he wanted to do, but I'm sure even a Steve Jobs has compromised. Even a Rick Owens has compromised. You know, even a Kanye West has compromised. Sometimes you don't even know when you're being compromised till after the fact, and that's what you regret."]
    division_event_desc = ["Come out to our Fight Night where we go 1v1 to shake up the power rankings!  Bring your best and try to move up to Squad Leader if you can beat any of our current members.  Only fists, knees, elbows and feet allowed here!!",
    "It's our title fight night so come out and see the best of the best! Like we said last time ONLY knees, elbows, feet and fists!!  No hadoukens, spirit bombs, freezing, bows and arrows, or rapping allowed!",
    "It's time for a little recovery time so we are going to all work out and recover with some acai, sugar and water.  Everyone knows that acai has mystical healing powers, as well as sugar and water, which helps us recover faster and fight harder.  Bring your own acai and we'll show you what to do with it."]

    event_descriptions = [sf_event_desc, mk_event_desc, sc_event_desc, sb_event_desc, tekken_event_desc, arnold_event_desc,
    aa_event_desc, dbz_event_desc, krillin_event_desc, badguys_event_desc, tights_event_desc, history_event_desc,
    rapper_event_desc, division_event_desc]

    sf_image_url = ["sfevent1URL", "sfevent2URL", "sfevent3URL"]
    mk_image_url  = ["mkevent1URL", "mkevent2URL", "mkevent3URL"]
    sc_image_url = ["scevent1URL", "scevent2URL"]
    sb_image_url = ["sbevent1URL", "sbevent2URL"] 
    tekken_image_url = ["tekkenevent1URL", "tekkenevent2URL", "tekkenevent3URL"] 
    arnold_image_url = [ "arnoldevent1URL", "arnoldevent2URL"]
    aa_image_url = ["aaevent1URL", "aaevent2URL"]
    dbz_image_url = ["dbzevent1URL", "dbzevent2URL", "dbzevent3URL"]
    krillin_image_url = ["krillinevent1URL", "krillinevent2URL"]
    badguys_image_url = ["badguysevent1URL", "badguysevent2URL", "badguysevent3URL"]
    tights_image_url = ["tightsevent1URL", "tightsevent2URL"]
    history_image_url = ["historyevent1URL", "historyevent2URL"]
    rapper_image_url = ["rapperevent1URL", "rapperevent2URL"]
    division_image_url = ["divisionevent1URL", "divisionevent2URL","divisionevent3URL" ]

    event_image_urls = [sf_image_url, mk_image_url, sc_image_url, sb_image_url, tekken_image_url, arnold_image_url,
    aa_image_url, dbz_image_url, krillin_image_url, badguys_image_url, tights_image_url, history_image_url,
    rapper_image_url, division_image_url]

    max_attendance = [100, 20, 5]
    recurring_type = ["Weekly", "Monthly", "None"]

    
    event_titles.each_with_index do |event_group_titles, i|
        event_group_titles.each_with_index do |event_title, j|
            event = Event.create!(
            title: event_titles[i][j], 
            group_id: i+1, 
            description: event_descriptions[i][j], 
            max_attendance: max_attendance.sample, 
            start_time: Faker::Time.between_dates(from: Date.today+1, to: Date.today+5, period: :all),
            end_time: Faker::Time.between_dates(from: Date.today+5, to: Date.today+10, period: :all),
            address: Faker::Address.street_address,
            location_id: location_ids.sample,
            image_url: event_image_urls[i][j],
            recurring_type: recurring_type.sample)

            channel = Channel.create!(
                name: event_titles[i][j],
                event_id: event.id,
                channel_icon: "defaultchannelURL",
                group_id: i+1,
                dm: false,
            )

            channel_users = Group.find(i+1).members
            channel_users.each do |user|
                Channelship.create!(
                    channel_id: channel.id,
                    user_id: user.id,
                    moderator: true
                )
            end

            Reservation.create!(
                event_id: event.id,
                user_id: group_captains[i],
                is_organizer: true
            )
            
            8.times do |k|
                shuffled_ids = user_ids.shuffle
                Reservation.create(
                    event_id: event.id,
                    user_id: shuffled_ids[k],
                    is_organizer: false
                )
            end

        end

    end



