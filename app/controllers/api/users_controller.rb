class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def current
    if(!current_user)
      render json: "undefined"
    end
    @user = current_user
  end

  def logout
    sign_out
    render json: @user
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      render :current
    else
      render json: @user.errors.full_messages
    end
  end

  def login
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      sign_in(@user)
      render :current
    else
      render json: ["Invalid username or password."]
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :description, :img_url)
  end

end
