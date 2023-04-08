module Api
  # :nodoc:
  class PoliciesController < ApplicationController
    before_action :require_authenticated_user, only: :index

    def index
      result = TestPolicies.call(input: params.permit![:policies].to_h, user: current_user)
      render json: { policies: result }, status: :ok
    end
  end
end
