class Api::MembershipsController < ApplicationController
    def index
      if current_user
        @user_memberships = current_user.memberships
          if @user_memberships.length != 0
            @user_has_memberships = true
          else 
            @user_has_memberships = false
          end
      else
        @user_memberships = {}
        @user_has_memberships = false
      end
      if params[:group_id] == "0"
        @group_memberships = {}
      else
        @group = Group.find(params[:group_id])
        @group_memberships = @group.memberships    
      end
      render "api/memberships/index"
    end

    def create
        @membership = Membership.new
        @membership.user_id = current_user.id
        @membership.group_id = params[:group_id]
        @membership.member_type = "Initiate"
        if @membership.save
          @group = @membership.group
          @group.channels.each do |channel|
            if !channel.dm
              channelship = Channelship.new
              channelship.user_id = current_user.id
              channelship.channel_id = channel.id
              channelship.moderator = false
              channelship.save
            end
          end
          @current_user_member = true
        else 
          render json: @membership.errors.full_messages, status: 401
        end
        @user_memberships = current_user.memberships
        if @user_memberships.length != 0
          @user_has_memberships = true
        else 
          @user_has_memberships = false
        end
        @group_memberships = @group.memberships
        render "api/memberships/index"
      end

      def update
        @membership = Membership.find(params[:id])
        
        if @membership.update_attribute(:member_type, membership_params[:member_type])
          @group = @membership.group
        else
          render json: @membership.errors.full_messages, status: 401
        end

        @user_memberships = current_user.memberships
        if @user_memberships.length != 0
          @user_has_memberships = true
        else 
          @user_has_memberships = false
        end
        @group_memberships = @group.memberships
        render "api/memberships/index"
      end

      def destroy
        @membership = Membership.find_by(user_id: current_user.id, group_id: params[:group_id])
        @group = @membership.group
        @membership.destroy
        @current_user_member = false
        @user_memberships = current_user.memberships
        if @user_memberships.length != 0
          @user_has_memberships = true
        else 
          @user_has_memberships = false
        end
        @group_memberships = @group.memberships
        render "api/memberships/index"
      end

      private
      def membership_params
        params.require(:membership).permit(:member_type, :user_id, :group_id)
      end

end
