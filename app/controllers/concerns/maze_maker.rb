module MazeMaker
	extend ActiveSupport::Concern

	def make_maze
    	@width = (2*@maze.maze_width)+1
        @height = (2*@maze.maze_height)+1
        blocks = Hash.new{|h, k| h[k] = []}
        moves = []

#set up 2d array, derived from hash, could be simpler
#set all to 1's
    for x in 0..@height-1
        for y in 0..@width-1
          blocks[x][y] = 1
        end
    end

    for x in 0..@height-1
      @maze.blocks << blocks[x]
    end
#clear the path with 0's
    x_pos = 1
    y_pos = 1
    @maze.blocks[x_pos][y_pos] = 0
    moves.push(y_pos + (x_pos * @width))
    while(!moves.empty?)
    possible_directions = ""
    # puts "x_pos: #{x_pos} y_pos: #{y_pos}"
    if(x_pos+2 < @height and @maze.blocks[x_pos+2][y_pos]== 1 and x_pos+2!=0 and x_pos+2!=@height-1)
        possible_directions += "S"
    end
    if(x_pos-2 > 0 and @maze.blocks[x_pos-2][y_pos]== 1 and x_pos-2!=0 and x_pos-2!=@height-1)
        possible_directions += "N"
    end
    if(y_pos-2 > 0 and @maze.blocks[x_pos][y_pos-2]== 1 and y_pos-2!=0 and y_pos-2!=@width-1)
        possible_directions += "W"
    end
    if(@maze.blocks[x_pos][y_pos+2]== 1 and y_pos+2!=0 and y_pos+2!=@width-1)
        possible_directions += "E"
    end
    if(!possible_directions.empty?)
        move = rand(possible_directions.length)
        case(possible_directions[move].chr)
            when "N"
                @maze.blocks[x_pos-2][y_pos] = 0;
                @maze.blocks[x_pos-1][y_pos] = 0;
                x_pos -= 2;
            when "S"
                @maze.blocks[x_pos+2][y_pos] = 0;
                @maze.blocks[x_pos+1][y_pos] = 0;
                x_pos += 2;
            when "W"
                @maze.blocks[x_pos][y_pos-2] = 0;
                @maze.blocks[x_pos][y_pos-1] = 0;
                y_pos -= 2;
            when "E"
                @maze.blocks[x_pos][y_pos+2] = 0;
                @maze.blocks[x_pos][y_pos+1] = 0;
                y_pos += 2;
        end
        moves.push(y_pos+(x_pos*@width))

        else 
            back = moves.pop
            x_pos = (back/@width).floor
            y_pos = back % @width
        end
    end

		#make the door a 2
		for door in 1..@height
		    if @maze.blocks[door][1] == 0
		        @maze.blocks[door][0] = 2 
		        break
		    end
		end

		#make the exit a 3
		xit = @height-1
		xit.downto(0) do |x|
		    if @maze.blocks[x][@width-2] == 0
		       @maze.blocks[x][@width-1] = 3
		      break
		    end
		end
  end
end