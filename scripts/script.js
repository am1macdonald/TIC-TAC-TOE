const game = (() => {

    const symbolArr = [String.fromCharCode(10060), String.fromCharCode(8413)];

    const Player = (name, pieceSelection) => {
        const playerName = name;
        const getName = () => playerName;
        const symbol = pieceSelection;        
        const sayPiece = () => console.log(`you play ${symbol}`);
        const makeSelection = () => symbol;
        const sayName = () => console.log("Player: " + playerName);
        return { sayName, sayPiece, makeSelection, getName, symbol };
    };

    const gameboard = (() => {
        const board = ['','','','','','','','',''];
        const getBoard = () => board;
        const addChoice = (choice, square) => board[square] = choice;
        function render() {
            const circleDiv = '<div class="outer-circle flex-center"><div class="inner-circle"></div></div>';
            const xDiv = '<div class="x-div"></div><div class="x-div other-half"></div>';
            for (let i = 0; i <= 9; i++){
                if (board[i] === symbolArr[0]) {
                    cacheDom.gridArray[i].innerHTML = xDiv;
                } else if (board[i] === symbolArr[1]) {
                    cacheDom.gridArray[i].innerHTML = circleDiv;
                };
            };
        };
        return { 
            getBoard, 
            addChoice, 
            render
        };
    })();    

    const gamePlay = (() => {
        const errorMessage = () => {
            alert("nice try pal...");
            location.reload();
        };

        const setGameWindow = (e) => {
            if (e.currentTarget.id === 'pvp'){

                //make options appear
            } else if (e.currentTarget.id ==='pvc'){
                //make other options appear
            };
            cacheDom.firstPopup.style.display = "none";
        };

        const playerOne = Player('A', symbolArr[0]);
        if (!playerOne.getName) {
            errorMessage();
        };
        playerOne.sayName();
        playerOne.sayPiece();

        const playerTwo = Player('B', symbolArr[1]);
        if (!playerTwo.getName) {
            errorMessage();
        };      
        playerTwo.sayName();
        playerTwo.sayPiece();

        let turn = 0;

        function nextTurn(e) {
            console.log(gameboard.getBoard());
            let element = e.target;
            if (turn === 0){
                turn = 1;
                gameboard.addChoice(symbolArr[0], element.id);
            }
            else {
                turn = 0;
                gameboard.addChoice(symbolArr[1], element.id);
            };
            gameboard.render();
            element.removeEventListener('click', gamePlay.nextTurn);
            checkGameOver(gameboard.getBoard());
        };

        const gameOver = () => {
            cacheDom.gridArray.forEach(element => { element.removeEventListener('click', gamePlay.nextTurn) });
            alert('you win!');

        };

        function checkGameOver(board) {
            if ( board[0].length > 0 ) {
                if ((board[0] === board[1] && board[1] === board[2]) ||
                (board[0] === board[3] && board[3] === board[6]) ||
                (board[0] === board[4] && board[4] === board[8])) {                    
                    gameOver();
                };
            };
            if ( board[3].length > 0 ){
                if (board[3] === board[4] && board[4] === board[5]) {
                    gameOver();
                };
            };
            if (board[6].length > 0 ) {
                if ((board[6] === board[7] && board[7] === board[8]) ||
                (board[6] === board[4] && board[4] === board[2])){
                    gameOver();
                };
            };
            if (board[1].length > 0 && board[1] === board[4] && board[4] === board[7] ||
                (board[2].length > 0 && board[2] === board[5] && board[5] === board[8])             
            ){
                gameOver()
            };
        };
        return { nextTurn, playerOne, playerTwo, setGameWindow };
    })(); 

    const cacheDom = (() => {
        const gridArray = Array.from(document.getElementsByClassName("game-cell"));
        const firstPopup = document.getElementById("first-popup");
        const firstPopupButtons = Array.from(document.getElementsByClassName("popup-button"));
        const playerOneInput = document.getElementById("player-one-name");
        const playerTwoInput = document.getElementById("player-two-name");
        const playerSubmitButton = document.getElementById("player-submit-button");
        return { gridArray, firstPopupButtons, firstPopup, playerOneInput, playerTwoInput };
    })();

    const bindEvents = (() => {
        cacheDom.gridArray.forEach(element => { element.addEventListener('click', gamePlay.nextTurn) });
        cacheDom.firstPopupButtons.forEach(element => { element.addEventListener('click', gamePlay.setGameWindow) });
    })();

    
    return { gamePlay}
})();
