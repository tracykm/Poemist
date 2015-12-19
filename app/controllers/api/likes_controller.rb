class Api::LikesController < ApplicationController
  def create
    like_params = params.require(:like).permit("liker_id", "poem_id")
    @like = Like.new(like_params)
    if @like.save
      render json: @like
    end
  end
end
