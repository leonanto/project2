//The animation and transition of tiles was the additional feature added
//id 620055806
var space = [3, 3];
var progress = false;

$(document).ready( function () {
	var tiles = $('#puzzlearea > div');
	var button = document.getElementById('shufflebutton');
	button.onclick = shuffle;
	for(var i = 0; i < tiles.length; i++){
		tiles.addClass('puzzlepiece');
		tiles.hover(movable, clear);
		//Positions the background image
		if(i>=0 && i<=3){
			position(i,0);
		}
		else if(i>=4 && i<=7){
			position(i,1);
		}
		else if(i>=8 && i<=11){
			position(i, 2);	
		}
		else{
			position(i,3);	
		}
	}
	
	function clear(){
		$(this).addClass('puzzlepiece');
		$(this).removeClass('movablepiece');
	}
	
	//Shows if the tile is movable
	function movable(){
		if(!progress){
			var ptop = parseInt($(this).css('top'));              
			var pleft = parseInt($(this).css('left'));
			var etop = space[0]*100;
			var eleft = space[1]*100;
			var row = getY(ptop);
			var column = getX(pleft);
			var erow = getY(etop);
			var ecolumn = getX(eleft);
			if(row == erow){
				var diff = column - ecolumn;
				if (diff == 1 || diff == -1)
					$(this).addClass('movablepiece');
			}
			if(column == ecolumn) {	
				var diff = row - erow;
				if (diff == 1 || diff == -1)
					$(this).addClass('movablepiece');
			}
		}
	}

	$('.puzzlepiece').click(function () {
	progress = true;
		$('body').css('cursor', 'progress');                   
		var ptop = parseInt($(this).css('top'));               
		var pleft = parseInt($(this).css('left'));
		var emptytop = space[0]*100;
		var emptyleft = space[1]*100;;
		
		var row = getY(ptop);
		var column = getX(pleft);
		var emptyrow = getY(emptytop);
		var emptycolumn = getX(emptyleft);
		if (row == emptyrow) {
			var diff = column - emptycolumn;
			if (diff == 1 || diff == -1) {
				 //Block is moved with a some animation.
				$(this).animate({ left: emptyleft }, "fast");
				space[1] = space[1]+diff;
			}
		}
 
		else if (column == emptycolumn) {	
			var diff = row - emptyrow;
			if (diff == 1 || diff == -1) {
				 //Block is moved with a some animation.
				$(this).animate({ top: emptytop }, "fast");
				space[0] = space[0]+diff;
			}
		}		
		setTimeout(function () {
			$('body').css('cursor', 'default');
		}, 0);
		progress = false;
	});//

	function shuffle() {
		var last;
		$('body').css('cursor', 'progress');
		//Run the loop for 150 times to shuffle the board.
		var num=150;
		for(var i =0; i < num; i++){
		//Generate a random value between 1 to 15.                                     
			var randVal = parseInt(1 + (Math.random() * (14)));
			console.log("rand "+randVal);           
			var itop = parseInt($('div:nth-child('+randVal+')'+'.puzzlepiece').css('top'));             
			var ileft = parseInt($('div:nth-child('+randVal+')'+'.puzzlepiece').css('left'));           
			var iemptytop = space[0]*100;             
			var iemptyleft = space[1]*100;           
			console.log("top "+itop);
			console.log("left "+ileft);

			var irow = getY(itop);                          
			var icolumn = getX(ileft);
			var iemptyrow = getY(iemptytop);               
			var iemptycolumn = getX(iemptyleft);
			console.log(irow+" "+icolumn);
			console.log(iemptyrow+" "+iemptycolumn);
		 
			if (irow == iemptyrow && last != randVal) {        
				var diff = icolumn - iemptycolumn;
				if (diff == 1 || diff == -1) {
					$('div:nth-child('+randVal+')'+'.puzzlepiece').animate({ left: iemptyleft }, 50);
					$('div:nth-child('+randVal+')'+'.puzzlepiece').css('left', iemptyleft);
					space[1] = space[1]+diff;                
				}
			}
	 
			else if (icolumn == iemptycolumn && last != randVal) {   
				var diff = irow - iemptyrow;
				if (diff == 1 || diff == -1) {
					$('div:nth-child('+randVal+')'+'.puzzlepiece').animate({ top: iemptytop }, 50);
					$('div:nth-child('+randVal+')'+'.puzzlepiece').css('top', iemptytop);
					space[0] = space[0]+diff;                     
				}
			}
			last = randVal;
			$('body').css('cursor', 'default');
		}
	}

	function position(i, r){
		$(tiles[i]).css('left', (i-(r*4))*100+'px');
		$(tiles[i]).css('top', r*100+'px');
		$(tiles[i]).css('backgroundPosition', -(i-(r*4))*100+'px '+ -(r*100)+'px' );
	}
	//Function to check the column of image block.
	function getX(left){
		var column = left / 100;
		return column;
	}
	//Function to check the row of image block.
	function getY(top){
		var row = top / 100;
		return row;
	}
})