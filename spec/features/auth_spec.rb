require 'rails_helper'

feature "Sign up" do
  before :each do
    visit "/users/new"
  end

  it "has a user sign up page" do
    expect(page).to have_content "Sign Up"
  end

  it "takes a username and password" do
    expect(page).to have_content "Username"
    expect(page).to have_content "Password"
  end

end
