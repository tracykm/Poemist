class Api::PoemsController < ApplicationController

  def index
    @poems = Poem.page(1).all.includes(:selected_texts, :author, :style, :likes, :book).order('poems.created_at DESC')
  end

  def by_page
    # sleep(2);
    @poems = Poem.page(params[:page_num]).all.includes(:selected_texts, :author, :style, :likes, :book).order('created_at DESC')
    if(@poems.empty?)
      render json: "empty"
    end
  end

  def show
    @poem = Poem.find(params[:id])
  end

  def by_liker
    user = User.find(params[:user_id])
    @poems = user.liked_poems.page(params[:page_num]).order('created_at DESC')
    if(@poems.empty?)
      render json: "empty"
    end
  end

  def by_author
    @user = User.find(params[:user_id])
    @poems = @user.poems.page(params[:page_num]).order('created_at DESC')
    render :index
  end

  def destroy
    @poem = Poem.find(params[:id])
    @poem.destroy
    render json: @poem
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
        saveSelectedTexts(poem_params["selected_texts"], @poem.id)
        render :show
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
      saveSelectedTexts(poem_params["selected_texts"], @poem.id)
      render :show
    else
      render :json => { :errors => @poem.errors }, :status => 422
    end
  end

  def saveSelectedTexts(selected_texts, poem_id)
    selected_texts.to_a.each do |highlight|
      selected_text = highlight[1] # TODO fix why highlight format ex. highlight = ["0", ["4", "13"]]
      SelectedText.create(poem_id: @poem.id, start_idx: selected_text[0], end_idx: selected_text[1])
    end
  end
end
