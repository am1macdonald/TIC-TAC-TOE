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
        const addChoice = (choice, square) => {
            if (board[square].length === 0){
                board[square] = choice;
            } else alert ("nice try bub...");
        };
        return { 
            getBoard, 
            addChoice,
        };

    })();

    const displayManager = (() => {
        function render() {
            const circleDiv = '<div class="outer-circle flex-center"><div class="inner-circle"></div></div>';
            const xDiv = '<div class="x-div"></div><div class="x-div other-half"></div>';
            for (let i = 0; i <= 9; i++){
                if (gameboard.getBoard()[i] === symbolArr[0]) {
                    cacheDom.gridArray[i].innerHTML = xDiv;
                } else if (gameboard.getBoard()[i] === symbolArr[1]) {
                    cacheDom.gridArray[i].innerHTML = circleDiv;
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
            console.log(getIndexNum);
            let newNum;
            if (getIndexNum >= 7) {
                newNum = 0;
            } else {
                newNum = getIndexNum + 1;
            };
            e.target.src = avatarArr[newNum];
            e.target.dataset.avatarIndex  = newNum;
            console.log(newNum)
        };
        return {
            render,
            changeAvatar
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
        };

        const makePlayers = () => {
            console.log(cacheDom.playerOneInput, cacheDom.playerTwoInput);
            const playerOne = Player(cacheDom.playerOneInput, symbolArr[0]);
            if (!playerOne.getName) {
                errorMessage();
            };
            playerOne.sayName();
            playerOne.sayPiece();
            const playerTwo = Player(cacheDom.playerTwoInput, symbolArr[1]);
            if (!playerTwo.getName) {
                errorMessage();
            };
            playerTwo.sayName();
            playerTwo.sayPiece();

            return {
                playerOne,
                playerTwo
            };
        };       

        let turn = 0;

        function nextTurn(e) {
            let element = e.target;
            if (turn === 0){
                turn = 1;
                gameboard.addChoice(symbolArr[0], element.id);
            }
            else if (turn === 1) {
                turn = 0;
                gameboard.addChoice(symbolArr[1], element.id);
            };
            displayManager.render();
            element.removeEventListener('click', gamePlay.nextTurn);
            checkGameOver(gameboard.getBoard());

            console.log(gameboard.getBoard());
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
        return { nextTurn, setGameWindow };
    })(); 

    const cacheDom = (() => {
        const gridArray = Array.from(document.getElementsByClassName("game-cell"));
        const playerAvatars = Array.from(document.getElementsByClassName("player-avatar"));
        const firstPopup = document.getElementById("first-popup");
        const playerVsPlayerButton = document.getElementById("pvp");
        const playerVsComputerButton = document.getElementById("pvc");
        const playerOneInput = document.getElementById("player-one-name").value;
        const playerTwoInput = document.getElementById("player-two-name").value;
        const playerSubmitButton = document.getElementById("player-submit");
        const playerInputPopup = document.getElementById("player-select-popup");
        const playerNamePopup = document.getElementById("player-name-popup");
        const playerOneCard = document.getElementById("player-1-card");
        const playerTwoCard = document.getElementById("player-2-card");
        const playerOneNameDisplay = document.getElementById("player-one-name-display");
        const PlayerTwoNameDisplay = document.getElementById("player-two-name-display");
        return { 
            gridArray, 
            playerVsPlayerButton,
            playerVsComputerButton,
            firstPopup, 
            playerOneInput, 
            playerTwoInput, 
            playerSubmitButton,
            playerInputPopup,
            playerNamePopup,
            playerOneCard,
            playerTwoCard,
            playerAvatars,
            playerOneNameDisplay,
            PlayerTwoNameDisplay
        };
    })();

    const bindEvents = (() => {
        const bindGrid = () => {
            cacheDom.gridArray.forEach(element => { element.addEventListener('click', gamePlay.nextTurn) });
        };
        cacheDom.playerVsPlayerButton.addEventListener('click', function(){
            gamePlay.setGameWindow;
            cacheDom.firstPopup.style.display = "none";
            cacheDom.playerNamePopup.style.display = "flex";
        });
        cacheDom.playerSubmitButton.addEventListener( 'click', function (){
            gamePlay.makePlayers;
            displayManager.render;
            cacheDom.playerNamePopup.style.display = "none";
            bindGrid();         
        });
        cacheDom.playerVsComputerButton.addEventListener('click', function() {
            cacheDom.firstPopup.style.display = "none";
        });
        cacheDom.playerAvatars.forEach(element => { element.addEventListener('click', displayManager.changeAvatar ) });

        return { bindGrid };
    })();
    
    return { gamePlay, cacheDom };
})();
