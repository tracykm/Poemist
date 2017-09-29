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
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
