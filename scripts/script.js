const Game = (() => {

    const round = () => {

    };

    const Game = () => {

        const round = () => {
    
        };

        const playEx = () => {

        };

        const playOh = () => {

        };
    
    };

    const displayBoard = (() => {
        let gameboard = document.getElementById("gameboard");
        let gameCell = document.createElement('div');
        gameCell.classList.add("game-cell");
        let symbolArr = [10060, 9711];
        for (let i = 1; i < 10; i++){
            let cellClone = gameCell.cloneNode();
            let symbol = String.fromCharCode(symbolArr[Math.round(Math.random() * 1)]);
            cellClone.setAttribute("id", `cell-${i}`);
            cellClone.innerText = symbol;
            cellClone.classList.add("flex-center")
            gameboard.appendChild(cellClone);         
        };

    })();

})();


const Player = (name, exOrOh) => {

    this.playerName = name;


};

