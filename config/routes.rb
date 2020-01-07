Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only:[:create, :show]
    resource :session, only: [:create, :destroy]
    resources :events, only: [:create, :destroy, :show, :update, :index]
    resources :groups, only: [:create, :destroy, :show, :update, :index] do
      resources :memberships, only: [:create, :update, :destroy]
    end
    
  end

  root "static_pages#root"
end