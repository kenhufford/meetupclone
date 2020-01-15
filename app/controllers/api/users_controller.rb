class Api::UsersController < ApplicationController
    def index
      if current_user
        @current_user = current_user
      end
      if params[:group_id]
        @users = Group.find(params[:group_id]).members
        render "api/users/index"
      elsif params[:event_id]
        @users = Event.find(params[:event_id]).attendees
        render "api/users/index"
      else 
        @users = User.all
        render "api/users/index"
      end
    end
  
    def create
      @user = User.new(user_params)
  
      if @user.save
        login(@user)
        render "api/users/show"
      else
        render json: @user.errors.full_messages, status: 422
      end
    end

    def show
      @user = User.find(params[:id])
      render 'api/users/show'
    end
  
    private
  
    def user_params
      params.require(:user).permit(:password, :name, :location_id, :email, :long, :lat, :image_url)
    end
  end
  