const init = () => {
	const elements = document.querySelector('#elements');
	const score = document.querySelector('#points');
	const message = document.querySelector('#message');
	let points = 0;
	const cellNumber = document.querySelectorAll('td');
	const quantityOfBomb = 3;

	const td = document.querySelectorAll('td div');

	// losowanie cyfr i umieszczanie w komórkach
	for (let i = 0; i <= cellNumber.length - 1; i++) {
		// Math.random() * (max - min) + min; wzór na losowanie z danego zakresu
		const draw = Math.trunc(Math.random() * (13 - 5) + 5);
		td[i].textContent = draw;
	}

	// losowanie 5 miejsc gdzie będą bomby
	let i = 1;
	while (i <= quantityOfBomb) {
		const numberCellWithBomb = Math.trunc(Math.random() * (20 - 0) + 0);
		if (td[numberCellWithBomb].textContent !== 'x') {
			td[numberCellWithBomb].textContent = 'x';
			td[numberCellWithBomb].classList.add('bomb');
			i++;
		} else {
			td[numberCellWithBomb].classList.remove('bomb');
			const draw = Math.trunc(Math.random() * (13 - 8) + 8);
			td[numberCellWithBomb].textContent = draw;
			i--;
		}
	}

	const selectElement = e => {
		// const td = e.target.closest('td'); alternatywne podpięcie pod td
		// scorePoints = td.dataset.points; alternatywne odczytywanie punktów z dataset
		const cell = e.target.closest('div');
		//sprawdzam czy już istnieje klasa w danym polu show jeśli tak to nie pozwalam klikać na to pole jeszcze raz
		if (cell.classList.contains('show')) {
			message.textContent = 'Nie oszukuj i nie klikaj w to samo miejsce';
			points -= Number(cell.textContent);
		}
		cell.classList.add('show');

		if (cell.textContent === 'x') {
			message.textContent = 'Koniec gry, przejebałeś!!!';
			gameOver('red');
		} else {
			points += Number(cell.textContent);
			score.textContent = points;
			changingPoints();
		}
	};
	const changingPoints = () => {
		if (points >= 80) {
			message.textContent = 'BRAWO! Wygrałeś!';
			gameOver('green');
		} else return;
	};

	const gameOver = colorText => {
		score.textContent = points;
		message.style.color = colorText;
		elements.removeEventListener('click', selectElement);
	};

	elements.addEventListener('click', selectElement);
};

window.onload = init();
