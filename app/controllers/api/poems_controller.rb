class Api::PoemsController < ApplicationController
  def index
    @poems = Poem.all
  end

  def show
    @poem = Poem.find(params[:id])
  end


  def create
    poem_params = params[:poem]
    @poem = Poem.new({author_id: current_user.id,
                      passage: poem_params["passage"],
                      book_id: poem_params["book_id"],
                      style_id: 1});
    if @poem.save
      flash.now[:errors] = ["it worked! new poem in db"]
      highlights = poem_params["selected_texts"].to_a.each_slice(2).to_a

      highlights.each do |highlight|
      puts "\n --------- ********** ----- #{highlight} ---- \n"
        SelectedText.create(poem_id: @poem.id, start_idx: highlight[0], end_idx: highlight[1])
      end
      render json: ["yay"]
    else
      flash.now[:errors] = @poem.errors.full_messages
    end
  end
end
