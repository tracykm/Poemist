class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end
  def current
    @user = current_user
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
      if(@user.username) == "Guest"
        reset_guest_info(@user)
      end
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
