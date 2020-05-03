class ConnectionsController < ApplicationController

    def index
        @connections = current_user.connections
        render "api/connections/index"
    end

    def create 
        @connection = Connection.new(connection_params)
        @connection.user_id = current_user.id
        if @connection.save
            @connections = current_user.connections
            render "api/connections/index"
        else
            render json: [@connection.errors.full_messages], status: 401
        end
    end

    def update 
        @connection = Connection.find(params[:id])
        if @connection.update_attributes(connection_params)
            @connections = current_user.connections
            render "api/connections/index"
        else
            render json: [@connection.errors.full_messages], status: 401
        end
    end

    def destroy 
        @connection = Connection.find(params[:id])
        @connection.destroy
        @connections = current_user.connections
        render "api/connections/index"
    end

    private

    def connection_params
        params.require(:connection).permit(:user_id, :rival_id)
    end
end
