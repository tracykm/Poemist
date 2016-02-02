require 'rails_helper'

describe "Sign up", :js => true do
  before :each do
    visit "/#/new/create"
  end

  it "has a user sign up page" do
    save_and_open_page
    expect(page).to have_content "Create"
  end

  it "takes a username and password" do
    expect(page).to have_content "Username"
    expect(page).to have_content "Password"
  end

end
