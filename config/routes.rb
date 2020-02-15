Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  
  namespace :api, defaults: {format: :json} do
    resources :users, only:[:index, :create, :show] do
      resources :channels, only:[:index]
      resources :groups, only: [:index]
    end
    resources :locations, only:[:index] do
      resources :groups, only: [:index]
      resources :events, only: [:index]
    end
    resource :session, only: [:create, :destroy]
    resources :memberships, only: [:update]
    resources :events, only: [:create, :destroy, :show, :update, :index] do
      resources :reservations, only: [:index, :create, :destroy]
      resources :users, only:[:index]
      collection do
        get 'search'
      end
    end
    resources :categories, only: [:index] do
      resources :groups, only: [:index]
    end
    resources :groups, only: [:create, :destroy, :show, :update, :index] do
      resources :memberships, only: [:index, :create, :destroy]
      resources :types, only: [:create, :destroy]
      resources :users, only:[:index]
      resources :events, only:[:index]

      resources :channels, only: [:index, :create, :destroy] do
        resources :messages, only: [:index, :create, :destroy]
        resources :channelships, only: [:index, :create, :destroy]
      end
      
      collection do
        get 'search'
      end
    end


    resources :channels, only: [:update] do
      resources :users, only: [:index]
    end

    resources :channelships, only: [:index, :update] 
    
  end

  root "static_pages#root"
end