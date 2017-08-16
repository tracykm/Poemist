class Api::PoemsController < ApplicationController

  def index
    @poems = Poem.all
    if params[:author_id]
      @poems = Poem.where(author_id: params[:author_id])
    elsif params[:liker_id]
      @poems = User.find(params[:liker_id]).liked_poems
    end

    @poems = @poems.page(params[:_page]).includes(:selected_texts, :author, :style, :likes, :book).order('created_at DESC')
    render json: Poem.renderAll(@poems)
  end

  def show
    @poem = Poem.find(params[:id])
  end

  def destroy
    @poem = Poem.find(params[:id])
    @poem.destroy
    render json: Poem.renderOne(@poem)
  end


  def create
    if current_user
      poem_params = params[:poem]
      style_params = poem_params.permit("centered", "color_range", "background_id", "font_set_id")
      @style = Style.create(style_params);
      @poem = Poem.new({
        author_id: current_user.id,
        passage: poem_params["passage"],
        book_id: poem_params["book_id"],
        style_id: @style.id
      });

      if @poem.save
        @poem.save_selected_texts(poem_params["text_chunks"], @poem.id)
        render json: Poem.renderOne(@poem)
      else
        render :json => { :errors => @poem.errors }, :status => 422
      end
    else
      render :json => { :errors => { author_id: 'Please log in to save a poem.'} }, :status => 401
    end

  end

  def update
    poem_params = params[:poem]
    style_params = poem_params.permit("centered", "color_range", "background_id", "font_set_id")
    @style = Style.create(style_params);
    @poem = Poem.find(params[:id])

    new_params = ({
      author_id: current_user.id,
      passage: poem_params["passage"],
      book_id: poem_params["book_id"],
      style_id: @style.id
    });

    if @poem.update(new_params)
      # clear out old
      @poem.selected_texts.delete_all
      @poem.save_selected_texts(poem_params["text_chunks"], @poem.id)
      render json: Poem.renderOne(@poem)
    else
      render :json => { :errors => @poem.errors }, :status => 422
    end
  end
end
