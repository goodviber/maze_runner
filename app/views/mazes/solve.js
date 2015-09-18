$('input[type=button]').click(function() {
	alert('solver');
});

fillMaze(maze.blocks, start);

    document.getElementById('steps').innerHTML = displayMaze(maze.blocks);
    
    followSolution(maze.blocks, end);
    
    document.getElementById('answer').innerHTML = displayMaze(maze.blocks);
}
function followSolution(maze.blocks, end) {

    var height = maze.blocks.length;
    var width = maze.blocks[0].length;

    var cur_step = parseInt( maze.blocks[end[0]][end[1]] );
    console.log(cur_step)
    
    maze.blocks[end[0]][end[1]] = 'o';
    
    while (cur_step > 1) {
        y = end[0];
        x = end[1];
        console.log(end);
        console.log(cur_step);
        var get_out = 0;

        // check each of the neighbours (up down left right)
        for(var ny = -1; ny <= 1; ny++) { // If checking all neighbours this could be max(y-1,0):min(y+1,height)
            for(var nx = -1; nx <= 1; nx++) {
               if (Math.abs(ny) == Math.abs(nx) || y+ny < 0 || y+ny >= height || x+nx < 0 || x+nx >= width )
                    continue;


                if (maze.blocks[y+ny][x+nx] == (cur_step-1).toString()) {
                    end = [y+ny, x+nx];
                    cur_step = parseInt( maze.blocks[end[0]][end[1]] );
                    maze.blocks[y+ny][x+nx] = 'o';
                    get_out = 1;
                    break;
                }

            }
            if (get_out == 1) 
                break;

        }
    
    }
}

    function displayMaze(maze.blocks) {
    
    var text = [];
    for (var y = 0; y < maze.blocks.length; y++)
        text.push(maze.blocks[y].join('')+'\n');
    
    return text.join('');
}

function findStartEnd(maze.blocks,val) {

    var height = maze.blocks.length;
    var width = maze.blocks[0].length;
        
    // find start
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            
            if (maze.blocks[y][x] == val) {
                // check the four directions
                for (var ny = -1; ny <= 1; ny++) {
                    for (var nx = -1; nx <= 1; nx++) {
                        if (Math.abs(ny) == Math.abs(nx) || y+ny < 0 || y+ny >= height || x+nx < 0 || x+nx >= width)
                            continue;
                        
                        if (maze.blocks[y+ny][x+nx] == ' ')
                            return [y+ny, x+nx];
                        
                    }
                }
            }
        }
    }
}
function fillMaze(maze.blocks, start) {

    maze.blocks[start[0]][start[1]] = '1';
    //document.getElementById('again').innerHTML = displayMaze(maze.blocks);
    var height = maze.blocks.length;
    var width = maze.blocks[0].length;
    
    queue = start;
    
    while (queue.length != 0) {
       
        var y = queue.shift();
        var x = queue.shift();
        var cur_val = parseInt(maze.blocks[y][x]);

        // check each of the neighbours
        for (var ny = -1; ny <= 1; ny++) {
            for (var nx = -1; nx <= 1; nx++) {
                if (Math.abs(ny) == Math.abs(nx) || y+ny < 0 || y+ny >= height || x+nx < 0 || x+nx >= width) 
                    continue;

                if (maze.blocks[y+ny][x+nx] == ' ') {
                    maze.blocks[y+ny][x+nx] = (cur_val+1).toString();
                    queue.push(y+ny);
                    queue.push(x+nx);
                }

            }
        }
        
        
        
    }

}
