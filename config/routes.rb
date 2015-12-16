Rails.application.routes.draw do
  root to: 'static_pages#root'
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api, defaults: {format: :json} do
    resources :books, only: [:show]
    resources :users, only: [:show]
    resources :poems, only: [:create, :index, :show]
  end
end
