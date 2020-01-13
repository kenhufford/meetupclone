class Api::ReservationsController < ApplicationController

    def create
        @reservation = Reservation.new
        @reservation.user_id = current_user.id
        @reservation.event_id = params[:event_id]
        @reservation.is_organizer = false
        if @reservation.save
          @event = @reservation.event
          @current_user_attending = true
          render 'api/events/show'
        else
          render json: @reservation.errors.full_messages, status: 401
        end
      end

      def destroy
        @reservation = Reservation.find_by(user_id: current_user.id, event_id: params[:event_id])
        @event = @reservation.event
        @reservation.destroy
        @current_user_member = false
        render 'api/events/show'
      end

      private
      def reservation_params
        params.require(:reservation).permit(:is_organizer)
      end
end
