const game = (() => {

    const gameElement = (() => { 
        const symbolArr = (() => {
            const arr = [String.fromCharCode(10060), String.fromCharCode(8413)];
            const getArr = () => {
                return arr;
            };
            return {
                getArr
            }
        })();
        const Player = (name, pieceSelection) => {
            const playerName = name;
            const getName = () => playerName;
            const symbol = pieceSelection;  
            const sayPiece = () => console.log(`you play ${symbol}`);
            const makeSelection = () => symbol;
            const sayName = () => console.log("Player: " + playerName);
            return { sayName, sayPiece, makeSelection, getName };
        };
        const gameboard = (() => {
            let board = ['','','','','','','','',''];
            const getBoard = () => board;
            const addChoice = (choice, square) => {
                if (board[square].length === 0){
                    board[square] = choice;
                } else alert ("nice try bub...");
            };
            const resetBoard = () => {
                board.forEach(function(thing, ind){
                    board[ind] = '';
                });
                console.log(board);
            };
            return { 
                getBoard, 
                addChoice,
                resetBoard
            };
        })();
        const playerManager = () => {
            const errorMessage = () => {
                alert("nice try pal...");
                location.reload();
            };
            const playerOne = Player(cacheDom.playerOneInput, symbolArr.getArr()[0]);
            if (playerOne.getName === "") {
                errorMessage();
            };
            playerOne.sayName();
            playerOne.sayPiece();
            const playerTwo = Player(cacheDom.playerTwoInput, symbolArr.getArr()[1]);
            if (!playerTwo.getName === "") {
                errorMessage();
            };
            playerTwo.sayPiece();
            playerTwo.sayName();
            return {
                playerOne,
                playerTwo
            };
        };
        return {
            Player,
            gameboard,
            symbolArr,
            playerManager
        };
    })();
    const displayManager = (() => {
        function render() {
            const circleDiv = '<div class="outer-circle flex-center"><div class="inner-circle"></div></div>';
            const xDiv = '<div class="x-div"></div><div class="x-div other-half"></div>';
            for (let i = 0; i <= 9; i++){
                if (gameElement.gameboard.getBoard()[i] === gameElement.symbolArr.getArr()[0]) {
                    cacheDom.gridArray[i].innerHTML = xDiv;
                }
                else if (gameElement.gameboard.getBoard()[i] === gameElement.symbolArr.getArr()[1]) {
                    cacheDom.gridArray[i].innerHTML = circleDiv;
                }
                else if (gameElement.gameboard.getBoard()[i] === '') {
                    cacheDom.gridArray[i].innerHTML = '';
                };
            };
        };
        const changeAvatar = (e) => {
            const avatarArr = [
                "assets/8-BIT/Color/SVG/8-bit pixel Avatar Illustrations-01.svg",
                "assets/8-BIT/Color/SVG/8-bit pixel Avatar Illustrations-02.svg",
                "assets/8-BIT/Color/SVG/8-bit pixel Avatar Illustrations-03.svg",
                "assets/8-BIT/Color/SVG/8-bit pixel Avatar Illustrations-04.svg",
                "assets/8-BIT/Color/SVG/8-bit pixel Avatar Illustrations-05.svg",
                "assets/8-BIT/Color/SVG/8-bit pixel Avatar Illustrations-06.svg",
                "assets/8-BIT/Color/SVG/8-bit pixel Avatar Illustrations-07.svg",
                "assets/8-BIT/Color/SVG/8-bit pixel Avatar Illustrations-08.svg"
            ];
            let getIndexNum = parseInt(e.target.dataset.avatarIndex);
            let newNum;
            if (getIndexNum >= 7) {
                newNum = 0;
            } else {
                newNum = getIndexNum + 1;
            };
            e.target.src = avatarArr[newNum];
            e.target.dataset.avatarIndex  = newNum;
        };

        const updatePlayerNames = () => {
            cacheDom.playerOneNameDisplay.innerHTML = gameElement.playerManager.playerOne.getName();
            cacheDom.playerTwoNameDisplay.innerHTML = gameElement.playerManager.playerTwo.getName();
        };

        return {
            render,
            changeAvatar,
            updatePlayerNames
        };

    })();
    const gamePlay = (() => {
        const setGameWindow = (e) => {
            if (e.currentTarget.id === 'pvp'){
                //make options appear
            } else if (e.currentTarget.id ==='pvc'){
                //make other options appear
            };
        };
        const turnTracker = (() => {
            let turn = 0;
            const getTurn = () => {
                return turn;
            };
            const setTurn = (num) => {
                if (num === 0 || num === 1){
                    turn = num;
                };
            };
            return {
                getTurn,
                setTurn
            };
        })();
        function nextTurn(e) {
            let element = e.target;
            if (turnTracker.getTurn() === 0){
                turnTracker.setTurn(1);
                gameElement.gameboard.addChoice(gameElement.symbolArr.getArr()[0], element.id);
            }
            else if (turnTracker.getTurn() === 1) {
                turnTracker.setTurn(0);
                gameElement.gameboard.addChoice(gameElement.symbolArr.getArr()[1], element.id);
            };
            displayManager.render();
            element.removeEventListener('click', gamePlay.nextTurn);

            console.log(gameElement.gameboard.getBoard());

            checkGameOver(gameElement.gameboard.getBoard());
        };

        const gameOver = (tie) => {
            if (tie === true){
                alert("It's a tie");
                return;
            }
            cacheDom.gridArray.forEach(element => { element.removeEventListener('click', gamePlay.nextTurn) });
            alert('you win!');

        };

        function checkGameOver(board) {
            if ( board[0].length > 0 ) {
                if ((board[0] === board[1] && board[1] === board[2]) ||
                (board[0] === board[3] && board[3] === board[6]) ||
                (board[0] === board[4] && board[4] === board[8])) {     
                    gameOver();               
                    return true;
                };
            };
            if ( board[3].length > 0 ){
                if (board[3] === board[4] && board[4] === board[5]) {
                    gameOver(); 
                    return true;
                };
            };
            if (board[6].length > 0 ) {
                if ((board[6] === board[7] && board[7] === board[8]) ||
                (board[6] === board[4] && board[4] === board[2])){
                    gameOver(); 
                    return true;
                };
            };
            if (board[1].length > 0 && board[1] === board[4] && board[4] === board[7] ||
                (board[2].length > 0 && board[2] === board[5] && board[5] === board[8])){
                    gameOver();              
                    return true;
            };
            if (board.every(x => x.length > 0)){
                gameOver(true);
                return;
            }
            else {
                return false;
            };
        };
        return { nextTurn, setGameWindow, turnTracker };
    })(); 

    const cacheDom = (() => {
        const gridArray = Array.from(document.getElementsByClassName("game-cell"));
        const playerAvatars = Array.from(document.getElementsByClassName("player-avatar"));
        const firstPopup = document.getElementById("first-popup");
        const playerVsPlayerButton = document.getElementById("pvp");
        const playerVsComputerButton = document.getElementById("pvc");
        const playerOneInput = document.getElementById("player-one-name").value;
        const playerTwoInput = document.getElementById("player-two-name").value;
        const startButton = document.getElementById("player-submit");
        const playerInputPopup = document.getElementById("player-select-popup");
        const playerNamePopup = document.getElementById("player-name-popup");
        const playerOneCard = document.getElementById("player-1-card");
        const playerTwoCard = document.getElementById("player-2-card");
        const playerOneNameDisplay = document.getElementById("player-one-name-display");
        const playerTwoNameDisplay = document.getElementById("player-two-name-display");
        const newGameButton = document.getElementById("new-game-button");
        const newPlayersButton = document.getElementById("new-players-button");
        const bindGrid = () => {
            gridArray.forEach(element => { element.addEventListener('click', gamePlay.nextTurn) });
        };
        playerVsPlayerButton.addEventListener('click', function(){
            gamePlay.setGameWindow;
            cacheDom.firstPopup.style.display = "none";
            cacheDom.playerNamePopup.style.display = "flex";
        });
        startButton.addEventListener( 'click', function (){
            gameElement.playerManager();
            cacheDom.playerNamePopup.style.display = "none";
            bindGrid();                 
        });
        playerVsComputerButton.addEventListener('click', function() {
            cacheDom.firstPopup.style.display = "none";
        });
        playerAvatars.forEach(element => { element.addEventListener('click', displayManager.changeAvatar ) });
        newGameButton.addEventListener('click', function(){
            gameElement.gameboard.resetBoard();
            cacheDom.bindGrid();
            displayManager.render();
        });
        newPlayersButton.addEventListener('click', function(){
            location.reload();
        });
        return {
            gridArray,
            firstPopup, 
            playerOneInput, 
            playerTwoInput,
            playerNamePopup,
            playerOneNameDisplay,
            playerTwoNameDisplay,
            bindGrid
        };
    })();
    return {
        gameElement
    };
})();
