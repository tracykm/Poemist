json.array!(@poems) do |poem|
  json.partial!('poem', poem: poem)
end
