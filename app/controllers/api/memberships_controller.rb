class Api::MembershipsController < ApplicationController

    def create
        @membership = Membership.new
        @membership.user_id = current_user.id
        @membership.group_id = params[:group_id]
        @membership.member_type = "Member"
        if @membership.save
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
        render 'api/groups/show'
      end

end
