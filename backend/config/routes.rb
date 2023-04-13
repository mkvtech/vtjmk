Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # TODO: Root route

  namespace :api, defaults: { format: :json } do
    # Authentication
    post '/signup', to: 'sessions#signup'
    post '/login', to: 'sessions#login'
    get '/me', to: 'sessions#me'

    # Resources
    resources :conferences do
      member do
        resources :document_templates, only: %i[index]
      end
    end

    resources :document_templates, only: %i[create show update delete]
    post '/documents/generate_participation_certificate', to: 'documents#generate_participation_certificate'

    resources :events, only: %i[index show update]
    namespace 'events' do
      scope ':event_id', as: 'events' do
        resources :participations, only: %i[index]
      end
    end

    resources :participations do
      member do
        patch 'update_status'
      end
    end

    # Authenticated User
    namespace 'user' do
      resources :participations, only: %i[index] do
        scope module: :participations do
          resources :document_templates, only: %i[index]
        end
      end
    end

    # Other
    post '/policies', to: 'policies#index'

    # TODO: Work on these
    resources :users
  end

  # Debug
  get '/debug/database', to: 'debug#database'
end
