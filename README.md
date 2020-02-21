# Beatup

Welcome Brawlers! Come one, come all to the site that has the final say in fantasy fighting.  We help you find a squad that can match your fighting spirit and styles!  Search your area for events and sign up today. We also help you start your own squad if you are ready to build your own community.  Using Beatup, we will post events you create and attract potential fighters from the region to join you at your recurring or one time fights!

We have recently added a feature to allow groups to have a messenger channel for their events and group to plan future brawls and discuss strategy and training.  We have also added the ability to directly message your squad mates.  


# Technology
Beatup is a Meetup inspired app built using React/Redux/Node.js on the front end with Ruby on Rails in the backend.  Recently, Action Cable/Websockets were added to the stack to implement the messenger system.  This resulted in some re-work on the backend and working to move more processing to the Ruby side of the house.  The site features include infinite scroll/debouncing for  brawls, partial instant search for brawls and squads, real-time persisted messaging and lots of CRUD.  

# Level ups

One of my big early level ups was discovering Promise.all.  At first when learning React, I had trouble nailing down when exactly I would be able to render, but after implementing Promise.all to make sure everything in state/props was ready to go, it was all a breeze:

```
   componentDidMount(){
        if (this.props.currentUserId !== undefined){
            const fetchGroups = this.props.fetchGroups();
            const fetchGroupsFromUser = this.props.fetchGroupsFromUser(this.props.currentUserId);
            const fetchCategories = this.props.fetchCategories();

            Promise.all([fetchCategories, fetchGroups, fetchGroupsFromUser])
                .then((data) => {
                    let userGroups = data[2].groups;
                    this.setState({ loaded: true, userGroups });
                })
```

Another big one for me (which I am still finding is true more and more) is that the backend is very powerful and under-utilized.  I realized there is a ton of work we do on the frontend that could be more easily completed on the backend, like filtering information for groups.  It turns out associations and ActiveRecord are pretty powerful and simple, if you can remember to use them.

```
    def index
        if params[:category_id]
            @groups = Category.find(params[:category_id]).groups
        elsif params[:location_id]
            @groups = Location.find(params[:location_id]).groups
        elsif params[:user_id]
            @groups = User.find(params[:user_id]).groups
        else
            @groups = Group.all.includes(:memberships, :members)
        end
        if @groups
            render "api/groups/index"
        else
            render json: ["No group found"], status: 404
        end
        
    end
```
