class ApplicationController < ActionController::Base
  helper_method :current_user, :signed_in?, :sign_in
  private
  def current_user
    @current_user ||= User.find_by_session_token(request.headers['X-CSRF-Token'])
  end

  def signed_in?
    !!current_user
  end

  def sign_in(user)
    @current_user = user
    session[:token] = user.reset_session_token!
  end

  def sign_out
    @user = current_user
    current_user.try(:reset_session_token!)
    session[:token] = nil
  end

  def require_signed_in!
    redirect_to new_session_url unless signed_in?
  end

  def require_signed_out!
    redirect_to root_url if signed_in?
  end

end
