describe('Home page', () => {
  it('does', () => {
    cy.server()
    cy.route('OPTIONS', '**', { id: 1, name: 'Amanda' }).as('la')
    cy
      .route('POST', '**', {
        data: {
          current: {
            id: 11,
            username: 'la',
            sessionToken: 'wpC-mFOUCIks6lFfah03-w',
            __typename: 'User',
          },
          getBlankPoem: {
            textChunks: [
              {
                isSelected: false,
                text:
                  'day that she was fine in figure; roundly built; had deep red lips like Cupid\'s bow; dark eyelashes and brows, an immense rope of hair like a ship\'s cable; and large eyes violety-bluey-blackish." "I did, mother." "I quite see her. And living in such seclusion she naturally had scarce ever seen any young man from the world without till she saw you." "Scarcely." "You were her first love?" "Of course." "There are worse wives than these simple, rosy-mouthed, robust girls of the farm. Certainly I could have wished—well, since my son is to be an agriculturist, it is perhaps but proper that his wife should have been accustomed to an outdoor life." His father was less inquisitive; but when the time came for the chapter from the Bible which was always read before evening prayers, the Vicar observed to Mrs Clare— "I think, since Angel has come, that it will be more appropriate to read the thirty-first of Proverbs than the chapter which we should have had in the usual course of our reading?" "Yes, ',
                __typename: 'TextChunk',
              },
            ],
            passage:
              'day that she was fine in figure; roundly built; had deep red lips like Cupid\'s bow; dark eyelashes and brows, an immense rope of hair like a ship\'s cable; and large eyes violety-bluey-blackish." "I did, mother." "I quite see her. And living in such seclusion she naturally had scarce ever seen any young man from the world without till she saw you." "Scarcely." "You were her first love?" "Of course." "There are worse wives than these simple, rosy-mouthed, robust girls of the farm. Certainly I could have wished—well, since my son is to be an agriculturist, it is perhaps but proper that his wife should have been accustomed to an outdoor life." His father was less inquisitive; but when the time came for the chapter from the Bible which was always read before evening prayers, the Vicar observed to Mrs Clare— "I think, since Angel has come, that it will be more appropriate to read the thirty-first of Proverbs than the chapter which we should have had in the usual course of our reading?" "Yes, ',
            book: { author: 'Thomas Hardy', id: 1, __typename: 'book' },
            __typename: 'BlankPoem',
          },
        },
      })
      .as('getUser')
    cy.visit('http://localhost:8888/new/write', {
      onBeforeLoad: win => {
        win.fetch = undefined
      },
    })
    cy.wait('@getUser')
  })
})
