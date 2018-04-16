
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

class CreatePoem < GraphQL::Function
  argument :background_id, !types.Int
  argument :color_range, !types.Int
  argument :book_id, !types.Int
  argument :passage, !types.String
  argument :title, !types.String
  # argument :text_chunks, !types[TextChunk]

  type PoemType

  def call(_obj, args, _ctx)
    style = Style.create!({ background_id: args[:background_id], color_range: args[:color_range] })
    poem = Poem.create!({ passage: args[:passage], book_id: args[:book_id], style_id: style.id })
    poem.save_selected_texts(args[:text_chunks], poem.id)
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
  # field :createPoem, function: CreatePoem.new
  field :deletePoem, function: DeletePoem.new
end
