class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    render json: User.renderOne(@user)
  end

  def current
    if(!current_user)
      render json: "undefined"
    else
      @user = current_user
      render json: User.renderOne(@user)
    end
  end

  def logout
    sign_out
    render json: User.renderOne(@user)
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      render json: User.renderOne(@user)
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
      render json: User.renderOne(@user)
    else
      render json: ["Invalid username or password."]
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :description, :img_url)
  end

end
