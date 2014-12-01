// Package definition
my1024 = {};

// Functions
my1024.move_right = function () {
	this.model.move_right();
	this.model.add_tile_random( 2 );
	this.view.update_view();
};

my1024.move_left = function () {
	this.model.move_left();
	this.model.add_tile_random( 2 );
	this.view.update_view();
};

my1024.move_up = function () {
	this.model.move_up();
	this.model.add_tile_random( 2 );
	this.view.update_view();
};

my1024.move_down = function () {
	this.model.move_down();
	this.model.add_tile_random( 2 );
	this.view.update_view();
};

// Add types
my1024.__Tile = function(position, value) {
			
	// Get the view
	this.get_view = function() { return this.__view_template.replace( /#num#/g, this.get_value() ); };
	
	// Get the value
	this.get_value = function() { return this.__val; };
	
	// Get the current position
	this.get_position = function () {
		
		return {
			row : this.__position.row,
			col : this.__position.col,
		};
		
	};
	
	// Merge flag
	this.get_can_merge = function () { return this.__can_merge; };
	this.set_can_merge = function (can_merge) { this.__can_merge = can_merge; };
	
	// Move the tile	
	this.go_right = function () {
		
		var moved;
		
		do { moved = this.move("right"); } while (moved == true);
	};
	
	this.go_left = function () {
		
		var moved;
		
		do { moved = this.move("left"); } while (moved == true);
	};
	
	this.go_up = function () {
		
		var moved;
		
		do { moved = this.move("up"); } while (moved == true);
	};
	
	this.go_down = function () {
		
		var moved;
		
		do { moved = this.move("down"); } while (moved == true);
	};
	
	// Utility methods
	this.move = function(direction) {
		
		// At beginning the new position is the same as the current one
		var new_position = {
			row: this.get_position().row,
			col: this.get_position().col,
		};
		
		// Determine the direction of the movement and perform the right action
		switch(direction) {
			
			case "right":
				new_position.col += 1;
				break;
				
			case "left":
				new_position.col -= 1;
				break;
				
			case "up":
				new_position.row -= 1;
				break;
				
			case "down":
				new_position.row += 1;
				break;
			
			default:
				throw "my1024.__Tile.move(): invalid direction '" + direction + "'";
		};
		
		return my1024.model.move_tile(this, new_position);
	};
	
	this.new_position = function(position) {
		this.__position = position;
	};
	
	// Private fields
	this.__position = position;
	this.__val = value;
	
	this.__can_merge = true;
		
	this.__view_template = '<div class="number_view number_#num#">#num#<div>';

};








// Model
my1024.model = {};

// Model description		
my1024.model.get_rows = function () { return this.__rows; };
my1024.model.get_cols = function () { return this.__cols; };
my1024.model.valid_position = function (position) {
	
	// Check if row index is valid
	var valid_row = (position.row >= 0 && position.row < this.get_rows());
	
	// Check if columns index is valid
	var valid_col = (position.col >= 0 && position.col < this.get_cols());
	
	// Return true if and only if both indexes are valid
	return (valid_row && valid_col);
	};


// Move!
my1024.model.move_right = function() {
	
	// Move a full column to the right
	
	// For each column from right to left
	// For each row
	for ( var ic = this.get_rows() - 1; ic >= 0; ic-- ) {
	for ( var ir = 0; ir < this.get_cols(); ir ++ ) {
		
		var myTile = this.get_tile( { row: ir, col: ic} );
		
		if ( myTile != null ) {	myTile.go_right(); };
		
	}};
	
	this.reset_merge_flag();
};

my1024.model.move_left = function() {
	
	// For each column from left to right
	// For each row
	for ( var ic = 0; ic < this.get_rows(); ic++ ) {
	for ( var ir = 0; ir < this.get_cols(); ir ++ ) {
		
		var myTile = this.get_tile( { row: ir, col: ic, } );
		
		if ( myTile != null ) {	myTile.go_left(); };
		
	}};
	
	this.reset_merge_flag();
};

my1024.model.move_up = function() {
	
	// For each row from top to bottom
	// For each column
	for ( var ir = 0; ir < this.get_cols(); ir ++ ) {
	for ( var ic = 0; ic < this.get_rows(); ic++ ) {
		
		var myTile = this.get_tile( { row: ir, col: ic, } );
		
		if ( myTile != null ) {	myTile.go_up(); };
		
	}};
	
	this.reset_merge_flag();
};

my1024.model.move_down = function() {
	
	// For each row from bottom to top
	// For each column
	for ( var ir = this.get_cols() - 1; ir >= 0; ir -- ) {
	for ( var ic = 0; ic < this.get_rows(); ic++ ) {
		
		var myTile = this.get_tile( { row: ir, col: ic, } );
		
		if ( myTile != null ) {	myTile.go_down(); };
		
	}};
	
	this.reset_merge_flag();
};

my1024.model.move_up = function() {
	// For each row from up to down
	// For each column
	for ( var ir = 0; ir < this.get_cols(); ir ++ ) {
	for ( var ic = 0; ic < this.get_rows(); ic++ ) {
		
		var myTile = this.get_tile( { row: ir, col: ic, } );
		
		if ( myTile != null ) {	myTile.go_up(); };
		
	}};
};


// Tiles management
my1024.model.get_tile = function (position) {
	
	// Invalid row index
	if ( position.row < 0 || position.row >= this.get_rows) {
		return null;
	};
	
	// Invalid column index
	if ( position.col < 0 || position.col >= this.get_cols) {
		return null;
	};
	
	// Valid tile
	return this.__board[position.row][position.col];
};

my1024.model.add_tile = function(position, value) {
	
	var new_tile = new my1024.__Tile(position, value);
	this.__board[position.row][position.col] = new_tile;
	return new_tile;
};

my1024.model.add_tile_random = function (value) {
	
	var random_position = this.get_random_free_position();
	
	this.add_tile( random_position, 2 );
};

my1024.model.get_random_free_position = function() {
	
	// Build the map of free positions
	var freePositions = new Array();
	
	for ( var ir = 0; ir < this.get_cols(); ir++ ) {
	for ( var ic = 0; ic < this.get_rows(); ic++ ) {
		
		var my_position = { row: ir, col: ic, };
		
		if ( this.get_tile( my_position ) == null ) { freePositions.push( my_position ) };
		
	}};
	
	console.log( freePositions );
	
	// Choose a random free position
	var random_integer = Math.floor( Math.random() * 1000 ); // Intero casuale tra 0 e 1000
	var random_index = random_integer % freePositions.length; // Riportiamo il numero casuale ad un indice dell'array
	
	// Return the random position chosen among the list of free positions
	return freePositions[random_index];
};

my1024.model.reset_merge_flag = function () {
	
	for ( var ir = 0; ir < this.get_cols(); ir++ ) {
	for ( var ic = 0; ic < this.get_rows(); ic++ ) {
		
		var my_position = { row: ir, col: ic, };
		
		if ( this.get_tile( my_position ) != null ) { this.get_tile( my_position ).set_can_merge(true) };
		
	}};
};

my1024.model.move_tile = function(moving_tile, to) {
	
	/*
	 Four possible situations:
	 
	 1) new position is empty: move the tile to the new position
	 
	 2) new position holds a tile with the same vale of the moving tile: merge the tiles and return false
	 
	 3) new position holds a tile with with a different value: do nothing and return false
	 
	 4) new position is beyond table boundaries: do nothing and return false
	 
	 The function return false if the movement was not possible or no other movement are possible
	*/
	
	// Original position of the tile
	var from = moving_tile.get_position();
	
	// Holder for new_position_tile objects
	var new_position_tile = null;
	
	// Verify that final position differs froms tarting position
	if (moving_tile.get_position().row == to.row && moving_tile.get_position().col == to.col ) {
		throw "my1024.model.move_tile: starting position and destination are the same!";
	};
	
	// Check for situation 4 conditions:
	if ( ! this.valid_position(to) ) {
		return false;
	};
	
	// Indexes are valid, to examine the other cases we need to retrieve the reference
	// to the tile new_position_tile
	new_position_tile = this.__board[to.row][to.col];
	
	// Check for situation 2 conditions:
	if(new_position_tile == null) {
		// If conditions are satisfied then move the tile to the new position

		// Move the tile
		this.__board[from.row][from.col] = null;
		this.__board[to.row][to.col] = moving_tile;
		
		// Update the tile position
		moving_tile.new_position(to);
		
		// Return true because we were able to move the tile successfully
		return true;
	};
	
	// Check for situation 3: if both tiles have the same value merge the tiles
	if( moving_tile.get_can_merge() && new_position_tile.get_can_merge()  && ( moving_tile.get_value() == new_position_tile.get_value() ) ) {
		
		// 1) Calculate the new value
		var new_value = moving_tile.get_value() + new_position_tile.get_value(); 
		
		// 2) Remove the two merged tile
		this.__board[from.row][from.col] = null;
		this.__board[to.row][to.col] = null;
		
		// 3) Insert the new tile
		var new_tile = this.add_tile(to,new_value);
		new_tile.set_can_merge(false);
		
		// 4) return false because no other movements are possible
		return false;
		
	}
	
	// Situation 4: no moves possible
	else {
		
		// Return false because the destination cell already contains
		// a tile which cannot be merged with the moving tile
		return false;
		
	};
};


my1024.model.__board = [
	[null,null,null,null],
	[null,null,null,null],
	[null,null,null,null],
	[null,null,null,null],
];
		
my1024.model.__rows = 4;
my1024.model.__cols = 4;








my1024.view = {};
		
// - - - - - - - - - - - -		
// Update the whole view
// - - - - - - - - - - - -
my1024.view.update_view = function() {
	
	// Each row and col
	for ( var ri = 0; ri <= 3; ri++ ) {
	for ( var ci = 0; ci <= 3; ci++ ) {
		
		this.update_tile_view(ri,ci);
		
	}}; // end for each row and col
	
}; // end update_view

my1024.view.update_tile_view = function(row,col) {
	
	var this_tile = my1024.model.get_tile( {row: row,col: col} );
	var container_element = $("#" + this.__model_view_mapping[row][col]);
	
	// Build the view for the number and up the global view
	if(this_tile != null) {
		
		// If there is a number in this position show it
		container_element.html( this_tile.get_view() );
		console.log(this_tile.get_view());
		
	} else {
		
		// If there isn't a number clear the view
		container_element.html("");
		
	}; // end if-else
	
};
		
my1024.view.__model_view_mapping = [
	["row1_col1","row1_col2","row1_col3","row1_col4"],
	["row2_col1","row2_col2","row2_col3","row2_col4"],
	["row3_col1","row3_col2","row3_col3","row3_col4"],
	["row4_col1","row4_col2","row4_col3","row4_col4"],
];

// Keyboard event listener
$( document ).keyup( function ( eventObj ) {
	
	// Move the tiles
	switch( eventObj.key ) {
		
		case "Right":
			my1024.move_right();
			break;
		
		case "Left":
			my1024.move_left();
			break;
		
		case "Up":
			my1024.move_up();
			break;
		
		case "Down":
			my1024.move_down();
			break;
			
	}
	
	// Check for victory
	// Check for game over
	
});

$( document ).ready(function() {
	
	// Initialize the board
	my1024.model.add_tile_random( 2 );
	my1024.model.add_tile_random( 2 );
	
	// Update the view
	my1024.view.update_view()
});