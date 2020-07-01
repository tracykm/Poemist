class Api::BooksController < ApplicationController
  def show
    @book = Book.find(params[:id])
  end

  def new
    render json: Book.getRandomPassage
  end
end
