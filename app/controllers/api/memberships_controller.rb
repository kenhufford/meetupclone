class Api::MembershipsController < ApplicationController

    def index
      if @group = Group.find(params[:group_id])
        @group_memberships = @group.memberships
      end
      if current_user.memberships
        @user_memberships = current_user.memberships
      end
      
      render "api/memberships/index"
    end

    def create
        @membership = Membership.new
        @membership.user_id = current_user.id
        @membership.group_id = params[:group_id]
        @membership.member_type = "Member"
        if @membership.save
          @group = @membership.group
          @current_user_member = true
        else 
          render json: @membership.errors.full_messages, status: 401
        end
        @user_memberships = current_user.memberships
        @group_memberships = @group.memberships
        render "api/memberships/index"
      end

      def update
        @membership = Membership.find_by(user_id: current_user.id, group_id: params[:group_id])
        
        if @membership.update_attribute(:member_type, membership_params[:member_type])
          @group = @membership.group
        else
          render json: @membership.errors.full_messages, status: 401
        end

        @user_memberships = current_user.memberships
        @group_memberships = @group.memberships
        render "api/memberships/index"
      end

      def destroy
        @membership = Membership.find_by(user_id: current_user.id, group_id: params[:group_id])
        @group = @membership.group
        @membership.destroy
        @current_user_member = false
        @user_memberships = current_user.memberships
        @group_memberships = @group.memberships
        render "api/memberships/index"
      end

      private
      def membership_params
        params.require(:membership).permit(:member_type)
      end

end
