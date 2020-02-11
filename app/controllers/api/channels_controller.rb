class Api::ChannelsController < ApplicationController
before_action :require_logged_in, only: [:index, :create, :destroy]
    def index
        @group_channels = Group.find(params[:group_id]).channels.order(name: :desc)
        
        @user_channels = Group.find(params[:group_id])
                        .channels
                        .joins(:channelships)
                        .where(channelships: { user_id: current_user.id })
                        .where("dm IS true")
                        .order(name: :desc)
        render "api/channels/index"
    end

    def create
        @channel = Channel.new(channel_params)
        if @channel.save
            @channels = Group.find(params[:group_id]).channels.order(name: :desc)
            render "api/channels/index"
        else
            render json: [@message.errors.full_messages], status: 401
        end
    end

    def destroy
        @channel = Channel.find(params[:id])
        if !@channel.destroy
            render json: ["No channel to destroy"], status: 404
        end
        @channels = Group.find(@channel.group_id).channels.order(name: :desc)
        render "api/channels/index"
    end

    def channel_params
        params.require(:channel).permit(
        :id,
        :name,
        :group_id,
        :channel_icon)
    end
end
