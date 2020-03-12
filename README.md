# Cleaner Bot

## The Solution

We have 2 objects storing x-axis(rows) and y-axis(columns) paths that are cleaned by the robot.

* The main axis for N/S commands is y-axis and the cross axis is x-axis
* The main axis for E/W commands is x-axis and the cross axis is y-axis
In every command, we calculate the end position and construct a path with start and end coordinates.

We check the new path in 3 steps:

1) If a bigger path containing the new path is already exists in the main axis, we skip the new path and go to the next command.
2) Try to find some visited paths in the main axis that contain new start and end position, merge them with new path and return the new visited path. If there is no visited path with this condition, return the new path.
3) If returned value of previous section is not null, it means that we have new tiles that we should check them in cross axis one by one to ensure that we didn't visit them before and update the counter for each new tile.

## Run

First of all, you should install dependencies:

`$ npm install`

Then, you can run the code with this command:

`$ node src/main.js`

## Test

Tests are written with Mocha module and you can run them with `npm test` command.
