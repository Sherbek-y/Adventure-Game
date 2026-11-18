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
let firstLocation="village";
let isFirstTime=true
let currentLocation="village"
let hasWeapon = false;
let hasPotion = false;
let hasArmor = false

console.log("boshlangich nuqta: "+firstLocation);
console.log("birinchi marta tashrif buyurdi: "+isFirstTime);
// Check if player is in tavern and display appropriate message



while(gameRunning){

  if(currentLocation==="village"){
  console.log(" ===VILLAGE=== ");
  console.log("You're in a bustling village. The blacksmith and market are nearby.");
  console.log("1: Go to blacksmith");
  console.log("2: Go to market");
  console.log("3: Enter forest");
  console.log("4: Check status");
  console.log("5: Quit game");
  if (isFirstTime) {
    console.log("Villager: Welcome, adventurer! Rumor has it there's a dragon in the mountains...");
    isFirstTime=false;
  }
  
}


else if(currentLocation==='blacksmith'){
  console.log(" ===BLACKSMITH=== ");
  console.log("You are in a wide blacksmith which is full of ash. The");
  console.log("\nwhere would you like to go?");
  console.log("1: Return to village");
  console.log("2: Check status");
  console.log("3: Check inventory");
  console.log("4: Quit game");
  
  
}
else if(currentLocation==="market"){
  console.log("\n=== MARKET ===");
        console.log("Merchants sell their wares from colorful stalls. A potion seller catches your eye.");
        
        console.log("\nWhat would you like to do?");
        console.log("1: Return to village");
        console.log("2: Check status");
        console.log("3: Check inventory");
        console.log("4: Quit game");
}
else if(currentLocation==="forest"){
  let isButtle=true;
  let monsterHealth=3;
  console.log("\nBattle started!");
  while(isButtle){
    console.log("Monster Health: " + monsterHealth);
    console.log("You attack!");
    monsterHealth--;
    if(monsterHealth<=0){
      isButtle=false
      console.log("Monster Defeated");
      
    }
  }
  currentLocation = "village";  // Return to village after battle
        console.log("\nYou returned to the safety of the village.");
  
}


let Player = readline.question("enter number ")
let response = parseInt(Player)

if(currentLocation==="village"){
   if (response===1) {
      console.log("You are in blacksmith");
      currentLocation="blacksmith";
   }
    else if(response===2){
      console.log("You are in market");
      currentLocation="market"
    }
    else if(response===3){
      console.log("You are in forest");
      currentLocation="forest";
    }
    else if(response===4){
      console.log("Checking status");
      console.log("\n=== " + playerName + "'s Status ===");
        console.log("❤️  Health: " + health);
        console.log("💰 Gold: " + gold);
        console.log("📍 Location: " + currentLocation);
    }
    else if(response===5){
      console.log("Quit game");
      gameRunning=false;
    }
  
}else if(currentLocation==="blacksmith" || currentLocation==="market"){
   if(response===1) {
      console.log("You are in village");
      currentLocation="village"
   }
    else if(response===2){
      console.log("Checking status");
      console.log("\n=== " + playerName + "'s Status ===");
        console.log("❤️  Health: " + health);
        console.log("💰 Gold: " + gold);
        console.log("📍 Location: " + currentLocation);
    }
    else if(response===3){
      for(s=1;s<=3;s++){
        console.log("Checking item slot "+s+"...");
        if(s===1 && hasWeapon){
          console.log("Found: sword");
        }else if(s===2 && hasPotion){
          console.log("Found: Health Potion");
        }else if(s===3 && hasArmor){
          console.log("Found: Shield");
        }else{
          console.log("Empty slot");
        }
      }
    }
    else if(response===4){
      console.log("Quit game");
      gameRunning=false;
    }
      
    else{
      console.log("Invalid number");
    }
  }
  if (health <= 0) {
        console.log("\nGame Over! Your health reached 0!");
        gameRunning = false;
    }

}
console.log("Goodby, adventurer! See you next time! chaovonjovo");
