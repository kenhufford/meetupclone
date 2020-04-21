class Api::EventsController < ApplicationController
  before_action :require_logged_in, only: [:create, :edit, :destroy]

  def index
    if params[:group_id]
      @events = Group
        .find(params[:group_id])
        .events.order(start_time: :desc)
    elsif params[:location_id]
      @events = Location
        .find(params[:location_id])
        .events.order(start_time: :desc)
    elsif params[:user_id]
      @events = User
        .find(params[:user_id])
        .events
        .order(start_time: :desc)
    elsif params[:category_id]
      @events = Category
        .find(params[:category_id])
        .events
        .order(start_time: :desc)
    else
      @events = Event.all
    end
    
    if current_user
      @user_events = current_user.events
    else
      @user_events = []
    end    
      render "api/events/index"
  end

  def show
    @event = Event.find(params[:id])
    if current_user
      @current_user_attending = !!@event.attendees.find_by(id: current_user.id)
    else
        @current_user_attending  = false
    end
    render "api/events/show"
  end

  def create
    @event = Event.new(event_params)
    if @event.save
        @reservation = Reservation.new
        @reservation.event_id = @event.id
        @reservation.user_id = current_user.id
        @reservation.is_organizer = true
        @reservation.save

        @channel = Channel.new
        @channel.name = @event.title
        @channel.channel_icon = "defaultchannel1URL"
        @channel.group_id = @event.group.id 
        @channel.dm = false
        render "api/events/show"
    else
        render json: [@event.errors.full_messages], status: 401
    end
  end

  def update
    @event = Event.find(params[:id])
    if @event.update_attributes(event_params)
        render "api/events/show"
    else
        render json: [@event.errors.full_messages], status: 401
    end
  end

  def destroy
    event = Event.find(params[:id])
    if !event.destroy
      render json: ["No event to destroy"], status: 404
    end
    @events = Event.all
    if current_user
      @user_events = current_user.events
    else
      @user_events = []
    end    
     render "api/events/index"
  end

  def search
    @query = params[:search_query];
    search_params = {};
    @query[1..-1].split("&").each do |param|
      param = param.split("=")
      search_params[param[0]] = param[1]
    end
    @events = []
    @user_events = []
    if search_params["name"]
      @events = find_by_name(search_params["name"])
    else
      @events = Event.all
    end
    if search_params["location"]
      @events = @events.where("location_id = :location_id", location_id: search_params["location"])
    end
    render :index
  end

  def find_by_name(query)
    query = query.downcase
    event_results = Event.where("title ILIKE :start_query", start_query: "%#{query}%")
    event_list = event_results.limit(12).includes(:group)
  end

  private

  def event_params
    params
      .require(:event)
      .permit(
        :id,
        :title, 
        :group_id, 
        :description, 
        :max_attendance, 
        :start_time, 
        :end_time, 
        :address, 
        :location_id,
        :image_url
      )
  end

end
