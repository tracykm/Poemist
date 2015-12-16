# NambyNonsense


[Live Project Link][heroku]

[heroku]: https://nambynonsense.herokuapp.com/

## Minimum Viable Product

NambyNonsense is a web application for generating pretentious nonsense and
sharing it visually.

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Go to create page and see a book passage
- [ ] Get new passage
- [ ] Select words
- [ ] Let computer chose random words
- [ ] Style the image from with background, font, color, center toggle
- [ ] Save you poem
- [ ] View all poems
- [ ] View your poems
- [ ] Delete a poem
- [ ] Like a poem


## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Models and Components and Router (1 day)

Get sign up and authentication working, the models and relations, and the basic views working. Components and router working so that it is possible to do a walk through of the site.

### Phase 2: Create and Save a PhotoPoem (1 day)

Get the image from the browser preview to store in the database.

### Phase 3: Flux Architecture and PhotoPoem CRUD and the json views outputing the right information (2 days)

Stores and Actions and JSON apis will be set up. The basics of creating, deleting and viewing PhotoPoems should work in the browser.

### Phase 4: Comments, Likes and Polished Image Creation (2 days)

Set up comments and likes so they can be added and seen in the browser. Polished the image generation so that there are a handful of possible backgrounds and fonts.

### Phase 4: Finish Styling and Add CSS Transitions (1 day)

A day devoted to styling. Spend one full day after basics are working and then move on. (Possibly revist after important bonus material)

### Phase 5: Improve Text Generating Algorithm (1 day)

Add more variety to make it interesting in mass.


### Bonus Features (TBD)
- [ ] Infinite scroll
- [ ] Export
- [ ] Switch view between most popular and most recent
- [ ] Notification number
- [ ] Comment on other photos
- [ ] Favorites page of liked photos
- [ ] View source on poem to see original context
- [ ] See more or less of the passage
