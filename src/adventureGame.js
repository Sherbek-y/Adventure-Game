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



let health = 100;
let gold = 20;
let village = "qishloq";
let  gameRunning = true;

let inventory = [];
// Create variables for player stats
console.log("================================");
console.log("      The Dragon's Quest        ");
console.log("================================");
console.log("\nYour quest: Defeat the dragon in the mountains");

playerName = readline.question("What is your name? ");

console.log("\nWelcome to Adventure Game: " + playerName);
console.log("gold: " + gold);



// Create variable to track weapon damage
let weaponDamage = 0;
console.log("Current weapon damage: " + weaponDamage); 
console.log("When you buy a sword, weapon damage will increase to 10!");

let monsterDefense = 5;
console.log("Current monster defense: " + monsterDefense);


console.log("Monsters can withstand some damage in combat!");

// Setup a simple monster defense value



let HealingPotion = 30;
console.log("Current healing potion: " + HealingPotion);
// Set healing potion restoration value


console.log("A potion will restore 30 health!");





// First location
let firstLocation="blacksmith";
let isFirstTime=true

console.log("boshlangich nuqta: "+firstLocation);
console.log("birinchi marta tashrif buyurdi: "+isFirstTime);
// Check if player is in tavern and display appropriate message

if(firstLocation==="village"){
  console.log(" ===VILLAGE=== ");
  console.log("You're in a bustling village. The blacksmith and market are nearby.");
  console.log("1: Go to blacksmith");
  console.log("2: Go to market");
  console.log("3: Enter forest");
  console.log("4: Check status");
  console.log("5: Quit game");
  console.log("Villager: Welcome, adventurer! Rumor has it there's a dragon in the mountains...");
  
}else if(firstLocation==='blacksmith'){
  console.log(" ===BLACKSMITH=== ");
  console.log("You are in a wide blacksmith which is full of ash. The");
  console.log("\nwhere would you like to go?");
  console.log("1: Return to village");
  console.log("2: Check status");
  console.log("3: Quit game");
  
  
}
isFirstTime=false;

let currentLocation=firstLocation

while(gameRunning){
  let Player = readline.question("enter number ")
let response = parseInt(Player)

if(currentLocation==="village"){
  switch (response) {
    case 1:
      console.log("You are in blacksmith");
      currentLocation="blacksmith";
      break;
    case 2:
      console.log("You are in market");
      currentLocation="market"
      break;
    case 3:
      console.log("You are in forest");
      currentLocation="forest"
      break;
    case 4:
      console.log("Checking status");
      console.log("\n=== " + playerName + "'s Status ===");
        console.log("❤️  Health: " + health);
        console.log("💰 Gold: " + gold);
        console.log("📍 Location: " + currentLocation);
      break;
    case 5:
      console.log("Quit game");
      gameRunning=false
      break;
  }
}else if(currentLocation==="blacksmith"){
  switch (response) {
    case 1:
      console.log("You are in village");
      currentLocation="village"
      break;
    case 2:
      console.log("Checking status");
      console.log("\n=== " + playerName + "'s Status ===");
        console.log("❤️  Health: " + health);
        console.log("💰 Gold: " + gold);
        console.log("📍 Location: " + currentLocation);
      break;
    case 3:
      console.log("Quit game");
      gameRunning=false;
      break;
      
    default:
      console.log("Invalid number");
      break;
  }
}
}
console.log("Goodby, adventurer! See you next time! chaovonjovo")
