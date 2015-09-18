class CreateMazes < ActiveRecord::Migration
  def change
    create_table :mazes do |t|
    	t.integer :maze_width
    	t.integer :maze_height
    	t.text :door, array: true, default: []
    	t.text :exit, array: true, default: []
      t.text :blocks, array: true, default: []
      t.timestamps null: false
    end
  end
end
