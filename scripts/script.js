const game = (() => {

    const symbolArr = [String.fromCharCode(10060), String.fromCharCode(9711)];

    const Player = (name, pieceSelection) => {
        const playerName = name;
        const symbol = pieceSelection;        
        const sayPiece = () => console.log(`you play ${symbol}`);
        const makeSelection = () => symbol;
        const sayName = () => console.log("Player: " + playerName);
        return { sayName, sayPiece, makeSelection, name };
    };

    const gameboard = (() => {
        const board = ['','','','','','','','',''];
        return { board };
    })();    

    const gamePlay = (() => {
        const errorMessage = () => {
            alert("nice try pal...");
            location.reload();
        };


        const playerOne = Player('A', symbolArr[0]);
        if (!playerOne.name) {
            errorMessage();
        };
        playerOne.sayName();
        playerOne.sayPiece();

        const playerTwo = Player('B', symbolArr[1]);
        if (!playerTwo.name) {
            errorMessage();
        };      
        playerTwo.sayName();
        playerTwo.sayPiece();

        function nextTurn(index) {
            let turn = 0;
            if (turn === 0){
                turn = 1;
                console.log('one')
                playerOne.sayName();
            }
            else {
                turn = 0;
                console.log('two')
                playerTwo.sayName();
            };
            console.log(index);
        };

        const checkGameOver = () => {
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
        gridArray = Array.from(document.getElementsByClassName("game-cell"));
    })();

    const bindEvents = (() => {
        gridArray.forEach(element => {
            element.addEventListener('click', () => { gamePlay.nextTurn(element.id) });
        });
    })();

    const displayController = (() => {

        const render = () => {};
        
    })();
    return { cacheDom, gamePlay }
})();
