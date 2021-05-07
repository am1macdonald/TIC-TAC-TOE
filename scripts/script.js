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

        function render() {
            for (let i = 0; i < 9; i++){
                console.log(cacheDom.gridArray[i]);
                cacheDom.gridArray[i].innerHTML = board[i];
            };
        };

        return { board, render };
    })();    

    const gamePlay = (() => {
        const errorMessage = () => {
            alert("nice try pal...");
            location.reload();
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

        function nextTurn() {
            let element = event.currentTarget;
            let circleDiv = '<div class="outer-circle flex-center"><div class="inner-circle"></div></div>';
            if (turn === 0){
                turn = 1;
                console.log(gameboard.board[element.id] = playerOne.symbol);
                console.log(playerOne.symbol);
                playerOne.sayName();
            }
            else {
                turn = 0;
                console.log(gameboard.board[element.id] = circleDiv);
                element.innerHTML = circleDiv;
                console.log(playerTwo.symbol);
                playerTwo.sayName();
            };
            gameboard.render();
            element.removeEventListener('click', gamePlay.nextTurn);
        };

        function checkGameOver () {
            switch (gameboard.board){
                case (board[0] === board[1] && board[1] === board[2]):
                    console.log(`${board[0]} wins the game!`);
                    break;
                default:
                    nextTurn();
            };
        };

        return { nextTurn, playerOne, playerTwo };
    })(); 

    const cacheDom = (() => {
        const gridArray = Array.from(document.getElementsByClassName("game-cell"));
        return { gridArray };
    })();

    const bindEvents = (() => {
        cacheDom.gridArray.forEach(element => { element.addEventListener('click', gamePlay.nextTurn) });
    })();

    
    return { cacheDom, gamePlay }
})();
