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

  def my_poem_likes
    @likes = current_user.poem_likes
    @likes.order('likes.created_at DESC')
  end

  def mark_seen
    @likes = Like.find(params[:like_ids])
    @likes.each do |like|
      like.update(seen: true)
    end
    render json: @likes
  end
end
