module Api
  # :nodoc:
  class PoliciesController < ApplicationController
    def index
      result = TestPolicies.call(input: params.permit![:policies].to_h, user: current_user)
      render json: { policies: result }, status: :ok
    end
  end
end
