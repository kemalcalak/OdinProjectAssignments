// Gameboard Module
const Gameboard = (function() {
    let board = ["", "", "", "", "", "", "", "", ""]; 

    const getBoard = () => board;

    const setMark = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
        }
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { getBoard, setMark, resetBoard };
})();

// Player Factory Function
const Player = (name, mark) => {
    return { name, mark };
};

// Game Controller Module
const GameController = (function() {
    let players = [];
    let currentPlayerIndex = 0;

    const addPlayer = (name, mark) => {
        players.push(Player(name, mark));
    };

    const switchPlayer = () => {
        currentPlayerIndex = (currentPlayerIndex === 0) ? 1 : 0;
    };

    const getCurrentPlayer = () => players[currentPlayerIndex];

    const checkWinner = () => {
        const board = Gameboard.getBoard();
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6] 
        ];

        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; 
            }
        }

        return board.includes("") ? null : "draw"; 
    };

    const resetGame = () => {
        Gameboard.resetBoard();
        currentPlayerIndex = 0;
    };

    return { addPlayer, switchPlayer, getCurrentPlayer, checkWinner, resetGame };
})();

// Display Controller Module
const DisplayController = (function() {
    const boardElement = document.querySelector(".gameboard");
    const startButton = document.getElementById("start");
    const restartButton = document.getElementById("restart");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");

    const renderBoard = () => {
        const board = Gameboard.getBoard();
        boardElement.innerHTML = ""; 
        board.forEach((mark, index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = mark;
            cell.addEventListener("click", () => handleClick(index));
            boardElement.appendChild(cell);
        });
    };

    const handleClick = (index) => {
        const currentPlayer = GameController.getCurrentPlayer();
        const board = Gameboard.getBoard();

        if (board[index] !== "") {
            alert("This cell is already full!");
            return;
        }

        Gameboard.setMark(index, currentPlayer.mark);
        renderBoard();

        const winner = GameController.checkWinner();
        if (winner) {
            alert(winner === "draw" ? "It's a draw!" : `${currentPlayer.name} wins!`);
            GameController.resetGame();
            renderBoard();
        } else {
            GameController.switchPlayer();
        }
    };

    const startGame = () => {
        const player1Name = player1Input.value.trim();
        const player2Name = player2Input.value.trim();

        if (!player1Name || !player2Name) {
            alert("Please enter both player names!");
            return;
        }

        GameController.addPlayer(player1Name, "X");
        GameController.addPlayer(player2Name, "O");
        renderBoard();
    };

    startButton.addEventListener("click", startGame);
    restartButton.addEventListener("click", () => {
        GameController.resetGame();
        renderBoard();
    });

    return { renderBoard };
})();

DisplayController.renderBoard();
