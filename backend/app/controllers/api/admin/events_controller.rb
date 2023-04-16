module Api
  module Admin
    # :nodoc:
    class EventsController < ApplicationController
      before_action :require_authenticated_user, :require_admin

      def index
        @events = Event.all
        render 'api/events/index'
      end
    end
  end
end
