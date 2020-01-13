class Api::ReservationsController < ApplicationController

    def index
      if @event = Event.find(params[:event_id])
        @event_reservations = @event.reservations
      end
      if current_user.reservations
        @user_reservations = current_user.reservations
      end
      
      render "api/reservations/index"
    end

    def create
        @reservation = Reservation.new
        @reservation.user_id = current_user.id
        @reservation.event_id = params[:event_id]
        @reservation.is_organizer = false
        if @reservation.save
          @event = @reservation.event
          @current_user_attending = true
        else
          render json: @reservation.errors.full_messages, status: 401
        end
        @user_reservations = current_user.reservations
        @event_reservations = @event.reservations
        render "api/reservations/index"
      end

      def destroy
        @reservation = Reservation.find_by(user_id: current_user.id, event_id: params[:event_id])
        @event = @reservation.event
        @reservation.destroy
        @current_user_member = false
        @user_reservations = current_user.reservations
        @event_reservations = @event.reservations
        render "api/reservations/index"
      end

      private
      def reservation_params
        params.require(:reservation).permit(:is_organizer)
      end
end
