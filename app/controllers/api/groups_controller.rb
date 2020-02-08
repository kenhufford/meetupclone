class Api::GroupsController < ApplicationController
    before_action :require_logged_in, only: [:create, :edit, :destroy]
    
    def index
        if params[:category_id]
            @groups = Category.find(params[:category_id]).groups
        elsif params[:location_id]
            @groups = Location.find(params[:location_id]).groups
        else
            @groups = Group.all.includes(:memberships, :members)
        end
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
        @query = params[:search_query];
        if @query.length > 0;
            @groups = filtered_list(@query)
            if (@groups.length == 0)
                render json: ["No group found"], status: 404
            else
                render :index
            end
        end
        
    end

    def filtered_list(query)
        query = query.downcase
        group_results = Group.where("name ILIKE :start_query", start_query: "%#{query}%")
        group_list = group_results   
    end

    private


    # removed category_ids
    def group_params
        params.require(:group).permit(
        :name, 
        :description, 
        :lat, 
        :long, 
        :image_url,
        :location_id,
        :id)
    end

    def cat_params
       params[:group][:category_ids]
    end

    
end
