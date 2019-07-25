// Game Class: Represents a Game
class Game {
    constructor(title,game,price){
        this.title = title;
        this.publisher = publisher;
        this.price = price;
    }
}
// UI Class: Handle UI Tasks
class UI {
    static displayGames() {
        const games = Store.getGames();

        games.forEach((game) => UI.addGameToList(game));
    }

    static addGameToList(game) {
        const list = document.querySelector('#game-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${game.title}</td>
            <td>${game.publisher}</td>
            <td>${game.price}</td>
            <td><a href='#' class='btn btn-danger btn-sm delete'>X</a></td>
        `;

        list.appendChild(row);
    }
    static deleteGame(el) {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#game-form');
        container.insertBefore(div, form);

        // Vanish in 3 secs
        setTimeout(() => document.querySelector('.alert').remove(),2000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#publisher').value = '';
        document.querySelector('#price').value = '';
    }
}
// Store Class: Handles Local Storage
class Store {
    static getGames() {
        let games;
        if(localStorage.getItem('games') === null) {
            games = [];
        }else {
            games = JSON.parse(localStorage.getItem('games'));
        }
        return games;
    }

    static addGame(game) {
        const games = Store.getGames();

        games.push(game);

        localStorage.setItem('games', JSON.stringify(games));
    }

    static removeGame(price) {
        const games = Store.getGames();

        games.forEach((game,index) => {
            if(game.price === price) {
                games.splice(index,1);
            }
        });

        localStorage.setItem('games', JSON.stringify(games));
    }
}

// Event: Display Games
document.addEventListener('DOMContentLoaded', UI.displayGames);

    // Event: Add Game
    document.querySelector('#game-form').addEventListener('submit', (e) => {
    
    // Prevent Actual Submit
    e.preventDefault();
    
    //Get Form Values
    const title = document.querySelector('#title').value;
    const publisher = document.querySelector('#publisher').value;
    const price = document.querySelector('#price').value;

    // Validate - Error message
    if(title === '' || publisher === '' || price === '') {
        UI.showAlert('Please enter all fields', 'danger');
    } else {
         // Instantiate Game
        const game = new Game(title, publisher, price);

        // Add Game to UI
        UI.addGameToList(game);

        // Add game to store
        Store.addGame(game);

        // Show success message
        UI.showAlert('Book added', 'success');

        // Clear fields
        UI.clearFields();   
        }
});

// Event: Remove Game
document.querySelector('#game-list').addEventListener('click', (e) => {
    
    // Remove game from UI
    UI.deleteGame(e.target);

    // Remove game from store
    Store.removeGame(e.target.parentElement.previousElementSibling.textContent);

   // Show success message
   UI.showAlert('Book removed', 'warning');

});