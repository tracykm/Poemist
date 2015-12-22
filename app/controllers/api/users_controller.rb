class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end
  def current
    @user = current_user
  end
end
