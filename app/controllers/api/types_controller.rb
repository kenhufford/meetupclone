class Api::TypesController < ApplicationController

    def create
        @type = Type.new(type_params)
        if @type.save
          @group = @type.group
          render 'api/groups/show'
        else
          render json: @type.errors.full_messages, status: 401
        end
      end

      def destroy
        @type = Type.find_by(type_params)
        @group = @type.group
        @type.destroy
        render 'api/groups/show'
      end

      private
      def type_params
        params.require(:type).permit(:group_id, :category_id)
      end

end
