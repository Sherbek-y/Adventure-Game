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



let health = 50;
let gold = 50;
let village = "qishloq";
let  gameRunning = true;

// Template of Potion Objects
let potionObject = {
  name:"Health Potion",
  type: "potion",
  value: 5,
  effect: 30,
  description: "Available in martket, you can by it for 5-gold"
}

// Template of Weapon Objects

let weaponObject = {
  name:"sword",
  type:"weapon",
  value: 10,
  effect: 10,
  description:"Available in blacksmith, you can by it for 5-gold"
}

// console.log("Potion Objects: " , potionObject);
// console.log("Weapon Objects: " , weaponObject);
// let arr = [1,2,3];
// let arr2 = [4,5,6]
// let jami = [...arr,...arr2]
// console.log(jami);


let inventory = [];
// Create variables for player stats
console.log("================================");
console.log("      The Dragon's Quest        ");
console.log("================================");
console.log("\nYour quest: Defeat the dragon in the mountains");

playerName = readline.question("\nWhat is your name, brave adventurer? ");

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
let hasArmor = true;


function hasItemType(type) {
    return inventory.some(item => item.type === type);
}

// === BUTTLE FUNCTIONS
// shows  battle in the forest
// show about battle
function forestBattle() {
  if(inventory.includes(hasItemType("weapon"))){
    let weapon = inventory.find(item => item.type === "weapon");
    console.log("You attack with your " + weapon.name + "!");
    console.log("You deal " + weapon.effect + " damage!");
    console.log("Victory! You found 10 gold!");
    gold+=10;
    return true;
  }else{
    console.log("Without a weapon, you must retreat!");
    updateHealth(-20);
    return false;
    
  }
}


// players current health
function updateHealth(amount) {
  health+=amount
  if(health>100){
    health=100;
    console.log("You are at full healtk!");
    
  }else if(health<0){
    health=0;
    console.log("You're gravely wounded!");
    
  }
  console.log("Health is now: " + health);
  return health;
  
  
}

function buyfromMarket() {
  if(gold>=5){
    console.log(`You can buy a Potion //  in Market, Potion and //  price ${potionObject.value}-gold`);
    console.log(`You bought a ${potionObject.name} and // `);
    inventory.push({...potionObject})
    // inventory.push("Shield")
    
    gold-=potionObject.value;
  }else{
   console.log("Sorry,You hav not enough gold");
    console.log("After collecting enough gold please try-again");
  }
}



function useItem() {
  if(inventory.length===0){
    console.log("\nYou have no items!");
    return false;
  }
  console.log("\n=== Inventory ===");
  inventory.forEach((item,index)=>{
    console.log((index+1)+ "."+item.name);
  })
  let chooose = readline.question("Use which item? (number or 'cancel'): ")
  if(chooose ==="cancel") return false;
  

  let index = parseInt(chooose)-1
  if(index>=0 && index<inventory.length){
    let item = inventory[index];
    if(item.type==="potion"){
      console.log("\nYou drink the " + item.name + ".");
            updateHealth(item.effect);
    let potionIndex = inventory.indexOf(inventory.find(potionObject=>potionObject.name==="Health Potion"));
    inventory.splice(potionIndex,1);
    return true;
    }else if (item.type === "weapon") {
      console.log("\nYou ready your " + item.name + " for battle");
      return true;
    }
  }else{
    console.log("\nInvalid item number!");
  }
  return false

 
  
}



function buyfromBlacksmith() {
  if(gold>=10){
    console.log(`You can buy a sword in blacksmith, sword price ${weaponObject.value}-gold`);
    console.log(`You bought a ${weaponObject.name}`);
    inventory.push({...weaponObject})
    gold-=weaponObject.value;
  }
  else{
    console.log("Sorry,You hav not enough gold");
    console.log("After collecting enough gold please try-again");
  }
}



function showInventory(){
  console.log("\n===INVENTORY===");
  if(inventory.find((potionObject) => potionObject.name === "Health Potion")){
    console.log("Found: Health Potion");
    
  }
  if(inventory.find((weaponObject) => weaponObject.name === "sword")){
    console.log("Found: sword");
    
  }

  // if (inventory.includes("Shield")) {
  //     console.log("Found: Shield");
  // }
  
    if(!inventory.find(weaponObject=>weaponObject.name==="sword") && !inventory.find(potionObject=>potionObject.name==="potion")){
      console.log("Empty slot");
    }
  
}




// show  Display HELP
function showHelp(){
  console.log("\n=== AVAILABLE COMMANDS ===");
    
    console.log("\nMovement Commands:");
    console.log("- In the village, choose 1-3 to travel to different locations");
    console.log("- In other locations, choose the return option to go back to the village");
    
    console.log("\nBattle Information:");
    console.log("- You need a sword to win battles");
    console.log("- Monsters appear in the forest");
    console.log("- Without a weapon, you'll lose health when retreating");
    
    console.log("\nItem Usage:");
    console.log(`- Health potions restore ${potionObject.effect} health`);
    console.log(`- You can buy ${potionObject.type} at the market for ${potionObject.value} gold`);
    console.log(`- You can buy a ${weaponObject.type} at the blacksmith for ${weaponObject.value} Gold`);
    
    console.log("\nOther Commands:");
    console.log("- Choose the status option to see your health and gold");
    console.log("- Choose the help option to see this message again");
    console.log("- Choose the quit option to end the game");
    
    console.log("\nTips:");
    console.log("- Keep healing potions for dangerous areas");
    console.log("- Defeat monsters to earn gold");
    console.log("- Health can't go above 100");
}

