/*
=========================================================
LOYIHA NOMI: Adventure Game (The Dragon's Quest)
VAZIFASI: Matnli RPG o'yini. O'yinchi tanlovlar qiladi,
buyumlar sotib oladi va maxluqlar bilan jang qiladi.
=========================================================
*/

const readline = require("readline-sync");

// =========================================================
// 1-BO'LIM: ASOSIY O'ZGARUVCHILAR
// =========================================================
let playerName = "";
let health = 50;
let gold = 150;
let inventory = [];
let currentLocation = "village";
let gameRunning = true;

// =========================================================
// 2-BO'LIM: BUYUM SHABLONLARI (OBYEKTLAR)
// =========================================================
let healthPotion = {
  name: "Health Potion",
  type: "potion",
  value: 5,
  effect: 30,
  description: "Restores 30 health points",
};

let basicSword = {
  name: "Basic Sword",
  type: "weapon",
  value: 10,
  effect: 5,
  description: "A basic iron sword for beginners",
};

const steelSword = {
  name: "Steel Sword",
  type: "weapon",
  value: 25,
  effect: 15,
  description: "A strong steel sword that deals high damage",
};

let woodenShield = {
  name: "Wooden Shield",
  type: "armor",
  value: 8,
  effect: 5,
  description: "Reduces damage taken in combat",
};

let ironShield = {
  name: "Iron Shield",
  type: "armor",
  value: 25,
  effect: 12,
  description: "A heavy iron shield that greatly reduces combat damage",
};

// =========================================================
// 3-BO'LIM: SUMKA VA JIHOZLARNI TEKSHIRISH FUNKSIYALARI
// =========================================================

// Sumkadan ma'lum turdagi buyumlarni ajratib beradi
function getItemsByType(type) {
  return inventory.filter((item) => item.type === type);
}

// Ajratilgan buyumlar ichidan eng kuchlisini topadi
function getBestItem(type) {
  let items = getItemsByType(type);
  if (items.length === 0) {
    return null;
  }
  let bestItem = items[0];
  for (let i = 1; i < items.length; i++) {
    if (items[i].effect > bestItem.effect) {
      bestItem = items[i];
    }
  }
  return bestItem;
}

// Ajdarho bilan urishish uchun jihozlarni tekshiradi
function hasGoodEquipment() {
  let bestWeapon = getBestItem("weapon");
  let bestArmor = getBestItem("armor");
  if (
    bestWeapon !== null &&
    bestWeapon.name === "Steel Sword" &&
    bestArmor !== null
  ) {
    return true;
  }
  return false;
}

// O'yinchining jonini oshiradi yoki kamaytiradi
function updateHealth(amount) {
  health += amount;
  if (health > 100) {
    health = 100;
    console.log("You are at full health!");
  } else if (health < 0) {
    health = 0;
    console.log("You're gravely wounded!");
  }
  console.log("Health is now: " + health);
  return health;
}

// =========================================================
// 4-BO'LIM: JANG FUNKSIYASI (ODDIY MAXLUQ VA AJDARHO)
// =========================================================
function handleCombat(isDragon = false) {
  let bweapon = getBestItem("weapon");
  let barmor = getBestItem("armor");

  let playerDamage = bweapon ? bweapon.effect : 2;
  let armorProtection = barmor ? barmor.effect : 0;

  console.log(`\nWeapon: ${bweapon ? bweapon.name : "Bare Fists"} (Damage: ${playerDamage})`);
  console.log(`Armor: ${barmor ? barmor.name : "None"} (Protection: ${armorProtection})`);

  let enemyName = isDragon ? "Ancient Dragon" : "Forest Monster";
  let enemyHealth = isDragon ? 50 : 20;
  let enemyDamage = isDragon ? 20 : 10;

  console.log(`\nA ${enemyName} appears! (Health: ${enemyHealth}, Damage: ${enemyDamage})`);

  while (health > 0 && enemyHealth > 0) {
    // O'yinchi hujumi
    enemyHealth -= playerDamage;
    console.log(`You attack ${enemyName} with ${bweapon ? bweapon.name : "fists"} for ${playerDamage} damage!`);

    if (enemyHealth <= 0) break;

    // Maxluq hujumi (zirh zararni kamaytiradi, kamida 1 zarar o'tadi)
    let reducedDamage = Math.max(1, enemyDamage - armorProtection);
    console.log(`${enemyName} attacks for ${enemyDamage}! Your armor blocks ${armorProtection}. You take ${reducedDamage} damage!`);
    updateHealth(-reducedDamage);
  }

  if (health <= 0) {
    console.log(`\nYou were defeated by the ${enemyName}!`);
    return false;
  }

  if (isDragon) {
    gold += 100;
    console.log("\n==========================================");
    console.log("   VICTORY! YOU DEFEATED THE DRAGON!      ");
    console.log("==========================================");
    console.log(`Hero: ${playerName} | Final Health: ${health} | Final Gold: ${gold}`);
    gameRunning = false;
    return true;
  } else {
    gold += 15;
    console.log(`\nVictory! You defeated the ${enemyName} and earned 15 gold!`);
    return true;
  }
}

