Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    # Authentication
    post '/signup', to: 'sessions#signup'
    post '/login', to: 'sessions#login'
    get '/me', to: 'sessions#me'

    # Resources
    resources :conferences
    resources :events

    # TODO: Work on these
    resources :participations
    resources :attendances
    resources :users

    namespace 'events' do
      scope ':event_id', as: 'events' do
        resources :attendances, only: %i[index]
      end
    end

    # Other
    post '/policies', to: 'policies#index'
  end

  # Debug
  get '/debug/database', to: 'debug#database'
end
