const N = 9;
var sudokuArray = [
                [3, 0, 6, 5, 0, 8, 4, 0, 0],
                [5, 2, 0, 0, 0, 0, 0, 0, 0],
                [0, 8, 7, 0, 0, 0, 0, 3, 1],
                [0, 0, 3, 0, 1, 0, 0, 8, 0],
                [9, 0, 0, 8, 6, 3, 0, 0, 5],
                [0, 5, 0, 0, 9, 0, 6, 0, 0],
                [1, 3, 0, 0, 0, 0, 2, 5, 0],
                [0, 0, 0, 0, 0, 0, 0, 7, 4],
                [0, 0, 5, 2, 0, 6, 3, 0, 0]
    ];

if (checkSudoku(sudokuArray) == true){
     console.log(sudokuArray);
}
else{
    console.log("Solution does not exist");
}

function checkSudoku(sudokuArray){ 
	var row, col;
    var check = findEmptyLocation(sudokuArray, row, col)
	if (!check.flag){
        return true; 
    }
	for (var value = 1; value <= 9; value++){
		if (alreadyFilled(sudokuArray, check.currentRow, check.currentCol, value)){
			sudokuArray[check.currentRow][check.currentCol] = value;
			if (checkSudoku(sudokuArray)){
                return true;
            }
			sudokuArray[check.currentRow][check.currentCol] = 0;
		}
	}
	return false;
}

function findEmptyLocation(sudokuArray, row, col){
	for (row = 0; row < N; row++){
        for (col = 0; col < N; col++){
            if (sudokuArray[row][col] == 0){
                var resJson = {
                    "currentRow" : row,
                    "currentCol" : col,
                    "flag": true
                }
                return resJson;
            }
        }
    }
	return false;
}

function alreadyFilled(sudokuArray, row, col, value){
	return !alreadyFilledRow(sudokuArray, row, value) &&
		!alreadyFilledCol(sudokuArray, col, value) &&
		!alreadyFilledInBox(sudokuArray, row - row%3 , col - col%3, value);
}

function alreadyFilledRow(sudokuArray, row, value){
	for (var col = 0; col < N; col++){
        if (sudokuArray[row][col] == value){
            return true;
        }
    }
	return false;
}

function alreadyFilledCol(sudokuArray, col, value){
	for (var row = 0; row < N; row++){
        if (sudokuArray[row][col] == value){
            return true;
        }	
    }
	return false;
}

function alreadyFilledInBox(sudokuArray, currentRow, currentCol, value){
	for (var row = 0; row < 3; row++){
        for (var col = 0; col < 3; col++){
            if (sudokuArray[row+currentRow][col+currentCol] == value){
                return true;
            }
        }
    }	
	return false;
}
