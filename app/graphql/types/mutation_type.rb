
class CreateUser < GraphQL::Function
  argument :username, !types.String
  argument :password, !types.String

  type UserType

  def call(_obj, args, _ctx)
    user = User.new({ username: args[:username], password: args[:password] })

    if user.save
      _ctx[:sign_in].call(user)
      return user
    end
    user.save!
  rescue ActiveRecord::RecordInvalid => e
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end

class LoginUser < GraphQL::Function
  argument :username, !types.String
  argument :password, !types.String

  type UserType

  def call(_obj, args, _ctx)
    User.find_by_credentials(args[:username], args[:password])
  rescue ActiveRecord::RecordInvalid => e
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end

class LogoutUser < GraphQL::Function
  type UserType

  def call(_obj, args, _ctx)
    u = _ctx[:current_user]
    _ctx[:sign_out].call()
    u
  rescue ActiveRecord::RecordInvalid => e
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end

class ToggleLike < GraphQL::Function
  argument :poemId, !types.Int

  type LikeType

  def call(_obj, args, _ctx)
    u = _ctx[:current_user]
    like = Like.find_by({ poem_id: args[:poemId], liker_id: u.id })
    if like 
      like.destroy
      return like
    else
      like = Like.create!({ poem_id: args[:poemId], liker_id: u.id })
      return like
    end
  rescue ActiveRecord::RecordInvalid => e
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end

TextChunkInputType = GraphQL::InputObjectType.define do
  name 'TextChunkInput'
  input_field :text, !types.String
  input_field :isSelected, !types.Boolean
end

class CreatePoem < GraphQL::Function
  argument :backgroundId, !types.Int
  argument :colorRange, !types.Int
  argument :bookId, !types.Int
  argument :passage, !types.String
  argument :textChunks, types[TextChunkInputType]

  type PoemType

  def call(_obj, args, _ctx)
    u = _ctx[:current_user]
    style = Style.create!({ background_id: args[:backgroundId], color_range: args[:colorRange] })
    poem = Poem.create!({ passage: args[:passage],
      book_id: args[:bookId],
      author_id: u.id,
      style_id: style.id,
    })
    poem.save_selected_texts(args[:textChunks], poem.id)
    poem
  rescue ActiveRecord::RecordInvalid => e
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end

class UpdatePoem < GraphQL::Function
  argument :id, !types.Int
  argument :backgroundId, types.Int
  argument :colorRange, types.Int
  argument :textChunks, types[TextChunkInputType]

  type PoemType

  def call(_obj, args, _ctx)
    poem = Poem.find(args[:id])
    style = Style.create!({ background_id: args[:backgroundId], color_range: args[:colorRange] })
    poem.update({ style_id: style.id })
    if args[:textChunks]
      poem.selected_texts.delete_all
      poem.save_selected_texts(args[:textChunks], poem.id)
      puts(' -------------- ')
      puts(' -------------- ')
      # puts(' -------------- ', poem.get_poem_text.count)
      return poem
    else 
      return poem 
    end
  rescue ActiveRecord::RecordInvalid => e
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end

class DeletePoem < GraphQL::Function
  argument :id, !types.ID

  type PoemType

  def call(_obj, args, _ctx)
    poem = Poem.find(args[:id])
    poem.destroy
    return poem
  rescue ActiveRecord::RecordInvalid => e
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end


Types::MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :createUser, function: CreateUser.new
  field :loginUser, function: LoginUser.new
  field :logoutUser, function: LogoutUser.new
  field :toggleLike, function: ToggleLike.new
  field :createPoem, function: CreatePoem.new
  field :updatePoem, function: UpdatePoem.new
  field :deletePoem, function: DeletePoem.new
end
