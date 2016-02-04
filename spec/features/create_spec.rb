require 'rails_helper'

describe "Create Page ", :js => true do
  before :each do
    visit "/#/new/create"
  end

  it "exits and says create" do
    expect(page).to have_content "Create"
  end

  # it "nudges words and moves to style" do
  #   sleep 10
  #   find(".nudge").click
  #   find(".bigger").click
  #   save_and_open_page
  # end


end
