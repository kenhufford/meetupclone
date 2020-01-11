class Api::MembershipsController < ApplicationController

    def create
        @membership = Membership.new
        @membership.user_id = current_user.id
        @membership.group_id = params[:group_id]
        @membership.member_type = "Member"
        if @membership.save
          @group = @membership.group
          @current_user_member = true
          render 'api/groups/show'
        else
        
          render json: @membership.errors.full_messages, status: 401
        end
      end

      def update
        @membership = Membership.find_by(user_id: current_user.id, group_id: params[:group_id])
        
        if @membership.update_attribute(:member_type, membership_params[:member_type])
          @group = @membership.group
          render 'api/groups/show'
        else
          render json: @membership.errors.full_messages, status: 401
        end
      end

      def destroy
        @membership = Membership.find_by(user_id: current_user.id, group_id: params[:group_id])
        @group = @membership.group
        @membership.destroy
        @current_user_member = false
        render 'api/groups/show'
      end

      private
      def membership_params
        params.require(:membership).permit(:member_type)
      end

end
