json.array!(@mazes) do |maze|
  json.extract! maze, :id
  json.url maze_url(maze, format: :json)
end
