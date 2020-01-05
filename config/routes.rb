Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resource :user, only:[:create]
    resource :session, only: [:create, :destroy]
    resources :events, only: [:create, :destroy, :show, :update, :index]
    resources :groups, only: [:create, :destroy, :show, :update, :index]
  end

  root "static_pages#root"
end