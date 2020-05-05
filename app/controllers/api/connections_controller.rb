class Api::ConnectionsController < ApplicationController

    def create 
        @connection = Connection.new(connection_params)
        @connection.user_id = current_user.id
        if @connection.save
            @user = current_user
            @user.active_rivals
            @user.pending_rivals
            @user.pending_challengers
            render 'api/users/showone'
        else
            render json: [@connection.errors.full_messages], status: 401
        end
    end

    def destroy 
        @connection = current_user.sent_connections.where('connections.rival_id = ?', params[:rival_id])
        @connection.destroy_all
        @user = current_user
        @user.active_rivals
        @user.pending_rivals
        @user.pending_challengers
        render 'api/users/showone'
    end

    private

    def connection_params
        params.require(:connection).permit(:user_id, :rival_id)
    end
end
