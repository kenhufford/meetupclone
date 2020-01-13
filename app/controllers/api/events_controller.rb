class Api::EventsController < ApplicationController
  before_action :require_logged_in, only: [:create, :edit, :destroy]

  def index
    @events = Event.all
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
        render json: [@event.errors.full_messages], status: 401
    end
  end

  def update
    @event = Event.find(params[:id])
    if @event.updateAttributes(event_params)
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
  end

  private

  def event_params
    params.require(:event).permit(
    :title, 
    :group_id, 
    :description, 
    :max_attendance, 
    :start_time, 
    :end_time, 
    :address, 
    :lat, 
    :long, 
    :image_url)
  end

end
