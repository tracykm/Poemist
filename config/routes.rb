Rails.application.routes.draw do
  root to: 'static_pages#root'
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :update]

  # match '/auth/:provider/callback', :to => 'sessions#create'
  # match '/auth/failure', :to => 'sessions#failure'

  namespace :api, defaults: {format: :json} do
    get 'poems/by_liker/:user_id', :to => 'poems#by_liker'
    get 'poems/by_author/:user_id', :to => 'poems#by_author'
    get 'likes/my_poem_likes/', :to => 'likes#my_poem_likes'
    patch 'likes/mark_seen/', :to => 'likes#mark_seen'
    get 'users/current/', :to => 'users#current'
    post 'users/login/', :to => 'users#login'
    delete 'users/logout/', :to => 'users#logout'
    resources :books, only: [:show, :new]
    resources :users, only: [:show, :create]
    resources :likes, only: [:create]
    resources :poems, only: [:create, :index, :show, :destroy, :update]
  end

  get '*path' => 'static_pages#root'
end