// =========================================================
// 5-BO'LIM: DO'KON VA BUYUM ISHLATISH FUNKSIYALARI
// =========================================================

// Bozordan (Market) dori sotib olish
function buyFromMarket() {
  console.log("\n=== MARKET ===");
  console.log(`1. ${healthPotion.name} - ${healthPotion.value} gold (${healthPotion.description})`);
  console.log("2. Cancel");

  let choice = parseInt(readline.question("Choose an item to buy (1-2): "));
  if (choice === 2) return;
  if (choice !== 1) {
    console.log("Invalid choice!");
    return;
  }

  if (gold >= healthPotion.value) {
    gold -= healthPotion.value;
    inventory.push({ ...healthPotion });
    console.log(`You bought ${healthPotion.name} for ${healthPotion.value} gold! Remaining gold: ${gold}`);
  } else {
    console.log("Sorry, you do not have enough gold!");
  }
}

// Temirchidan (Blacksmith) qurol va qalqon sotib olish
function buyFromBlacksmith() {
  console.log("\n=== BLACKSMITH ===");
  console.log(`1. ${basicSword.name} - ${basicSword.value} gold (${basicSword.description})`);
  console.log(`2. ${steelSword.name} - ${steelSword.value} gold (${steelSword.description})`);
  console.log(`3. ${woodenShield.name} - ${woodenShield.value} gold (${woodenShield.description})`);
  console.log(`4. ${ironShield.name} - ${ironShield.value} gold (${ironShield.description})`);
  console.log("5. Cancel");

  let choice = parseInt(readline.question("Choose an item to buy (1-5): "));
  let selectedItem = null;

  if (choice === 1) selectedItem = basicSword;
  else if (choice === 2) selectedItem = steelSword;
  else if (choice === 3) selectedItem = woodenShield;
  else if (choice === 4) selectedItem = ironShield;
  else if (choice === 5) return;
  else {
    console.log("Invalid choice!");
    return;
  }

  if (gold >= selectedItem.value) {
    gold -= selectedItem.value;
    inventory.push({ ...selectedItem });
    console.log(`You bought ${selectedItem.name} for ${selectedItem.value} gold! Remaining gold: ${gold}`);
  } else {
    console.log("Sorry, you do not have enough gold!");
  }
}

