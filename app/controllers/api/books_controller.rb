class Api::BooksController < ApplicationController
  def show
    @book = Book.find(params[:id])
  end

  def new
    rand_idx = Random.rand(Book.count)+1
    @book = Book.find(rand_idx)
    text = @book.text
    passage_length = 1600
    start_idx = Random.rand(text.length-passage_length)
    @book.text = text[start_idx..start_idx+passage_length]
  end
end
