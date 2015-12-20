# NambyNonsense


[Live Project Link][heroku]

[heroku]: https://nambynonsense.herokuapp.com/

## Minimum Viable Product

NambyNonsense is a web application for creating and sharing found poems.

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->
Absolute MVP
- [x] Create an account (3)
- [x] Log in / Log out (3)
- [x] Create a poem (34)
  - [x] See random passage (5)
  - [x] Intuitively highlight words (21)
  - [x] Add Filter (3)
- [x] View all poems (3)
- [x] Profile page of just your poems (1)
- [x] Delete a poem (3)

-After MVP
- [x] Inside Create (8)
  - [x] Get new passage (1)
  - [x] Let computer chose random words for you (3)

- [ ] Inside Style (8)
  - [x] Center toggle, removes unused words (3)
  - [ ] Change background (1)
  - [ ] Add line breaks in centered mode (3)

- [x] Likes (13)
  - [x] Like and unlike poems (5)
  - [x] See like count (3)
  - [x] View page of all your liked poems (3)
  - [ ] Notification shows you new likes (5)

- [ ] Other
  - [ ] Infinite Scroll (5)
  - [ ] Drop down profile nav bar (3)


## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Models and Components and Router (1 day)
Get sign up and authentication working, the models and relations, and the basic views working. Components and router setup so that it is possible to do a walk through of the site.

### Phase 2: Create and Save a Poem (1 day)
Get passage from db, user select words and this information is stored in state. On save adds to db and displays properly.

### Phase 3: Delete and Edit Poems (1 days)
Poems are properly deleted and edited. The information is stored in the db and automatically updated in the stores and components.

### Phase 4: Likes and Polished Image Creation (1 days)
Set up likes so they can be added and seen in the browser. Polished the selection so that it is intuitive and able to select letters.

### Phase 5: Optimization (1 day)
Make sure db we're avoiding unnecessary SQL queries. Improve any inefficient JS algorithms.

### Phase 6: Finish Styling and Add CSS Transitions (1 day)
A day devoted to styling. Spend one full day after basics are working and then move on. (Possibly revisit after important bonus material)


### Bonus Features
- [ ] Export as image (8)
  [ ] Use the site up to saving a poem without login (3)
- [ ] Switch view between most popular and most recent (3)
- [ ] Click any poem to see it larger (3)
- [ ] View source on poem to see original context (1)
- [ ] In create use more or less of the passage (8)
- [ ] Facebook log in (3)
- [ ] Comment on poems (5)
