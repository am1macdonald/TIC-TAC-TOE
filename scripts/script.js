(function() {

    const symbolArr = [String.fromCharCode(10060), String.fromCharCode(9711)];

    const Player = (name, pieceSelection) => {
        this.playerName = name;
        this.symbol = pieceSelection;        
        const sayPiece = () => console.log(`you play ${symbol}`);
        const makeSelection = () => symbol;
        const sayName = () => console.log("Player: " + playerName);
        return { sayName, sayPiece, makeSelection, name };
    };

    const gameboard = (() => {
        this.board = ['','','','','','','','',''];
        return { board };
    })();    

    const gamePlay = (() => {
        const errorMessage = () => {
            alert("nice try pal...");
            location.reload();
        };

        function nextTurn(element) {

            console.log(element.id);
        };

        const playerOne = Player("A", symbolArr[0]);
        if (!playerOne.name) {
            errorMessage();
        };
        playerOne.sayName();
        playerOne.sayPiece();

        const playerTwo = Player("B", symbolArr[1]);
        if (!playerTwo.name) {
            errorMessage();
        };      
        playerTwo.sayName();
        playerTwo.sayPiece();

        const checkGameOver = () => {
            switch (gameboard.board){
                case (board[0] === board[1] && board[1] === board[2]):
                    console.log(`${board[0]} wins the game!`);
                    break;
                default:
                    nextTurn();
            };
        };

        return { nextTurn };
    })(); 

    const cacheDom = (() => {
        gridArray = Array.from(document.getElementsByClassName("game-cell"));
    })();

    const bindEvents = (() => {
        gridArray.forEach(element => {
            element.addEventListener('click', () => { gamePlay.nextTurn(element) });
        });
    })();

    const displayController = (() => {

        const render = () => {};
        
    })();
    return { cacheDom }
})();
