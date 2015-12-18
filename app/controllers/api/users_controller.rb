class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @poems = @user.poems
  end
end
