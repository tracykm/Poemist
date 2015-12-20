class Api::LikesController < ApplicationController
  def create
    like_params = params.require(:like).permit("liker_id", "poem_id")
    @like = Like.find_by(like_params)
    if(@like)
      render json: @like
      @like.destroy
    else
      @like = Like.new(like_params)
      if @like.save
        render json: @like
      end
    end
  end
end
