const game = (() => {
    const gameElements = (() => {
        const symbolArr = (() => {
            const arr = [String.fromCharCode(10060), String.fromCharCode(8413)];
            const getArr = () => {
                return arr;
            };
            return {
                getArr
            }
        })();
        
        const Player = (pieceSelection) => {
            let playerName = "";
            let nameSet = 0;
            // like a burn-in, stops the Player's name from being changed after setting.
            const setName = (name) => {
                if (nameSet === 0 && name != ""){
                    playerName = name;
                    nameSet = 1;
                };     
            };
            const getName = () => playerName;
            const symbol = pieceSelection;
            const makeSelection = () => symbol;
            return { makeSelection, getName, setName };
        };

        const playerOne = Player(symbolArr.getArr[0]);
        const playerTwo = Player(symbolArr.getArr[1]);

        const errorMessage = () => {
            alert("nice try pal...");
            location.reload();
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
            };
            return { 
                getBoard, 
                addChoice,
                resetBoard
            };
        })();

        function render() {
            const circleDiv = '<div class="outer-circle flex-center"><div class="inner-circle"></div></div>';
            const xDiv = '<div class="x-div"></div><div class="x-div other-half"></div>';
            for (let i = 0; i <= 9; i++){
                if (gameElements.gameboard.getBoard()[i] === gameElements.symbolArr.getArr()[0]) {
                    cacheDom.gridArray[i].innerHTML = xDiv;
                }
                else if (gameElements.gameboard.getBoard()[i] === gameElements.symbolArr.getArr()[1]) {
                    cacheDom.gridArray[i].innerHTML = circleDiv;
                }
                else if (gameElements.gameboard.getBoard()[i] === '') {
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
            cacheDom.playerOneNameDisplay.innerHTML = gameElements.playerOne.getName();
            cacheDom.playerTwoNameDisplay.innerHTML = gameElements.playerTwo.getName();
        };
        return {
            Player,
            playerOne,
            playerTwo,
            gameboard,
            symbolArr,
            render,
            changeAvatar,
            updatePlayerNames,
            errorMessage
        };
    })();
    const gamePlay = (() => {
        const setGameWindow = (e) => {
            if (e.currentTarget.id === 'pvp'){
                cacheDom.firstPopup.style.display = "none";
                cacheDom.playerNamePopup.style.display = "flex";
            } else if (e.currentTarget.id ==='pvc'){
                alert("Not Yet Available!");
            };
        };
        let lastTurn = '';
        let turn = 0;
        function nextTurn(e) {            
            let element = e.target;            
            if (turn === 0){
                turn = 1;
                gameElements.gameboard.addChoice(gameElements.symbolArr.getArr()[0], element.id);
                lastTurn = gameElements.playerOne.getName();
            }
            else if (turn === 1) {
                turn = 0;
                gameElements.gameboard.addChoice(gameElements.symbolArr.getArr()[1], element.id);
                lastTurn = gameElements.playerTwo.getName();
            };
            gameElements.render();
            element.removeEventListener('click', gamePlay.nextTurn);
            checkGameOver(gameElements.gameboard.getBoard());
        };
        const gameOver = (tie) => {
            if (tie === true){
                alert("It's a tie");
                return;
            }
            else {
            cacheDom.gridArray.forEach(element => { element.removeEventListener('click', gamePlay.nextTurn) });
            alert(`${lastTurn} wins!`);
            };
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
        return { nextTurn, setGameWindow };
    })(); 

    const cacheDom = (() => {
        const gridArray = Array.from(document.getElementsByClassName("game-cell"));
        const playerAvatars = Array.from(document.getElementsByClassName("player-avatar"));
        const firstPopup = document.getElementById("first-popup");
        const playerVsPlayerButton = document.getElementById("pvp");
        const playerVsComputerButton = document.getElementById("pvc");
        const playerOneInput = document.getElementById("player-one-name");
        playerOneInput.value = "";
        const playerTwoInput = document.getElementById("player-two-name");
        playerTwoInput.value = "";
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
        playerVsPlayerButton.addEventListener('click', gamePlay.setGameWindow);
        startButton.addEventListener( 'click', function (){
            gameElements.playerOne.setName(playerOneInput.value);
            gameElements.playerTwo.setName(playerTwoInput.value);
            cacheDom.playerNamePopup.style.display = "none";
            bindGrid();
            gameElements.updatePlayerNames();
        });
        playerVsComputerButton.addEventListener('click', gamePlay.setGameWindow);
        playerAvatars.forEach(element => { element.addEventListener('click', gameElements.changeAvatar ) });
        newGameButton.addEventListener('click', function(){
            gameElements.gameboard.resetBoard();
            cacheDom.bindGrid();
            gameElements.render();
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
            bindGrid,
        };
    })();
    return {
        gameElements,
        cacheDom,
        gamePlay
    };
})();