// Sumkadagi buyumlarni ko'rsatish
function showInventory() {
  console.log("\n=== INVENTORY ===");
  if (inventory.length === 0) {
    console.log("Your inventory is empty.");
  } else {
    inventory.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} (${item.type}, effect: ${item.effect})`);
    });
  }
}

// Sumkadagi buyumni tanlab ishlatish
function useItem() {
  if (inventory.length === 0) {
    console.log("\nYou have no items!");
    return false;
  }
  showInventory();
  let choose = readline.question("Use which item? (number or 'cancel'): ");
  if (choose.toLowerCase() === "cancel") return false;

  let index = parseInt(choose) - 1;
  if (index >= 0 && index < inventory.length) {
    let item = inventory[index];
    if (item.type === "potion") {
      console.log("\nYou drink the " + item.name + ".");
      updateHealth(item.effect);
      inventory.splice(index, 1);
      return true;
    } else if (item.type === "weapon" || item.type === "armor") {
      console.log("\nYou equip your " + item.name + " for battle!");
      return true;
    }
  } else {
    console.log("\nInvalid item number!");
  }
  return false;
}

// =========================================================
// 6-BO'LIM: JOYLASHUV, HARAKAT VA YORDAM FUNKSIYALARI
// =========================================================

// O'yinchining holatini ko'rsatish
function checkStatus() {
  console.log("\n=== " + playerName + "'s Status ===");
  console.log("Health: " + health);
  console.log("Gold: " + gold);
  console.log("Location: " + currentLocation);
  showInventory();
}

// Yordam ma'lumotlari
function showHelp() {
  console.log("\n=== AVAILABLE COMMANDS ===");
  console.log("- Enter the number corresponding to your choice.");
  console.log("- Buy a Steel Sword and a Shield at the Blacksmith before facing the Dragon.");
  console.log("- Buy Health Potions at the Market to restore health.");
  console.log("- Defeat monsters in the Forest to earn extra gold.");
}

// Hozirgi joylashuvga mos menyuni chiqarish
function showLocation() {
  if (currentLocation === "village") {
    console.log("\n=== VILLAGE ===");
    console.log("You are in a bustling village. Where would you like to go?");
    console.log("1: Go to Blacksmith");
    console.log("2: Go to Market");
    console.log("3: Enter Forest");
    console.log("4: Go to Mountains (Dragon's Lair)");
    console.log("5: Check Status");
    console.log("6: Use Items");
    console.log("7: Show Help");
    console.log("8: Quit Game");
  } else if (currentLocation === "blacksmith") {
    console.log("\n=== BLACKSMITH ===");
    console.log("1: Buy Weapons or Armor");
    console.log("2: Return to Village");
  } else if (currentLocation === "market") {
    console.log("\n=== MARKET ===");
    console.log("1: Buy Health Potion");
    console.log("2: Return to Village");
  } else if (currentLocation === "forest") {
    console.log("\n=== FOREST ===");
    console.log("1: Fight Monster");
    console.log("2: Return to Village");
  }
}

// Joylashuv o'zgarishlarini va xavfli hudud cheklovini boshqarish
function move(response) {
  if (currentLocation === "village") {
    if (response === 1) {
      currentLocation = "blacksmith";
      console.log("You moved to the Blacksmith.");
      return true;
    } else if (response === 2) {
      currentLocation = "market";
      console.log("You moved to the Market.");
      return true;
    } else if (response === 3) {
      currentLocation = "forest";
      console.log("You entered the Forest!");
      handleCombat(false);
      return true;
    } else if (response === 4) {
      if (!hasGoodEquipment()) {
        console.log("\n[DANGER] You are not ready for the Dragon! You need a Steel Sword and a Shield first.");
        return false;
      }
      currentLocation = "mountains";
      console.log("You climbed the Mountains to face the Dragon!");
      handleCombat(true);
      return true;
    }
  } else if (
    currentLocation === "blacksmith" ||
    currentLocation === "market" ||
    currentLocation === "forest"
  ) {
    if (response === 2) {
      currentLocation = "village";
      console.log("You returned to the Village.");
      return true;
    }
  }
  return false;
}

// =========================================================
// 7-BO'LIM: KIRITISHNI TEKSHIRISH VA ASOSIY O'YIN SIKLI
// =========================================================

// Kiritilgan raqam to'g'ri oraliqda ekanini tekshiradi (boolean)
function isValidChoice(choice, maxOptions) {
  return !isNaN(choice) && choice >= 1 && choice <= maxOptions;
}

// O'yin boshlanishi
console.log("================================");
console.log("      The Dragon's Quest        ");
console.log("================================");
playerName = readline.question("What is your name, brave adventurer? ");
console.log(`\nWelcome, ${playerName}! Your quest is to defeat the Dragon in the mountains.`);

// Asosiy o'yin sikli
while (gameRunning) {
  showLocation();

  try {
    let playerInput = readline.question("\nEnter choice (number): ");
    let response = parseInt(playerInput);
    let maxOptions = currentLocation === "village" ? 8 : 2;

    if (!isValidChoice(response, maxOptions)) {
      throw new Error(`Invalid input! Please enter a number between 1 and ${maxOptions}.`);
    }

    if (currentLocation === "village") {
      if (response >= 1 && response <= 4) {
        move(response);
      } else if (response === 5) {
        checkStatus();
      } else if (response === 6) {
        useItem();
      } else if (response === 7) {
        showHelp();
      } else if (response === 8) {
        console.log("Quit game.");
        gameRunning = false;
      }
    } else if (currentLocation === "blacksmith") {
      if (response === 1) buyFromBlacksmith();
      else if (response === 2) move(response);
    } else if (currentLocation === "market") {
      if (response === 1) buyFromMarket();
      else if (response === 2) move(response);
    } else if (currentLocation === "forest") {
      if (response === 1) handleCombat(false);
      else if (response === 2) move(response);
    }
  } catch (error) {
    console.log("Error: " + error.message);
  }

  if (health <= 0) {
    console.log("\nGame Over! Your health reached 0!");
    gameRunning = false;
  }
}

console.log("Goodbye, adventurer! See you next time!");