class Api::ChannelshipsController < ApplicationController

    def index
      if current_user && !params[:channel_id]
        @user_channelships = current_user.channelships
        render "api/channelships/userindex"
      end
      if params[:channel_id]
        @channel_channelships = Channel.find(params[:channel_id]).channelships
        # @users_channelship_id = @channel_channelships
        #                             .where(:channelships => {:user_id => current_user.id})
        #                             .pluck("id")
        render "api/channelships/channelindex"
      end
    end

    def create
        @channelship = Channelship.new(channelship_params)
        @channelship.last_visited = Time.now
        if @channelship.save
            if current_user
                @user_channelships = current_user.channelships
            end
            @channel_channelships = Channel.find(params[:channel_id]).channelships
            render "api/channelships/channelindex"
        else
            render json: [@channelship.errors.full_messages], status: 401
        end
    end

    def update
        channelshipId = Channel.find(channelship_params[:channel_id])
            .channelships
            .where(:channelships => {:user_id => current_user.id})
            .limit(1)
            .pluck("id")
            .first
        @channelship = Channelship.find(channelshipId)
        if @channelship.update(last_visited: Time.now)
            
            render "api/channelships/show"
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
        # @channel_channelships = Channel.find(params[:channel_id]).channelships
        render "api/channelships/userindex"
    end

    def channelship_params
        params.require(:channelship).permit(
        :id,
        :moderator,
        :channel_id,
        :user_id,
        :last_visited)
    end
end
