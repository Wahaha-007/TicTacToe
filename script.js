const player = () => {

    let win = 0;

    function getWin() {
        return win;
    }

    function setWin() {
        win++;
    }

    return { getWin, setWin };
};


let gBoard = (function () {
    'use strict';

    let gArray = [3, 3, 3, 3, 3, 3, 3, 3, 3];       // 3= Blank, 1=X, 0=O
    let actPlayer = 1;                              // 1=X, 0=O


    function placePos(e) {

        let pos = Number(e.target.getAttribute('val'));


        if (gArray[pos] == 3) {         // if empty Position, placeable

            gArray[pos] = actPlayer;    // then update date

            let bPush = document.querySelector('.at' + pos);
            bPush.textContent = (actPlayer == 1) ? 'X' : 'O'; // then update GUI



            if (actPlayer == 1) {       // then switch player
                actPlayer = 0;
            } else {
                actPlayer = 1;
            }

            _checkWin();
        }
    }

    function _clearGame() {

        gArray = [3, 3, 3, 3, 3, 3, 3, 3, 3];
        actPlayer = 1;

        for (let i = 0; i < 9; i++) {
            let bPush = document.querySelector('.at' + i);
            bPush.textContent = '';
        }
    }

    function _checkWin() {

        // 1. String management
        const stArray = gArray.join('');
        //console.log(stArray);

        let xArr = stArray.replaceAll('3', '0'); // 3-> 0 End
        //console.log(xArr);


        let oArr = stArray.replaceAll('0', '5'); // 0-> 5 (for a while)
        oArr = oArr.replaceAll('3', '0');
        oArr = oArr.replaceAll('1', '0');
        oArr = oArr.replaceAll('5', '1');
        //console.log(oArr);

        // 2. Convert to decimal
        const xDec = parseInt(xArr, 2);
        const oDec = parseInt(oArr, 2);

        const win = [7, 56, 448, 73, 146, 292, 84, 273];      // Use Libra office to manually calculate

        // 3. Display result
        if (win.includes(xDec)) {                // X is the winner !

            setTimeout(function () { alert("X is the winner !"); }, 100);
            setTimeout(function () { _clearGame(); }, 120);                   // This wait must more than alert !

            human.setWin();

            let humanScore = document.querySelector('.humanScore');
            humanScore.textContent = human.getWin();

        } else if (win.includes(oDec)) {          // O is the winner !

            setTimeout(function () { alert("O is the winner !"); }, 100);
            setTimeout(function () { _clearGame(); }, 120);

            computer.setWin();

            let computerScore = document.querySelector('.computerScore');
            computerScore.textContent = computer.getWin();
        } else if (!gArray.includes(3)) {

            setTimeout(function () { alert("Draw !"); }, 100);
            setTimeout(function () { _clearGame(); }, 120);

        } else {                                                              // Continue playing



        }
    }

    return {
        placePos
    };

})();


let human = player();
let computer = player();

const gPlace = Array.from(document.querySelectorAll('.cell'));
gPlace.forEach(key => key.addEventListener('click', gBoard.placePos));