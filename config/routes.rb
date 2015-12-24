Rails.application.routes.draw do
  root to: 'static_pages#root'
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :update]

  namespace :api, defaults: {format: :json} do
    get 'poems/by_liker/:user_id', :to => 'poems#by_liker'
    get 'poems/by_author/:user_id', :to => 'poems#by_author'
    get 'poems/by_page/:page_num', :to => 'poems#by_page'
    get 'likes/my_poem_likes/', :to => 'likes#my_poem_likes'
    get 'users/current/', :to => 'users#current'
    resources :books, only: [:show, :new]
    resources :users, only: [:show]
    resources :likes, only: [:create]
    resources :poems, only: [:create, :index, :show, :destroy, :update]
  end
end
