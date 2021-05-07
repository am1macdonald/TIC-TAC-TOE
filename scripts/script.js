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
                gameboard.board[element.id] = playerOne.symbol;
                playerOne.sayName();
            }
            else {
                turn = 0;
                gameboard.board[element.id] = circleDiv;
                element.innerHTML = circleDiv;
                playerTwo.sayName();
            };
            gameboard.render();
            element.removeEventListener('click', gamePlay.nextTurn);
            checkGameOver(gameboard.board);
        };

        function checkGameOver(board) {
            console.log(board);
            if ( 
                (board[0].length > 0 && board[1] === board[0] && board[1] === board[2]) ||
                (board[3].length > 0 && board[3] === board[4] && board[4] === board[5])
            ){
                console.log('you win!')
            }
            else {};
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
