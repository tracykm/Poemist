class Api::PoemsController < ApplicationController
  def index
    @poems = Poem.all.includes(:letters, :author, :style, :book)
  end

  def show
    @poem = Poem.find(params[:id])
  end

  def destroy
    @poem = Poem.find(params[:id])
    @poem.destroy
    render json: @poem
  end

  def create
    poem_params = params[:poem]
    @poem = Poem.new({author_id: current_user.id,
                      book_id: poem_params["book_id"]});
    if @poem.save
      style_params = poem_params.permit("centered", "color_range", "background_id", "font_set_id")
      @style = Style.new(style_params)
      @style.poem_id = @poem.id
      @style.save!

      letters = poem_params["letters"].values
      ActiveRecord::Base.transaction do
        letters.each do |letter|
          l = Letter.new(letter)
          l.poem_id = @poem.id
          l.save!
        end
      end
      render json: ["yay"]
    else
      flash.now[:errors] = @poem.errors.full_messages
    end
  end

  def update
    poem_params = params[:poem]
    @poem = Poem.find(params[:id])
    if @poem.update({author_id: current_user.id, book_id: poem_params["book_id"]})
      style_params = poem_params.permit("centered", "color_range", "background_id", "font_set_id")
      @style = Style.new(style_params)
      @style.poem_id = @poem.id
      @style.save!

      @poem.letters.destroy_all

      letters = poem_params["letters"].values
      letters.each do |letter|
        l = Letter.new(letter)
        l.poem_id = @poem.id
        l.save!
      end
      render json: ["yay"]
    else
      flash.now[:errors] = @poem.errors.full_messages
    end
  end
end
