module Api
  module Admin
    # :nodoc:
    class ConferencesController < ApplicationController
      before_action :require_authenticated_user, :require_admin

      def index
        @conferences = Conference.all
        render 'api/conferences/index'
      end
    end
  end
end
