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
        const board = ['0','1','2','3','4','5','6','7','8'];
        const getBoard = () => board;
        const addChoice = (choice, square) => board[square] = choice;
        function render() {
            for (let i = 0; i < 9; i++){
                cacheDom.gridArray[i].innerHTML = board[i];
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
            const circleDiv = '<div class="outer-circle flex-center"><div class="inner-circle"></div></div>';
            if (turn === 0){
                turn = 1;
                gameboard.addChoice(playerOne.symbol, element.id);
                playerOne.sayName();
            }
            else {
                turn = 0;
                gameboard.addChoice(circleDiv, element.id);
                playerTwo.sayName();
            };
            gameboard.render();
            element.removeEventListener('click', gamePlay.nextTurn);
            checkGameOver(gameboard.getBoard());
        };

        function checkGameOver(board) {
            console.log(board);
            if ( 
                //Logic determines if all in row are the same and not empty
                (board[0].length > 0 && 
                (board[0] === board[1] && board[1] === board[2]) ||
                (board[0] === board[3] && board[3] === board[6]) ||
                (board[0] === board[4] && board[4] === board[8])) ||

                (board[3].length > 0 && board[3] === board[4] && board[4] === board[5]) ||

                (board[6].length > 0 && 
                (board[6] === board[7] && board[7] === board[8]) ||
                (board[6] === board[4] && board[4] === board[2])) ||

                (board[1].length > 0 && board[1] === board[4] && board[4] === board[7]) ||

                (board[2].length > 0 && board[2] === board[5] && board[5] === board[8])                
            ){
                alert('you win!')
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

    
    return { cacheDom, gamePlay, gameboard }
})();
