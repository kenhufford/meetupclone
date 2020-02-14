class Api::ChannelsController < ApplicationController
before_action :require_logged_in, only: [:index, :create, :update, :destroy]
    def index
        @group_channels = Group.find(params[:group_id])
                        .channels
                        .where(:dm => false)
                        .order(name: :desc)
        
        @user_channels = Group.find(params[:group_id])
                        .channels
                        .includes(:channelships)
                        .where(:dm => true)
                        .where(:channelships => {:user_id => current_user.id})
                        .order(name: :desc)
        render "api/channels/index"
    end

    def create
        hashed = ''
        if (channel_params[:hash_string])
            hashed = channel_params[:hash_string].hash
            @old_channel = Channel.find_by(hash_string: hashed)
            if @old_channel 
                render "api/channels/show"
            else
                @channel = Channel.new(channel_params)
                @channel.hash_string = hashed
                if @channel.save
                    render "api/channels/show"
                else
                    render json: [@message.errors.full_messages], status: 401
                end
            end
        else
            @channel = Channel.new(channel_params)
            if @channel.save
                render "api/channels/show"
            else
                render json: [@message.errors.full_messages], status: 401
            end
        end
    end

    def update
        @channel = Channel.find(params[:id])
        @channel.updated_at = Time.now
        if @channel.update_attributes(channel_params)
            render "api/channels/show"
        else
            render json: [@channel.errors.full_messages], status: 401
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
        :channel_icon,
        :channel_icon2,
        :dm,
        :hash_string)
    end
end
