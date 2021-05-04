const Game = (() => {

    const symbolArr = [String.fromCharCode(10060), String.fromCharCode(9711)];

    const Player = (name, pieceSelection) => {
        this.playerName = name;
        this.symbol = pieceSelection;        
        const sayPiece = () => alert(`you play ${symbol}`);
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
        const playerOne = Player(prompt("Whats player 1's name?"), symbolArr[0]);
        if (!playerOne.name) {
            errorMessage();
        };
        playerOne.sayName();
        playerOne.sayPiece();
        console.log(playerOne);

        const playerTwo = Player(prompt("Whats player 2's name?"), symbolArr[1]);
        if (!playerTwo.name) {
            errorMessage();
        };      
        playerTwo.sayName();
        playerTwo.sayPiece();
        console.log(playerTwo);

        return { playerOne, playerTwo };
    })();  

    const displayBoard = (() => {
        
        let board = document.getElementById("gameboard");
        let gameCell = document.createElement('div');
        gameCell.classList.add('game-cell');
        for (let i = 0; i < 9; i++){
            let cellClone = gameCell.cloneNode();

            let symbol = symbolArr[Math.round(Math.random() * 1)];

            cellClone.addEventListener("click", function() {
                currentGame.board[i] = symbol;
                console.log(currentGame.board);
                cellClone.innerText = symbol;
            });

            cellClone.setAttribute("id", `cell-${i}`);            
            cellClone.classList.add("flex-center");
            board.appendChild(cellClone);         
        };
        return {
            errorMessage
        };
    })();
})();
