/**
 * Created by Vishal on 2/27/2016.
 */
function myfunction(){
    console.log('myfunction was called');
    var board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    var score = 0;
    var highScore = 0;
    var str;
   // displayBoard();
    var mapClass = {
        '0' : 'zero',
        '2' : 'two',
        '4' : 'four',
        '8': 'eight',
        '16' : 'sixteen',
        '32' : 'thirtytwo',
        '64' : 'sixtyfour',
        '128' : 'onetwentyeight',
        '256' : 'twofiftysix',
        '512' : 'fiveonetwo',
        '1024' : 'onezerotwofour',
        '2048' : 'twozerofoureight'
    };

    var mapTile = {
        '00' : 'first',
        '01' : 'second',
        '02' : 'third',
        '03' : 'fourth',
        '10' : 'fifth',
        '11' : 'sixth',
        '12' : 'seventh',
        '13' : 'eighth',
        '20' : 'ninth',
        '21' : 'tenth',
        '22' : 'eleventh',
        '23' : 'twelfth',
        '30' : 'thirteenth',
        '31' : 'fourteenth',
        '32' : 'fifteenth',
        '33' : 'sixteenth'
    };


    /*
    Function to display the board.
    Here we convert the tile index (i,j) into string and then use to get the class of tile by using
    mapClass[tileindex to string]
    After this step all the tiles will have classes as 'tile' 'score' 'right and/or bottom'
     */
    function displayBoard(){
        for(var i = 0;i < 4;i++){
            for(var j = 0;j < 4;j++){
                var tempi = i;
                var tempj = j;
                var first = tempi.toString();
                var second = tempj.toString();
                var tileKey = first.concat(second);
                tileKey.toString();
                var tile = document.getElementById(mapTile[tileKey]);
               // console.log(mapTile[tileKey],tile);
                var tempBoard = board[i][j];
                var number = tempBoard.toString();
                if(tileKey == '03' || tileKey == '13' || tileKey == '23'){
                    var toInsertAttr = "tile right "+mapClass[number];
                    tile.setAttribute("class",toInsertAttr);
                }
                else if(tileKey == '30' || tileKey == '31' || tileKey == '32'){
                    var toInsertAttr = "tile bottom " + mapClass[number];
                    tile.setAttribute("class",toInsertAttr);
                }
                else if(tileKey == '33'){
                    var toInsertAttr = "tile right bottom " + mapClass[number];
                    tile.setAttribute("class",toInsertAttr);
                }
                else {
                    var toInsertAttr = "tile " + mapClass[number];
                    tile.setAttribute("class",toInsertAttr);
                }
                tile.setAttribute("class",toInsertAttr);
                //console.log(i,j,number,toInsertAttr);
            }
        }

        if(highScore < score){
            localStorage.highScore = score;
        }
        highScore = localStorage.highScore;
        var scoreTile = document.getElementById('scoreTile');
        var sc = score.toString();
        var highSc = highScore.toString();
        scoreTile.innerHTML = sc;
        var highScoreTile = document.getElementById('highScoreTile');
        highScoreTile.innerHTML = highSc;
        console.log("Dispplay board called!!!\n",score,highScore);
    }

    /*
    this function gives a random coordinate 'x' and 'y' with board[x][y] = 0
    here we create a arr of all the board indices x and y (we create a string of 'x' + 'y') with value = 0
    finally if there is no index with board value = 0 then we just return object with x any = -1
    else we use random function to get the arr index between 0 and length - 1 and then we access the 'x' using charAt(0) and 'y' using charAt(1)
    */
    function getRandomTile(){
        var arr = [];
        for(var i = 0;i<4;i++){
            for(var j = 0;j<4;j++){
                if(board[i][j] == 0){
                    var first = i.toString();
                    var second = j.toString();
                    arr.push(first + second);
                }
            }
        }
        //console.log('Arr is : ',arr);
        if(arr.length == 0){
            var endObj = {
                'x' : -1,
                'y' : -1
            };
            return endObj;
        }
        else{
            var randNum = Math.floor(Math.random() * arr.length);
            var obj = {
                'x' : arr[randNum].charAt(0),
                'y': arr[randNum].charAt(1)
            };
            return obj;
        }
    }

    /*
    localStorage: allows you to access a local Storage object. localStorage is similar to 'sessionStorage'. The only difference
        is that, while data stored in localStorage has no expiration time, data stored in sessionStorage is cleared when
        the browsing session ends - that is, when the browser is closed ;)

        JSON.stringify(): converts a javascript value to a JSON string, optionally replacing values if a replace
        function is specified, or optionally including only the specified properties if a replacer array is specified

         In this function we randomly choose two positions in the board and insert 2/4 in them with '2' being occurring
         with more probability. After that we maintain a previous state of the game to allow undo function to make changes.
         We set te display of gameOver div and won div to 'none' and then display the initial board.
     */
    function init(){
        board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        var randomTile = getRandomTile();
        var i = randomTile.x;
        var j = randomTile.y;
        board[i][j] = Math.random() > 0.8 ? 4 : 2;
        randomTile = getRandomTile();
        var i2 = randomTile.x;
        var j2 = randomTile.y;
        board[i2][j2] = Math.random() > 0.8 ? 4 : 2;
        str = JSON.stringify(board);
        localStorage.previousState = str;
        localStorage.score = 0;
        /*
            Here we are updating localStorage.highScore to '0' every time we refresh the page.
        */
        localStorage.highScore = highScore;
        var ele = document.getElementById('gameOver');
        ele.style.display = 'none';
        var ele2 = document.getElementById('win');
        ele2.style.display = 'none';
        window.addEventListener('keydown',move);
        var newGame = document.getElementById('newGame');
        var undo = document.getElementById('undo');
        newGame.addEventListener('click',init);
        undo.addEventListener('click',onUndo);
        score = 0;
        displayBoard();
     }



    function moveLeft(){
        str = JSON.stringify(board);
        localStorage.previousState = str;
        localStorage.score = score;
        localStorage.highScore = highScore;
        if(areMovesAvailable()){
            console.log('MoveLeft is called');
            // flag for knowing weather we have added at a position in the row!!
            var added = new Array();
            added.push(0);
            added.push(0);
            added.push(0);
            added.push(0);
            for(var i=0;i<4;i++){
                added[0] = added[1] = added[2] = added[3] = 0;
                for(var j = 1;j<4;j++){
                    //console.log(i,j);
                    //if immediate left of a board contains same element
                    if(board[i][j] == board[i][j - 1] && board[i][j-1] != 0){
                        //if we haven't added any two elements until now in the row i
                        if(!added[j-1]){
                            board[i][j-1] = 2 * board[i][j - 1];
                            board[i][j] = 0;
                            score = score + board[i][j-1];
                            added[j-1] = 1;
                        }
                        //if we have added elements in the row before
                        else continue;
                    }
                    //if immediate left element is non zero and not equal to the given element
                    else if(board[i][j-1] != board[i][j] && board[i][j-1] != 0) continue;
                    //if immediate left element is zero
                    else if(board[i][j-1] == 0 && board[i][j] != 0) {
                        //temp denotes the number of index before reaching 0 in the given row
                        var temp = j - 1;
                        while (temp > 0 && board[i][temp] == 0)temp--;
                        //we have reached the starting or 0th element in the row i and it is 0 then we replace this element with
                        //our original element at (i,j)
                        if (temp == 0 && board[i][temp] == 0) {
                            board[i][temp] = board[i][j];
                            board[i][j] = 0;
                        }
                        //we have encountered a non zero element before or at the 0th element in the row
                        else {
                            //make the first zero element in the row equal to zero
                            board[i][temp + 1] = board[i][j];
                            board[i][j] = 0;
                            //if this non zero element is equal to the original element at(i,j)
                            if (board[i][temp] == board[i][temp + 1] && !added[temp]) {
                                board[i][temp] = 2 * board[i][temp + 1];
                                board[i][temp + 1] = 0;
                                score = score + board[i][temp];
                                added[temp] = 1;
                            }
                        }
                    }
                    else{
                        continue;
                    }
                }
            }
            //add new tile in the board
            var randomTile = getRandomTile();
            var i = randomTile.x;
            var j = randomTile.y;
            if(i != -1) {
                board[i][j] = Math.random() > 0.8 ? 4 : 2;
                //we display board after moving left and making the necessary changes to the board and after adding new
                //tile in the board
                displayBoard();
            }
            /*
                We cannot play by moving left but there can be other moves.
                So just return.
            */
            else if(areMovesAvailable()){
                console.log('Dude!!!!');
                window.addEventListener('keydown',move);
                return;
            }
            else{
                console.log('Game Over!!!');
                onGameOver();
            }
        }
        else{
                console.log('Game Over!!!');
                onGameOver();
            }
            return;
    }


    function moveRight(){
        str = JSON.stringify(board);
        localStorage.previousState = str;
        localStorage.score = score;
        localStorage.highScore = highScore;
        if(areMovesAvailable()){
            console.log('MoveRight is called');
            var added = new Array();
            added.push(0);
            added.push(0);
            added.push(0);
            added.push(0);
            for(var i=0;i<4;i++){
                added[0] = added[1] = added[2] = added[3] = 0;
                for(var j = 2;j>=0;j--){
                    //if immediate right of a board contains same element
                    if(board[i][j] == board[i][j + 1] && board[i][j + 1] != 0){
                        //if we haven't added any two elements until now in the row i
                        if(!added[j+1]){
                            board[i][j+1] = 2 * board[i][j];
                            board[i][j] = 0;
                            score = score + board[i][j+1];
                            added[j+1] = 1;
                        }
                        //if we have added elements in the row before
                        else continue;
                    }
                    //if immediate right element is non zero and not equal to the given element
                    else if(board[i][j+1] != board[i][j] && board[i][j+1] != 0) continue;
                    //if immediate right element is zero
                    else if(board[i][j+1] == 0 && board[i][j] != 0) {
                        //temp denotes the number of index before reaching 3 in the given row
                        var temp = j + 1;
                        while (temp < 3 && board[i][temp] == 0)temp++;
                        //we have reached the ending or 3rd element in the row i and it is 0 then we replace this element with
                        //our original element at (i,j)
                        if (temp == 3 && board[i][temp] == 0) {
                            board[i][temp] = board[i][j];
                            board[i][j] = 0;
                        }
                        //we have encountered a non zero element before or at the 3rd element in the row
                        else {
                            //make the first zero element in the row equal to zero
                            board[i][temp - 1] = board[i][j];
                            board[i][j] = 0;
                            //if this non zero element is equal to the original element at(i,j)
                            if (board[i][temp] == board[i][temp - 1] && !added[temp]) {
                                board[i][temp] = 2 * board[i][temp - 1];
                                board[i][temp - 1] = 0;
                                score = score + board[i][temp];
                                added[temp] = 1;
                            }
                        }
                    }
                    else{
                        continue;
                    }
                }
            }
            //add new tile in the board
            var randomTile = getRandomTile();
            var i = randomTile.x;
            var j = randomTile.y;
            if(i != -1) {
                board[i][j] = Math.random() > 0.8 ? 4 : 2;
                //we display board after moving left and making the necessary changes to the board and after adding new
                //tile in the board
                displayBoard();
            }
            else if(areMovesAvailable()){
                console.log('Dude!!!!');
                window.addEventListener('keydown',move);
                return;
            }
            else{
                console.log('Game Over!!!');
                onGameOver();
            }
        }
        else{
                console.log('Game Over!!!');
                onGameOver();
            }
            return;
    }


    function moveUp(){
        str = JSON.stringify(board);
        localStorage.previousState = str;
        localStorage.score = score;
        localStorage.highScore = highScore;
        if(areMovesAvailable()){
            console.log('MoveUp is called');
            var added = new Array();
            added.push(0);
            added.push(0);
            added.push(0);
            added.push(0);
            for(var i=0;i<4;i++){
                added[0] = added[1] = added[2] = added[3] = 0;
                for(var j = 1;j<4;j++){
                    //if immediate upper of a board contains same element
                    if(board[j][i] == board[j - 1][i] && board[j-1][i] != 0){
                        //if we haven't added any two elements until now in the column i
                        if(!added[j-1]){
                            board[j-1][i] = 2 * board[j][i];
                            board[j][i] = 0;
                            score = score + board[j-1][i];
                            added[j-1] = 1;
                        }
                        //if we have added elements in the col before
                        else continue;
                    }
                    //if immediate upper element is non zero and not equal to the given element
                    else if(board[j-1][i] != board[j][i] && board[j-1][i] != 0) continue;
                    //if immediate upper element is zero
                    else if(board[j-1][i] == 0 && board[j][i] != 0) {
                        //temp denotes the number of index before reaching 0 in the given col
                        var temp = j - 1;
                        while (temp > 0 && board[temp][i] == 0)temp--;
                        //we have reached the starting or 0th element in the col i and it is 0 then we replace this element with
                        //our original element at (j,i)
                        if (temp == 0 && board[temp][i] == 0) {
                            board[temp][i] = board[j][i];
                            board[j][i] = 0;
                        }
                        //we have encountered a non zero element before or at the 0th element in the col
                        else {
                            //make the first zero element in the row equal to the given element
                            board[temp + 1][i] = board[j][i];
                            board[j][i] = 0;
                            //if this non zero element is equal to the original element at(i,j)
                            if (board[temp][i] == board[temp + 1][i] && !added[temp]) {
                                board[temp][i] = 2 * board[temp + 1][i];
                                board[temp + 1][i] = 0;
                                score = score + board[temp][i];
                                added[temp] = 1;
                            }
                        }
                    }
                    else{
                        continue;
                    }
                }
            }
            //add new tile in the board
            var randomTile = getRandomTile();
            var i = randomTile.x;
            var j = randomTile.y;
            if(i != -1) {
                board[i][j] = Math.random() > 0.8 ? 4 : 2;
                //we display board after moving left and making the necessary changes to the board and after adding new
                //tile in the board
                displayBoard();
            }
            else if(areMovesAvailable()){
                console.log('Dude!!!!');
                window.addEventListener('keydown',move);
                return;
            }
            else{
                console.log('Game Over!!!');
                onGameOver();
            }
        }
        else{
                console.log('Game Over!!!');
                onGameOver();
            }
            return;
    }



    function moveDown(){
        str = JSON.stringify(board);
        localStorage.previousState = str;
        localStorage.score = score;
        localStorage.highScore = highScore;
        if(areMovesAvailable()){
            console.log('MoveDown is called');
            var added = new Array();
            added.push(0);
            added.push(0);
            added.push(0);
            added.push(0);
            for(var i=0;i<4;i++){
                added[0] = added[1] = added[2] = added[3] = 0;
                for(var j = 2;j>=0;j--){
                    //if immediate lower of a board contains same element
                    if(board[j][i] == board[j + 1][i] && board[j+1][i] != 0){
                        //if we haven't added any two elements until now in the column i
                        if(!added[j+1]){
                            board[j+1][i] = 2 * board[j][i];
                            board[j][i] = 0;
                            score = score + board[j+1][i];
                            added[j+1] = 1;
                        }
                        //if we have added elements in the col before
                        else continue;
                    }
                    //if immediate lower element is non zero and not equal to the given element
                    else if(board[j+1][i] != board[j][i] && board[j+1][i] != 0) continue;
                    //if immediate lower element is zero
                    else if(board[j+1][i] == 0 && board[j][i] != 0) {
                        //temp denotes the number of index before reaching 3 in the given col
                        var temp = j + 1;
                        while (temp < 3 && board[temp][i] == 0)temp++;
                        //we have reached the ending or 3rd element in the col i and it is 0 then we replace this element with
                        //our original element at (j,i)
                        if (temp == 3 && board[temp][i] == 0) {
                            board[temp][i] = board[j][i];
                            board[j][i] = 0;
                        }
                        //we have encountered a non zero element before or at the 3rd element in the col
                        else {
                            //make the first zero element in the col equal to the given element
                            board[temp - 1][i] = board[j][i];
                            board[j][i] = 0;
                            //if this non zero element is equal to the original element at(i,j)
                            if (board[temp][i] == board[temp - 1][i] && !added[temp]) {
                                board[temp][i] = 2 * board[temp - 1][i];
                                board[temp - 1][i] = 0;
                                score = score + board[temp][i];
                                added[temp] = 1;
                            }
                        }
                    }
                    else{
                        continue;
                    }
                }
            }
            //add new tile in the board
            var randomTile = getRandomTile();
            var i = randomTile.x;
            var j = randomTile.y;
            if(i != -1) {
                board[i][j] = Math.random() > 0.8 ? 4 : 2;
                //we display board after moving left and making the necessary changes to the board and after adding new
                //tile in the board
                displayBoard();
            }
            else if(areMovesAvailable()){
                console.log('Dude!!!!');
                window.addEventListener('keydown',move);
                return;
            }
            else{
                console.log('Game Over!!!');
                onGameOver();
            }
        }
        else{
                console.log('Game Over!!!');
                onGameOver();
            }
            return;
    }



    function areMovesAvailable(){
        var checkTile = getRandomTile();
        //if random tile gives -1 i.e. no free board or board with value = 0
        if(checkTile.x == -1){
            for(var i = 0;i<4;i++){
                for(var j = 0;j<4;j++){
                    if(i > 0){
                        if(board[i-1][j] == board[i][j])return true;
                    }
                    if(i < 3){
                        if(board[i+1][j] == board[i][j])return true;
                    }
                    if(j > 0){
                        if(board[i][j-1] == board[i][j])return true;
                    }
                    if(j < 3){
                        if(board[i][j+1] == board[i][j])return true;
                    }
                }
            }
            return false;
        }
        return true;
    }


    /*
    JSON.parse() parses a string as JSON, optionally transforming the value produced by parsing.
    Formally JSON.stringify() transforms a value to string and JSON.parse() parses it back to the value :D
     */

    function onUndo(){
        console.log('undo clicked');
        board = JSON.parse(localStorage.previousState);
        score = JSON.parse(localStorage.score);
        highScore = localStorage.highScore;
        displayBoard();
    }


/*

    handling multiple events with single addEventListner() :
     -----------------------------------------------------------------------------********************-------------------------------------------------------------------------------
       1. ('click keydown'.split(' ')).forEach(function(e){
            window.addEventListner(e,function(event){
                if(event.keyCode != undefined)console.log(event.keyCode);
                else console.log('mouse');
            })
        });



       2. function addeventListnerMulti(e,s,fn){
            var evts = s.split(' ');
            for(var i = 0;i<evts.length;i++){
                e.addEventListner(evts[i],fn);
            }
       }

       addEventListnerMulti(window,'keydown click', function(){
       });
    ------------------------------------------------------------------------------********************--------------------------------------------------------------------------------
 */
    function onGameOver(){
        console.log('onGameOver called!!!');
        window.addEventListener('keydown',move);
        var ele = document.getElementById('gameOver');
        ele.style.display = 'block';
        var tryAgainButton = document.getElementById('tryAgain');
        ('click keydown'.split(' ')).forEach(function(e){
            tryAgainButton.addEventListener(e,function(event){
                //event -> Mouse event or keyDown event
                //e -> click or keydown
                //key pressed is 'Eneter'
               if(event.keyCode == 13) init();
               //We have clicked the mouse
                else if(e == 'click')init();
            });
        });
    }


    function on2048(){
        window.removeEventListener('keydown',move);
        var ele = document.getElementById('win');
        ele.style.display = 'block';
        var afterWinTryAgainButton = document.getElementById('afterWinTryAgain');
        afterWinTryAgainButton.addEventListener('click',init);
    }



    function is2048(){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(board[i][j] == 2048)return true;
            }
        }
        return false;
    }


    function move(e){
        if(is2048()){
            on2048();
        }
        else{
            switch(e.keyCode){
                case 37: moveLeft(); break;
                case 38: moveUp(); break;
                case 39: moveRight(); break;
                case 40: moveDown(); break;
            }
        }
        return;
    }


    init();

}
window.addEventListener('load',myfunction);




















