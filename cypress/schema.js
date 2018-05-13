module.exports = `
# A BlankPoem
type BlankPoem {
  book: book
  passage: String
  textChunks: [TextChunk]
}

# A book
type book {
  author: String!
  createdAt: Int
  id: Int!
  poems: [Poem]
  text: String!
  title: String!
  updatedAt: Int
}

# A like
type like {
  createdAt: Int
  id: Int!
  liker: User
  poem: Poem
  seen: Boolean!
  updatedAt: Int
}

type Mutation {
  createPoem(backgroundId: Int!, colorRange: Int!, bookId: Int!, passage: String!, textChunks: [TextChunkInput]): Poem
  createUser(username: String!, password: String!): User
  deletePoem(id: ID!): Poem
  loginUser(username: String!, password: String!): User
  logoutUser: User
  toggleLike(poemId: Int!): like
  updatePoem(id: Int!, backgroundId: Int, colorRange: Int, textChunks: [TextChunkInput]): Poem
}

# A pagination
type pagination {
  count: Int!
  hasMore: Boolean!
  items: [Poem]
  limit: Int!
  offset: Int!
}

# Collection of text chunks
type Poem {
  author: User
  authorId: Int
  backgroundId: Int
  book: book
  centered: Int
  colorRange: Int
  createdAt: Int
  id: Int!
  likes: [like]
  passage: String!
  styleId: Int!
  textChunks: [TextChunk]
  updatedAt: Int
}

type Query {
  books: [book]

  # current user
  current: User
  getBlankPoem: BlankPoem
  poem(id: ID!): Poem
  poems(limit: Int!, offset: Int!, authorId: Int): pagination
  randomPassage: book
  user(id: ID!): User
}

# A TextChunk, a passage and where it is selected or not
type TextChunk {
  isSelected: Boolean
  text: String
}

input TextChunkInput {
  text: String!
  isSelected: Boolean!
}

# A user
type User {
  createdAt: Int
  id: Int!
  likes: [like]
  poems: [Poem]
  poemsWrittenCount: Int
  sessionToken: String
  updatedAt: Int
  username: String!
}

`
