class Api::GroupsController < ApplicationController
    before_action :require_logged_in, only: [:create]
    
    def index
        # events = bounds ? Event.in_bounds(bounds) : Event.all

        # @benches = benches.includes(:categories, :group) 
        @groups = Group.all
        render "api/groups/index"
    end

    def show
        @group = Group.find(params[:id])
        render "api/groups/show"
    end

    def create
        @group = Group.new(group_params)
        if @group.save
            render "api/groups/show"
        else
            render json: [@group.errors.full_messages], status: 401
        end
    end

    def update
        @group = Group.find(params[:id])
        if @group.updateAttributes(group_params)
            render "api/groups/show"
        else
            render json: [@group.errors.full_messages], status: 401
        end
    end

    def destroy
    @group = Group.find(params[:id])
        if !@group.destroy
        render json: ["No group to destroy"], status: 404
        end
    end

    private

    def group_params
    params.require(:group).permit(
    :name, 
    :description, 
    :lat, 
    :long, 
    :image_url)
    end

    def bounds
    params[:bounds]
    end

    
end
