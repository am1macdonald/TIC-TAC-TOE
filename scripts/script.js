const Game = (() => {

    const symbolArr = [String.fromCharCode(10060), String.fromCharCode(9711)];

    const Player = (name, pieceSelection) => {
        this.playerName = name;
        this.symbol = pieceSelection;        
        const sayPiece = () => alert(`you play ${symbol}`);
        const makeSelection = () => symbol;
        const sayName = () => console.log(playerName);
        return { sayName };
    };
    const Gameboard = () => {
        this.board = ['','','','','','','','',''];
        return { board };
    };    

    const NewRound = () => {
        let playerOne = Player(prompt("Whats ur name?"), prompt(`${symbolArr[0]} or ${symbolArr[1]}`));
        let playerTwo = Player(prompt("Whats ur name?"), prompt(`${symbolArr[0]} or ${symbolArr[1]}`));
        playerOne.sayName();
        playerTwo.sayName();
    };  

    const displayBoard = (() => {
        const currentGame = Gameboard();
        let board = document.getElementById("gameboard");
        let gameCell = document.createElement('div');
        gameCell.classList.add('game-cell');
        for (let i = 0; i < 9; i++){
            let cellClone = gameCell.cloneNode();

            let symbol = symbolArr[Math.round(Math.random() * 1)];

            cellClone.addEventListener("click", function() {
                currentGame.board[i] = symbol
                console.log(currentGame.board);
                cellClone.innerText = symbol;
            });

            cellClone.setAttribute("id", `cell-${i}`);            
            cellClone.classList.add("flex-center");
            board.appendChild(cellClone);         
        };
    })();
    
    return { NewRound };

})();
