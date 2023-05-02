Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  root 'application#home'

  namespace :api, defaults: { format: :json } do
    # Authentication
    post '/signup', to: 'sessions#signup'
    post '/login', to: 'sessions#login'
    get '/me', to: 'sessions#me'

    # Resources
    resources :conferences do
      scope module: :conferences do
        resources :document_templates, only: %i[index]
      end
    end

    resources :document_templates, only: %i[create show destroy]
    post '/documents/generate_participation_certificate', to: 'documents#generate_participation_certificate'

    resources :events, only: %i[index show update] do
      scope module: :events do
        resources :reviewers, only: %i[index create destroy]

        get '/users/available_as_reviewers', to: 'users#available_as_reviewers_index'
      end
    end

    namespace 'events' do
      scope ':event_id', as: 'events' do
        resources :participations, only: %i[index]
      end
    end

    resources :participations, only: %i[create show update destroy] do
      member do
        patch 'update_reviewer'
        patch 'update_status'
      end

      scope module: :participations do
        resources :comments, only: %i[create index]

        get '/available_reviewers', to: 'users#available_reviewers_index'
      end
    end

    resources :users, only: %i[index]

    # Authenticated User
    namespace 'user' do
      resources :participations, only: %i[index] do
        scope module: :participations do
          resources :document_templates, only: %i[index]
        end
      end
    end

    # Admin
    namespace 'admin' do
      resources :conferences, only: %i[index]
      resources :events, only: %i[index]
      resources :users, only: %i[index]
    end

    resources :permissions, only: %i[index create show destroy]

    # Other
    post '/policies', to: 'policies#index'
  end

  # Debug
  get '/debug/database', to: 'debug#database'

  # Everything else goes to React App
  get '/*path', to: 'application#react_app'
end
