class Api::UsersController < ApplicationController
  def show
    @user = current_user
    @poems = @user.poems.reverse_order
  end
end
