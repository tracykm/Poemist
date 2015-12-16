json.extract!(
  @user,
  :id, :username
)
json.poems do
  json.array!(@poems) do |poem|
    json.partial!('api/poems/poem', poem: poem)
  end
end
