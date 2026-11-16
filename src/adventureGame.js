/*
Adventure Game
This game will be a text-based game where the player will be able
to make choices that affect the outcome of the game.
The player will be able to choose their own path and the story will change
based on their decisions.
*/

// Display the game title
console.log("Welcome to the Adventure Game");

// Add a welcome message
console.log("Prepare yourself for an epic journey!");
const readline = require('readline-sync')
let playerName = "";
// Get player name using readline-sync
playerName = readline.question("What is your name? ");


let health = 100;
let gold = 20;
let village = "qishloq";
let  gameRunning = true;

let inventory = [];
// Create variables for player stats

console.log("Welcome to Adventure Game: " + playerName);
console.log("gold: " + gold);
