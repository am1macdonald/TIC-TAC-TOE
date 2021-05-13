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

        const vsDecider = () => {

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
            console.log(gameboard.getBoard());
            let element = event.currentTarget;
            const circleDiv = '<div class="outer-circle flex-center"><div class="inner-circle"></div></div>';
            const xDiv = '<div class="x-div"></div><div class="x-div other-half"></div>';
            if (turn === 0){
                turn = 1;
                gameboard.addChoice(xDiv, element.id);
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
            if ( board[0].length > 0 ) {
                if ((board[0] === board[1] && board[1] === board[2]) ||
                (board[0] === board[3] && board[3] === board[6]) ||
                (board[0] === board[4] && board[4] === board[8])) {                    
                    alert('you win!');
                };
            };
            if ( board[3].length > 0 ){
                if (board[3] === board[4] && board[4] === board[5]) {
                    alert('you win!');
                };
            };
            if (board[6].length > 0 ) {
                if ((board[6] === board[7] && board[7] === board[8]) ||
                (board[6] === board[4] && board[4] === board[2])){
                    alert('you win!');
                };
            };
            if (board[1].length > 0 && board[1] === board[4] && board[4] === board[7] ||
                (board[2].length > 0 && board[2] === board[5] && board[5] === board[8])             
            ){
                alert('you win!')
            };
        };
        return { nextTurn, playerOne, playerTwo };
    })(); 

    const cacheDom = (() => {
        const gridArray = Array.from(document.getElementsByClassName("game-cell"));
        const popupButtons = Array.from(document.getElementsByClassName("popup-button"))
        return { gridArray, popupButtons };
    })();

    const bindEvents = (() => {
        cacheDom.gridArray.forEach(element => { element.addEventListener('click', gamePlay.nextTurn) });
        cacheDom.popupButtons.forEach(element => { element.addEventListener('click', ) })
    })();

    
    return { cacheDom, gamePlay, gameboard }
})();
