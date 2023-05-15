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
        resources :events, only: %i[create]
      end
    end

    resources :document_templates, only: %i[create show destroy]
    post '/documents/generate_participation_certificate', to: 'documents#generate_participation_certificate'

    resources :events, only: %i[index show update] do
      member do
        patch 'update_participations_order'
      end

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
        resources :comments, only: %i[index create]
        resources :reviews, only: %i[index create]

        get '/available_reviewers', to: 'users#available_reviewers_index'
      end
    end

    resources :reviews, only: %i[update]
    resources :users, only: %i[index]

    # Authenticated User
    namespace 'user' do
      resources :participations, only: %i[index] do
        scope module: :participations do
          resources :document_templates, only: %i[index]
        end
      end

      resources :reviews, only: %i[index]
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

    unless Rails.env.production?
      # Debug
      get '/debug/database', to: 'debug#database'
      get '/debug/time', to: 'debug#time'

      # E2E
      post '/e2e/db_reset', to: 'e2e#db_reset'
      post '/e2e/time_travel', to: 'e2e#time_travel'
      post '/e2e/time_return', to: 'e2e#time_return'
    end
  end

  # Everything else goes to React App
  get '/*path', to: 'application#react_app', constraints: lambda { |req|
    # ...except for ActiveStorage routes.
    req.path.exclude? 'rails/active_storage'
    # See here:
    # https://github.com/rails/rails/issues/31228#issuecomment-352900551
    # https://stackoverflow.com/questions/54990363/rails-activestorage-url-for-returns-an-url-which-is-not-valid/55450163
  }
end
