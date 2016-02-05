require 'rails_helper'

describe "Log In", :js => true do
  before :each do
    visit "/#/"
  end

  it "Guest log in works" do
    guestLogIn
    expect(page).to have_content "Hi Guest"
  end

  it "takes a username and password" do
    find(".userInfo").click
    find('.loginWindow .link', :text => 'Log In').click
    page.fill_in 'Username', :with => 'billybob'
    page.fill_in 'Password', :with => 'password'
    find('input[type="submit"]').click
    # expect(page).to have_content "Hi billybob"
  end

  it "invalid password fails" do
    find(".userInfo").click
    find('.loginWindow .link', :text => 'Log In').click
    page.fill_in 'Username', :with => 'tracy'
    page.fill_in 'Password', :with => 'skdflksdfjk'
    find('input[type="submit"]').click
    expect(page).to have_content "Invalid"
  end


end

def guestLogIn
  find(".userInfo").click
  expect(page).to have_content "Username"
  find("#guestLoginBtn").click
end
