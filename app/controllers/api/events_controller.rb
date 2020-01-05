class Api::EventsController < ApplicationController
    before_action :require_logged_in, only: [:create]

  def index
    # events = bounds ? Event.in_bounds(bounds) : Event.all

    # @benches = benches.includes(:categories, :group) 
    @events = Event.all
    render "api/events/index"
  end

  def show
    @event = Event.find(params[:id])
    render "api/events/show"
  end

  def create
    @event = Event.new(event_params)
    if @event.save
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

  def bounds
    params[:bounds]
  end

end
