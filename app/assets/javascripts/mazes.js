function mazeSolver10(){
	var maze = $('.maze_class').data('maze');
	var myMaze = maze.blocks;
	var solvit = new mazeSolver1(myMaze);
  solvit.traverse(1,1); //test this point
}

function mazeSolver1(maze) {

    this.maze = maze;
 
    this.traverse = function(column, row) {
        if(this.maze[column][row] == 3) {
            document.getElementById('the_maze').innerHTML = displayMaze(this.maze);
            return;  

        } else if(this.maze[column][row] == 0) {
            this.maze[column][row] = "<span style='color:red;'>5</span>";
            if(column < this.maze.length - 1) {
                this.traverse(column + 1, row);
            }
            if(row < this.maze[column].length - 1) {
                this.traverse(column, row + 1);
            }
            if(column > 0) {
                this.traverse(column - 1, row);
            }
            if(row > 0) {
                this.traverse(column, row - 1);
            }
        }
    }
 
}

function displayMaze(maze) {
    
             var text = [];
             for (var y = 0; y < maze.length; y++)
             text.push(maze[y].join('')+'<br>');
             return text.join('');
            }