// o'yinchining hozirgi turgan joyi
function showPosition() {
  if(currentLocation==="village"){
    console.log("\n===VILLAGE===");
  console.log("You're in a bustling village. The blacksmith and market are nearby.");
  console.log("1: Go to blacksmith");
  console.log("2: Go to market");
  console.log("3: Enter forest");
  console.log("4: Check status");
  console.log("5: Use Items");
  console.log("6: Show help");
  console.log("7: Quit game");
  }else if(currentLocation==="blacksmith"){
    console.log(" ===BLACKSMITH=== ");
  console.log("You are in a wide blacksmith which is full of ash. The");
  console.log("\nwhere would you like to go?");
  console.log("1: Buy a " + weaponObject.name);
  console.log("2: Return to village");
  console.log("3: Check status");
  console.log("4: Use Items");
  console.log("5: Show Help");
  console.log("6: Quit game");
  }else if(currentLocation==="market"){
    console.log("\n=== MARKET ===");
        console.log("Merchants sell their wares from colorful stalls. A potion seller catches your eye.");
        
        console.log("\nWhat would you like to do?");
        console.log("1: Buy a " + potionObject.name);
        console.log("2: Return to village");
        console.log("3: Check status");
        console.log("4: Use Items");
        console.log("5: Show Help");
        console.log("6: Quit game");
        
  }else if(currentLocation==="forest"){
    console.log("\n=== forest ===");
        console.log("Merchants sell their wares from colorful stalls. A potion seller catches your eye.");
        
        console.log("\nWhat would you like to do?");
        console.log("1: Return to village");
        console.log("2: Check status");
        console.log("3: Use Items");
        console.log("4: Show Help");
        console.log("5: Quit game");
        
  }
}



// o'yinchining sog'lig'ini ko'rsatish
function checkStatus() {
   console.log("Checking status");
      console.log("\n=== " + playerName + "'s Status ===");
        console.log("❤️  Health: " + health);
        console.log("💰 Gold: " + gold);
        console.log("📍 Location: " + currentLocation);
        showInventory()
}


console.log("boshlangich nuqta: "+firstLocation);
console.log("birinchi marta tashrif buyurdi: "+isFirstTime);
// Check if player is in tavern and display appropriate message




// o'yinchining  boshqa joyga ko'chish funksiyasi
let validmove=false;
function move(response) {

  if(currentLocation==="village"){
  if (response===1) {
      console.log("You are in blacksmith");
      currentLocation="blacksmith";
      validmove=true;
      
   }
    else if(response===2){
      console.log("You are in market");
      currentLocation="market";
      validmove=true;
    }
    else if(response===3){
      console.log("You are in forest");
      currentLocation="forest";
      validmove=true;
    }
  }else if(currentLocation==="blacksmith" || currentLocation==="market"){
    if(response===2) {
      console.log("You are in village");
      currentLocation="village"
      validmove=true;
   }
  }
  return validmove;

}




// asosiy o'yin tsikli
while(gameRunning){

  showPosition();


let varr=false;
let response



while(!varr){
  let Player = readline.question("\nEnter choice (number): ");
  response = parseInt(Player);
  
try{
  if(isNaN(response)){
    throw ("It's not a number");
    }
    
  if(currentLocation==="village"){
  if(response<=0 || response>7){
      throw ("Number must be between 1 and 6!");
    
  }

  varr=true;
  if(response<=3){
    if(!move(response)){
      console.log("You can't go there!");
    }else if(response===3){
      console.log("A monster appears");
      if(!forestBattle()){
        currentLocation="village";
      }
      
    }
   }
   if(response===4){
      checkStatus()
    }
    
    else if(response===5){
      useItem();
    }
    else if(response===6){
      showHelp();
    }
    else if(response===7){
      console.log("Quit game");
      gameRunning=false;
    }
    

//     }catch(error){
//   console.log("Error: " + error);
  
// }
}else if(currentLocation==="blacksmith"){
  if(response <= 0 || response > 6){
    throw "Number must be between 1 and 6! Please try again!"
  }
  varr=true;
  if(response===1){
    buyfromBlacksmith();
  }
  if(response===2){
    if(!move(response)){
      console.log("You can't go there!");
    }
  }
    if(response===3){
     checkStatus()
    }
    else if(response===4){
      useItem()
    }
    else if(response===5){
      showHelp();
    }
    else if(response===6){
      console.log("Quit game");
      gameRunning=false;
    }
    
  }else if(currentLocation==="forest"){
if(response <= 0 || response > 5){
    throw "Number must be between 1 and 5! Please try again!"
  }
  varr=true;
  if(response===1){
    if(!move(response)){
      console.log("You can't go there!");
    }
  }
    if(response===2){
     checkStatus()
    }
    else if(response===3){
      useItem()
    }
    else if(response===4){
      showHelp();
    }
    else if(response===5){
      console.log("Quit game");
      gameRunning=false;
    }
    
  }
  else if(currentLocation==="market"){
    if(response <= 0 || response > 6){
    throw "Number must be between 1 and 6! Please try again!"
  }
  varr=true;
  if(response===1){
    buyfromMarket();
  }
  else if(response===2){
    if(!move(response)){
      console.log("You can't go there!");
    }
  }
    if(response===3){
     checkStatus()
    }
    else if(response===4){
      useItem()
    }
    else if(response===5){
      showHelp();
    }
    else if(response===6){
      console.log("Quit game");
      gameRunning=false;
    }
    
  }
}catch(error){
  console.log("Error: " + error);
  }

}
if (health <= 0) {
      console.log("\nGame Over! Your health reached 0!");
      gameRunning = false;
}

}
console.log("Goodby, adventurer! See you next time! chaovonjovo");
