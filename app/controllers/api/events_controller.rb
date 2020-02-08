class Api::EventsController < ApplicationController
  before_action :require_logged_in, only: [:create, :edit, :destroy]

  def index
    if params[:group_id]
      @events = Group.find(params[:group_id]).events.order(start_time: :desc)
    elsif params[:location_id]
      @events = Location.find(params[:location_id]).events.order(start_time: :desc)
    elsif params[:category_id]
      @events = Category.find(params[:category_id]).events.order(start_time: :desc)
    else
      @events = Event.all
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
        render "api/events/show"
    else
      debugger
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
    @event = Event.find(params[:id])
     if !@event.destroy
        render json: ["No event to destroy"], status: 404
     end
     @events = Event.all
     render "api/events/index"
  end

  def search
    @query = params[:search_query];
    if @query.length > 0;
        @events = filtered_list(@query)
        if (@events.length == 0)
            render json: ["No event found"], status: 404
        else
            render :index
        end
    end  
  end

  def filtered_list(query)
    query = query.downcase
    event_results = Event.where("title ILIKE :start_query", start_query: "%#{query}%")
    event_list = event_results.limit(12).includes(:group)
  end

  


  private

  def event_params
    params.require(:event).permit(
    :id,
    :title, 
    :group_id, 
    :description, 
    :max_attendance, 
    :start_time, 
    :end_time, 
    :address, 
    :location_id,
    :image_url)
  end

end
