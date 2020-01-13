Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only:[:create, :show]
    resources :locations, only:[:index]
    resource :session, only: [:create, :destroy]
    resources :events, only: [:create, :destroy, :show, :update, :index] do
      resources :reservations, only: [:create, :destroy]
    end
    resources :categories, only: [:index]
    resources :groups, only: [:create, :destroy, :show, :update, :index] do
      resources :memberships, only: [:create, :update, :destroy]
      resources :types, only: [:create, :destroy]
      collection do
        get 'search'
      end
    end
    
  end

  root "static_pages#root"
end