Rails.application.routes.draw do
  root to: 'static_pages#root'
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api, defaults: {format: :json} do
    get 'poems/by_liker/:user_id', :to => 'poems#by_liker'
    resources :books, only: [:show, :new]
    resources :users, only: [:show]
    resources :likes, only: [:create]
    resources :poems, only: [:create, :index, :show, :destroy, :update]
  end
end
