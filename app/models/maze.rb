class Maze < ActiveRecord::Base
	validates :maze_width, presence: true, numericality: { only_integer: true, greater_than: 0, less_than: 26 }
	validates :maze_height, presence: true, numericality: { only_integer: true, greater_than: 0, less_than: 16 }	
end
