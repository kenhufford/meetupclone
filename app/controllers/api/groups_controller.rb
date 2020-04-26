class Api::GroupsController < ApplicationController
    before_action :require_logged_in, only: [:create, :edit, :destroy]
    
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
        if current_user
            @user_groups = current_user.groups
        else
            @user_groups = []
        end

        @all_groups_count = @groups.count
        @user_groups_count = @user_groups.count
        @groups = offset_and_limit_all(@groups);
        @user_groups  = offset_and_limit_user(@user_groups);
        
        if @groups
            render "api/groups/index"
        else
            render json: ["No group found"], status: 404
        end
        
    end

    def show
        @group = Group.find(params[:id])
        if current_user
            @current_user_member = !!@group.members.find_by(id: current_user.id)
        else
            @current_user_member = false
        end
        render "api/groups/show"
    end

    def create
        @group = Group.new(group_params)
        if @group.save
            @membership = Membership.new(group_id: @group.id, user_id: current_user.id, member_type: "Captain")
            @membership.save
            cat_params.each do |id|
                @type = Type.new
                @type.category_id = id
                @type.group_id = @group.id
                @type.save
            end
        render "api/groups/show"
        else
            render json: [@group.errors.full_messages], status: 401
        end
    end

    def update
        @group = Group.find(params[:id])
        if @group.update_attributes(group_params)
            render "api/groups/show"
        else
            render json: [@group.errors.full_messages], status: 401
        end
    end

    def destroy
        @group = Group.find(params[:id])
        @groups = Group.all

        if @group.destroy
            render "api/groups/index"
        else
            render json: ["No group to destroy"], status: 404
        end
    end

      
    def search
        @query = params[:query];
        if params[:query] == ""
            @groups = Group.all
            @user_groups = [];
            render :index
            return
        end
        search_params = {};
        @query[1..-1].split("&").each do |param|
            param = param.split("=")
            search_params[param[0]] = param[1]
        end
        @groups = []
        @user_groups = [];
        if search_params["name"]
            @groups = find_by_name(search_params["name"])
        else
            @groups = Group.all
        end

        if search_params["location"]
            location_ids = []
            search_params["location"].split(".").each do |id|
                location_ids << id
            end
            @groups = @groups.where(:location_id => location_ids)
        end
        if search_params["category"]
            category_ids = [];
            search_params["category"].split(".").each do |id|
                category_ids << id
            end
            @groups = @groups.joins(:categories).where(categories: {id: category_ids})
        end
        @all_groups_count = @groups.count
        @user_groups_count = @user_groups.count
        @groups = offset_and_limit_all(@groups);
        @user_groups  = offset_and_limit_user(@user_groups);
        render :index
    end

    def find_by_name(query)
        query = query.downcase
        group_results = Group.where("groups.name ILIKE :start_query", start_query: "%#{query}%")
        group_list = group_results   
    end

    private
    def group_params
        params.require(:group).permit(
        :name, 
        :description, 
        :lat, 
        :long, 
        :image_url,
        :location_id,
        :id,
        :icon_url)
    end

    def cat_params
       params[:group][:category_ids]
    end

    def offset_and_limit_all(groups)
        if params[:allPage] && params[:allLimit]
            limit = params[:allLimit].to_i
            page = params[:allPage].to_i
            groups = groups.limit(limit).offset((page-1) * limit)
        end
        return groups
    end

    def offset_and_limit_user(user_groups)
        if params[:userPage] && params[:userLimit]
            limit = params[:userLimit].to_i
            page = params[:userPage].to_i
            user_groups = user_groups.limit(limit).offset((page-1) * limit)
        end
        return user_groups
    end
    
end
