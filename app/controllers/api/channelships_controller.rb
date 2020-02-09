class Api::ChannelshipsController < ApplicationController

    def index
      if current_user
        @user_channelships = current_user.channelships
      end
      if params[:channel_id]
        
        @channel_channelships = Channel.find(params[:channel_id]).channelships
      end
      render "api/channelships/index"
    end

    def create
        @channelship = Channelship.new(channelship_params)
        if @channelship.save
            if current_user
                @user_channelships = current_user.channelships
            end
            @channel_channelships = Channel.find(params[:channel_id]).channelships
            render "api/channelships/index"
        else
            render json: [@channelship.errors.full_messages], status: 401
        end
    end

    def destroy
        @channelship = Channelship.find(params[:id])
        if !@channelship.destroy
            render json: ["No channelship to destroy"], status: 404
        end
        if current_user
            @user_channelships = current_user.channelships
        end
        @channel_channelships = Channel.find(params[:channel_id]).channelships
        render "api/channelships/index"
    end

    def channelship_params
        params.require(:channelship).permit(
        :id,
        :moderator,
        :channel_id,
        :user_id)
    end
end
