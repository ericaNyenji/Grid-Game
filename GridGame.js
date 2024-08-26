/////////////////////////////////////////////////////////////object for the missions
//We have one object(>>>missions<<<),,the object has two properties....>>>>basic(with an array value)<<<<<...&&& >>>>>extra(with an array of objects as value)<<<<<
//missions= {basic:[{},{},],
//           extra:[{},{}]}
const missions = 
{
  "basic": [
    {
      "title": "Edge of the forest",
      "description": "You get one point for each forest field adjacent to the edge of your map.",
      "image" : "ForestInTheEdge.jpg",
      "func": calculateEdgeOfTheForestScore
    },
    {
      "title": "Sleepy valley",
      "description": "For every row with three forest fields, you get four points.",
      "image" : "RowWith3ForestFields.jpg",
      "func": calculateSleepyValleyScore
    },
    {
      "title": "Watering potatoes",
      "description": "You get two points for each water field adjacent to your farm fields.",
      "image" : "WaterFieldAdjToFarm.jpg",
      "func": calculateWateringPotatoesScore
    },
    {
      "title": "Borderlands",
      "description": "For each full row or column, you get six points.",
      "image" : "FullRowOrColumn.jpg",
      "func": calculateBorderlandsScore
    }
  ],
  "extra": [
    {
      "title": "Tree line",
      "description": "You get two points for each of the fields in the longest vertically uninterrupted continuous forest. If there are two or more tree lines with the same longest length, only one counts.",
      "image" : "LongestVerticalForest.jpg",
      "func": calculateTreeLineScore
    },
    {
      "title": "Watering canal",
      "description": "For each column of your map that has the same number of farm and water fields, you will receive four points. You must have at least one field of both terrain types in your column to score points.",
      "image" : "SameNoOfFarmAndWaterField.jpg",
      "func": calculateWateringCanalScore
    },
    {
      "title": "Wealthy town",
      "description": "You get three points for each of your village fields adjacent to at least three different terrain types.",
      "image" : "VillageAdjToAtleast3DiffTerrainTypes.jpg",
      "func": calculateWealthyTownScore
    },
    {
      "title": "Magicians' valley",
      "description": "You get three points for your water fields adjacent to your mountain fields.",
      "image" : "WaterFieldAdjMountain.jpg",
      "func": calculateMagiciansValleyScore
    },
    {
      "title": "Empty site",
      "description": "You get two points for empty fields adjacent to your village fields.",
      "image" : "EmptyFieldAdjVillageField.jpg",
      "func": calculateEmptySiteScore
    },
    {
      "title": "Terraced house",
      "description": "For each field in the longest village fields that are horizontally uninterrupted and contiguous you will get two points.",
      "image" : "LongestHorizontalVillages.jpg",
      "func": calculateTerracedHouseScore
    },
    {
      "title": "Odd numbered silos",
      "description": "For each of your odd numbered full columns you get 10 points.",
      "image" : "OddNumberedFullColumn.jpg",
      "func": calculateOddNumberedSilosScore
    },
    {
      "title": "Rich countryside",
      "description": "For each row with at least five different terrain types, you will receive four points.",
      "image" : "RowWithAtleast5DiffTerrains.jpg",
      "func": calculateRichCountrysideScore


    }
  ],
}
function calculateEdgeOfTheForestScore(TwoDArray) {
  let score = 0;

  // Iterate through the TwoDArray
  for (let i = 0; i < TwoDArray.length; i++) {
    for (let j = 0; j < TwoDArray[i].length; j++) {
      // Check if the current cell is a forest field
      if (TwoDArray[i][j] === 'forest') {
        // Check if the forest field is adjacent to the edge of the map
        if (
          i === 0 || // Check top row
          i === TwoDArray.length - 1 || // Check bottom row
          j === 0 || // Check leftmost column
          j === TwoDArray[i].length - 1 // Check rightmost column
        ) {
          // If adjacent to the edge, add one point to the score
          score += 1;
        }
      }
    }
  }

  return score;
}

function calculateSleepyValleyScore(TwoDArray) {//"For every row with three forest fields, you get four points.",
  let score = 0;

  // Iterate through the TwoDArray rows
  for (let i = 0; i < TwoDArray.length; i++) {
    let forestCount = 0;

    // Count the number of forest fields in the current row
    for (let j = 0; j < TwoDArray[i].length; j++) {//TwoDArray[i] refers to the i-th row of the 2D array TwoDArray.
      if (TwoDArray[i][j] === 'forest') {
        forestCount++;
      }
    }

    // Check if the row has exactly three forest fields
    if (forestCount === 3) {
      // If so, add four points to the score
      score += 4;
    }
  }

  return score;
}

function calculateWateringPotatoesScore(TwoDArray) {//"You get two points for each water field adjacent to your farm fields.",
  // You get two points for each water field adjacent to your farm fields.
  // You also get two points for each farm field adjacent to your water fields.

  let score = 0;

  // Iterate through the TwoDArray
  for (let i = 0; i < TwoDArray.length; i++) {
    for (let j = 0; j < TwoDArray[i].length; j++) {
      // Check if the current cell is a water field
      if (TwoDArray[i][j] === 'water') {
        // Check if there is a farm field adjacent to the water field
        if (
          (i > 0 && TwoDArray[i - 1][j] === 'farm') || // Check above
          (i < TwoDArray.length - 1 && TwoDArray[i + 1][j] === 'farm') || // Check below
          (j > 0 && TwoDArray[i][j - 1] === 'farm') || // Check left
          (j < TwoDArray[i].length - 1 && TwoDArray[i][j + 1] === 'farm') // Check right
        ) {
          // If adjacent to a farm, add two points to the score
          score += 2;
        }
      } 
    }
  }

  return score;
}

function calculateBorderlandsScore(TwoDArray) {//"For each full row or column, you get six points.",
  let score = 0;

  // Check for full rows
  for (let i = 0; i < TwoDArray.length; i++) {
    if (TwoDArray[i].every(cell => cell !== undefined)) {//{}
      score += 6;
    }
  }

  // Check for full columns
  for (let j = 0; j < TwoDArray[0].length; j++) {//TwoDArray[0] refers to the first row of the TwoDArray. The TwoDArray is a two-dimensional array where each element is an array representing a row.
    if (TwoDArray.every(row => row[j] !== undefined)) {//{},{}.{}
      score += 6; 
    }
  }

  return score;
}

function calculateTreeLineScore(TwoDArray) {
  // You get two points for each of the fields in the longest vertically uninterrupted continuous forest.
  // If there are two or more tree lines with the same longest length, only one counts.
  let maxForestLength = 0;
  let currentForestLength = 0;

  // Iterate through each column
  for (let j = 0; j < TwoDArray[0].length; j++) {
    for (let i = 0; i < TwoDArray.length; i++) {
      // Check if the current cell is a forest
      if (TwoDArray[i][j] === 'forest') {
        currentForestLength++;

        // Check if the forest is vertically uninterrupted
        if (i < TwoDArray.length - 1 && TwoDArray[i + 1][j] !== 'forest') {
          // Check if the current forest is longer than the previous maximum
          if (currentForestLength > maxForestLength) {
            maxForestLength = currentForestLength;
          }

          // Reset the current forest length
          currentForestLength = 0;
        }
      }
    }
    //IF i < TwoDArray.length 
    // Check if the last forest in the column is the longest
    if (currentForestLength > maxForestLength) {
      maxForestLength = currentForestLength;
    }

    // Reset the current forest length for the next column
    currentForestLength = 0;
  }

  // Calculate the score if at least two vertically uninterrupted cells are present
  const score = maxForestLength >= 2 ? 2 * maxForestLength : 0;

  return score;
}


function calculateWateringCanalScore(TwoDArray) {//"For each column of your map that has the same number of farm and water fields, you will receive four points. You must have at least one field of both terrain types in your column to score points."  
  let score = 0;

  // Iterate through each column
  for (let j = 0; j < TwoDArray[0].length; j++) {
    let farmCount = 0;
    let waterCount = 0;

    // Count the number of farm and water fields in the current column
    for (let i = 0; i < TwoDArray.length; i++) {
      if (TwoDArray[i][j] === 'farm') {
        farmCount++;
      } else if (TwoDArray[i][j] === 'water') {
        waterCount++;
      }
    }

    // Check if there is at least one field of both terrain types in the column
    if (farmCount > 0 && waterCount > 0) {
      // Check if the number of farm fields is equal to the number of water fields
      if (farmCount === waterCount) {
        // If conditions are met, add four points to the score
        score += 4;
      }
    }
  }

  return score;
}

function calculateWealthyTownScore(TwoDArray) {
  let score = 0;

  // Iterate through the TwoDArray
  for (let i = 0; i < TwoDArray.length; i++) {
    for (let j = 0; j < TwoDArray[i].length; j++) {
      // Check if the current cell is a village field
      if (TwoDArray[i][j] === 'town') {
        // Check if the village field is adjacent to at least three different terrain types
        const uniqueTerrainTypes = new Set();

        // Check above
        if (i > 0 && TwoDArray[i - 1][j] !== undefined) {
          uniqueTerrainTypes.add(TwoDArray[i - 1][j]);
        }
        // Check below
        if (i < TwoDArray.length - 1 && TwoDArray[i + 1][j] !== undefined) {
          uniqueTerrainTypes.add(TwoDArray[i + 1][j]);
        }
        // Check left
        if (j > 0 && TwoDArray[i][j - 1] !== undefined) {
          uniqueTerrainTypes.add(TwoDArray[i][j - 1]);
        }
        // Check right
        if (j < TwoDArray[i].length - 1 && TwoDArray[i][j + 1] !== undefined) {
          uniqueTerrainTypes.add(TwoDArray[i][j + 1]);
        }

        // If the village field is adjacent to at least three different terrain types, add three points to the score
        if (uniqueTerrainTypes.size >= 3) {
          score += 3;
        }
      }
    }
  }

  return score;
}


function calculateMagiciansValleyScore(TwoDArray) {//You get three points for your water fields adjacent to your mountain fields.",
  let score = 0;

  // Iterate through the TwoDArray
  for (let i = 0; i < TwoDArray.length; i++) {
    for (let j = 0; j < TwoDArray[i].length; j++) {
      // Check if the current cell is a water field
      if (TwoDArray[i][j] === 'water') {
        // Check if there is a mountain field adjacent to the water field
        if (
          (i > 0 && TwoDArray[i - 1][j] === 'mountain') || // Check above
          (i < TwoDArray.length - 1 && TwoDArray[i + 1][j] === 'mountain') || // Check below
          (j > 0 && TwoDArray[i][j - 1] === 'mountain') || // Check left
          (j < TwoDArray[i].length - 1 && TwoDArray[i][j + 1] === 'mountain') // Check right
        ) {
          // If adjacent to a mountain, add three points to the score
          score += 3;
        }
      }
    }
  }

  return score;
}


function calculateEmptySiteScore(TwoDArray) {
  let score = 0;
  const countedCells = createEmptyArray(TwoDArray.length, TwoDArray[0].length);

  // Helper function to create a 2D array filled with 'not counted' values
  function createEmptyArray(rows, cols) {
    return Array.from({ length: rows }, () => Array(cols).fill(false));
  }

  // Iterate through the TwoDArray
  for (let i = 0; i < TwoDArray.length; i++) {
    for (let j = 0; j < TwoDArray[i].length; j++) {
      // Check if the current cell is a village field
      if (TwoDArray[i][j] === 'town') {
        // Check if there are empty fields adjacent to the village field
        // Check above
        if (i > 0 && TwoDArray[i - 1][j] === undefined && !countedCells[i - 1][j]) {
          score += 2;
          countedCells[i - 1][j] = true; // Mark the cell as counted
        }

        // Check below
        if (i < TwoDArray.length - 1 && TwoDArray[i + 1][j] === undefined && !countedCells[i + 1][j]) {
          score += 2;
          countedCells[i + 1][j] = true; // Mark the cell as counted
        }

        // Check left
        if (j > 0 && TwoDArray[i][j - 1] === undefined && !countedCells[i][j - 1]) {
          score += 2;
          countedCells[i][j - 1] = true; // Mark the cell as counted
        }

        // Check right
        if (j < TwoDArray[i].length - 1 && TwoDArray[i][j + 1] === undefined && !countedCells[i][j + 1]) {
          score += 2;
          countedCells[i][j + 1] = true; // Mark the cell as counted
        }
      }
    }
  }

  return score;
}


function calculateTerracedHouseScore(TwoDArray) {
  // For each field in the longest village fields that are horizontally uninterrupted and contiguous, you will get two points
  let maxContiguousCount = 0;
  let currentContiguousCount = 0;
  let maxContiguousRows = [];

  // Iterate through the TwoDArray
  for (let i = 0; i < TwoDArray.length; i++) {
    for (let j = 0; j < TwoDArray[i].length; j++) {
      // Check if the current cell is a village field
      if (TwoDArray[i][j] === 'town') {
        currentContiguousCount++;
      } else {
        // Check if the current run is longer than the previous max, update the max and reset the array
        if (currentContiguousCount > maxContiguousCount) {
          maxContiguousCount = currentContiguousCount;
          maxContiguousRows = [i];
        } else if (currentContiguousCount === maxContiguousCount) {
          // If there are multiple rows with the same longest contiguous count, add them to the array
          maxContiguousRows.push(i);
        }

        // Reset the count if the current cell is not a village field
        currentContiguousCount = 0;
      }
    }
  }

  // Calculate the score based on the longest contiguous village fields
  let score = 0;

  if (maxContiguousCount >= 2) {
    score = maxContiguousCount * 2;

    // Add the scores of other rows with the same longest contiguous count
    if (maxContiguousRows.length > 1) {
      // Add extra points for each additional row with the same longest contiguous count
      score += (maxContiguousRows.length - 1) * maxContiguousCount * 2;

      // Add extra points for each additional longest uninterrupted town cell sequence in the same row
      score += maxContiguousRows.reduce((extraPoints, row) => {
        let rowContiguousCount = 0;
        for (let cell of TwoDArray[row]) {
          if (cell === 'town') {
            rowContiguousCount++;
          } else {
            break;
          }
        }
        return extraPoints + (rowContiguousCount - 1) * 2;
      }, 0);
    }
  }

  return score;
}



function calculateOddNumberedSilosScore(TwoDArray) {//For each of your odd numbered full columns you get 10 points.
  let score = 0;

  // Iterate through the TwoDArray columns
  for (let j = 1; j < TwoDArray[0].length; j += 2) {
    let isFullColumn = true;

    // Check each row in the current column
    for (let i = 0; i < TwoDArray.length; i++) {
      // If the current cell is empty, the column is not full
      if (!TwoDArray[i][j]) {
        isFullColumn = false;
        break;
      }
    }

    // If the column is full and odd-numbered, add 10 points to the score
    if (isFullColumn) {
      score += 10;
    }
  }

  return score;
}



function calculateRichCountrysideScore(TwoDArray) {
  let score = 0;

  // Iterate through the TwoDArray rows
  for (let i = 0; i < TwoDArray.length; i++) {
    // Create a Set to store unique terrain types in the current row
    const uniqueTerrainTypes = new Set();

    // Check each cell in the current row
    for (let j = 0; j < TwoDArray[i].length; j++) {
      const terrainType = TwoDArray[i][j];

      // Exclude undefined values from unique terrain types
      if (terrainType !== undefined) {
        // Add the terrain type to the Set
        uniqueTerrainTypes.add(terrainType);
      }
    }

    // If the number of unique terrain types in the row is at least five, add four points to the score
    if (uniqueTerrainTypes.size >= 5) {
      score += 4;
    }
  }

  return score;
}












function calculateSelectedMissionScore(TwoDArray) {
  let totalScore = 0;

 
  selectedMissions.forEach((mission, index) => {
    // Check if the mission has a custom scoring function
    if (mission.func) {

      const missionScore = mission.func(TwoDArray);
      totalScore += missionScore;

      
      const missionScoreElementId = `EachMissionScore-${index + 1}`;

      // Check if the mission score element already exists
      let missionScoreElement = document.getElementById(missionScoreElementId);
      if (!missionScoreElement) {
        // Create a new element if it doesn't exist
        missionScoreElement = document.createElement("div");
        missionScoreElement.id = missionScoreElementId;
        document.body.appendChild(missionScoreElement); // You can append it to a different container if needed
      }

      // Update the score next to the mission image in the HTML
      missionScoreElement.innerText = `Score: ${missionScore}`;
    }
  });

  const BorderlandsMissionScore = document.querySelector("#BorderlandsMissionScore");
  const borderlands = missions.basic[3]

  //Check if the mission has a custom scoring function
  if (borderlands.func) {
   
    const borderlandsScore =borderlands.func(TwoDArray);
   
    BorderlandsMissionScore.innerHTML =  `<b>Borderlands Mission Score:</b> ${borderlandsScore}`


  const scoreElement = document.getElementById("score");
  if (scoreElement) {
    scoreElement.innerText = `Total Score: ${totalScore}`;
  }
}
}



let selectedMissions = []; //// Move the selectedMissions array to the global scope so it can be accessed by calculateSelectedMissionScore function.

function selectRandomMissions() {
  selectedMissions = [];

  // Randomly select 4 missions
  while (selectedMissions.length < 4) {
    const missionType = Math.random() < 0.5 ? "basic" : "extra"; // Randomly choose between basic and extra missions
    const missionsOfType = missions[missionType];
    const randomIndex = Math.floor(Math.random() * missionsOfType.length);
    const selectedMission = missionsOfType[randomIndex];

    // Check if the mission is not already selected
    if (!selectedMissions.includes(selectedMission)) {
      selectedMissions.push(selectedMission);
    }
  }


  // WE NOW HAVE OUR 4 SELECTED MISSIONS
  // Get the container to append the mission images
  const selectedMissionsContainer = document.querySelector("#selected-missions");

  selectedMissionsContainer.style.display = "flex";
  selectedMissionsContainer.style.flexWrap = "wrap";
  selectedMissionsContainer.style.justifyContent = "space-between";

  // Clear any previous missions
  selectedMissionsContainer.innerHTML = "";

 // Create a <ul> element to hold the images
 const ul = document.createElement("ul");
 ul.classList.add("image-TwoDArray");

 selectedMissions.forEach((mission, index) => {
   const li = document.createElement("li");
   const missionImage = document.createElement("img");
   missionImage.src = mission.image;
   missionImage.style.width = "300px";
   missionImage.style.height = "100px";

   // Create a span for the mission score
   const missionScoreSpan = document.createElement("span");
   missionScoreSpan.classList.add("mission-score");
   missionScoreSpan.id = `EachMissionScore-${index + 1}`;
   missionScoreSpan.innerText = `Score: 0`; // Initial score is set to 0

   // Append the image and score elements to the <li>
   li.appendChild(missionImage);
   li.appendChild(missionScoreSpan); // Correct order to have the score on the right

   // Append the <li> element to the <ul>
   ul.appendChild(li);
 });

 // Append the <ul> to the selected missions container
 selectedMissionsContainer.appendChild(ul);
}



// Call the selectRandomMissions function to select and display 4 random missions
selectRandomMissions();







//Array of objects>>>>16 possible elements
const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false        
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
        },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,0],
                [1,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,1],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
]


//The index i represents the current position in the array being shuffled. When generating a random index for shuffling, it's important to allow the possibility of swapping an element with itself (i.e., staying in its current position). This is why the range includes 0 to i.
// Function to shuffle the elements array
function shuffleArray(elements) {
  // Loop through the array from the last element to the first
  for (let i = elements.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));//By multiplying Math.random() by (i + 1), we scale the random number to the range [0, i + 1). This means that the generated random number can be any integer from 0 to i (inclusive).

    // Swap the elements at indices i and j
    const temp = elements[i];
    elements[i] = elements[j];
    elements[j] = temp;
  }
}

shuffleArray(elements) 



let shuffledIndex = 0;

// Function to get the next shuffled element
function getNextShuffledElement() {
  // Check if we've reached the end of the shuffled array
  if (shuffledIndex >= elements.length) {
    // If we have, reshuffle the elements array
    shuffleArray(elements);
    // Reset the index
    shuffledIndex = 0;
  }

  // Get the current element from the shuffled array
  const currentElement = elements[shuffledIndex];
  const currentElementImage = document.createElement("img");
  currentElementImage.src = currentElement.type + ".jpg";
  currentElementImage.alt = currentElement.type;

  currentElementImage.style.width = "50px"; // Set the width to 50 pixels
  currentElementImage.style.height = "50px";

  const timeUnitForEachCurrentElement=document.querySelector("#timeUnitForEachCurrentElement")
  timeUnitForEachCurrentElement.innerText = currentElement.time;
  // Append the image element to the nextElementImage div
  const currentElementImageContainer = document.querySelector("#currentElementImage");
  currentElementImageContainer.innerHTML = ""; // Clear any previous content
  currentElementImageContainer.appendChild(currentElementImage);

  // Increment the index for the next call
  shuffledIndex++;

  // Create an image element for the next element
  const nextElementImage = document.createElement("img");

  // Get the next element from the shuffled array
  const nextElement = elements[shuffledIndex];

  // Set the src and alt attributes for the next element
  nextElementImage.src = nextElement.type + ".jpg";
  nextElementImage.alt = nextElement.type;

  nextElementImage.style.width = "50px"; // Set the width to 50 pixels
  nextElementImage.style.height = "50px";

  const timeUnitForEachElement=document.querySelector("#timeUnitForEachElement")
  timeUnitForEachElement.innerText = nextElement.time;
  // Append the image element to the nextElementImage div
  const nextElementImageContainer = document.querySelector("#nextElementImage");
  nextElementImageContainer.innerHTML = ""; // Clear any previous content
  nextElementImageContainer.appendChild(nextElementImage);

  return currentElement;
}






function isReservedCell(cell) {
  // Get the row and column index of the cell
  const rowIndex = cell.parentElement.rowIndex;
  const colIndex = cell.cellIndex;

  // Define an array of reserved cell coordinates
  const reservedCoordinates = [
    [1, 1],
    [3, 8],
    [5, 3],
    [8, 9],
    [9, 5]
  ];

  // Check if the cell's coordinates match any of the reserved coordinates
  for (const [reservedRow, reservedCol] of reservedCoordinates) {
    if (rowIndex === reservedRow && colIndex === reservedCol) {
      return true; // It's a reserved cell
    }
  }

  return false; // It's not a reserved cell
}


    const numRows = 11; 
    const numColumns = 11;
    const emptyArray = [];
    for (let i = 0; i < numRows; i++) {
      emptyArray[i] = new Array(numColumns).fill(undefined);//2D array called emptyArray with dimensions numRows by numColumns and initialized it with undefined values
    }

    const mountainCoordinates = [
      [1, 1],
      [3, 8],
      [5, 3],
      [8, 9],
      [9, 5]
    ];
    
    // Initialize the specified indices with mountain fields
    mountainCoordinates.forEach((coord) => {
      const [rowIndex, colIndex] = coord;
      emptyArray[rowIndex][colIndex] = 'mountain';
    });
    
    

let gameInProgress = true;   
    
let totalUnits = 0; 



//EVERYTIME I PLACE AN ELEMENT I CHECK THE calculateSelectedMissionScore(emptyArray) BUT I DON'T WANT THE SCORE TO ADD UP ALREADY ADDED SCORES(Everytime Refresh the score to 0 and START COUNTING AGAIN)
function placeElement(cell, element) {
  
  // Check if the cell is not reserved
  if (gameInProgress) {
  if (!isReservedCell(cell)) {//if false
    // Implement logic to place the element in the clicked cell
    cell.innerHTML = `<img src="${element.type}.jpg" alt="${element.type}">`;//will know which cell by clicking eventlistener

    const rowIndex = cell.parentElement.rowIndex;
    const columnIndex = cell.cellIndex;
    emptyArray[rowIndex][columnIndex] = element.type;//We also update the TwoDArray

// Update and display total time units
totalUnits += element.time;
document.getElementById("time-units").innerText = `Time Units: ${totalUnits}`;  


if (totalUnits <= 7) {
  updateSPringPoints(totalUnits);
} else if (totalUnits > 7 && totalUnits <= 14) {
  updateSummerPoints(totalUnits - 7);
} else if (totalUnits > 14 && totalUnits <= 21) {
  updateAutumnPoints(totalUnits - 14);
} else {
  updateWinterPoints(totalUnits - 21);
}


const remainingTimeUnits =document.querySelector("#RemainingTimeUnits")
remainingTimeUnits.innerHTML = "<b>Remaining Time Units:</b> " + (28 - totalUnits);

if (totalUnits >= 28) {
  endGame();
}

//calculateBorderlandsScore(emptyArray)
//ACTS LIKE return,,,ANY CODE BELOW IT WON'T BE EXECUTED
calculateSelectedMissionScore(emptyArray);//calculate calculateSelectedMissionScore for the current state of the array



  }
  }
}


//SEASONS
const seasons = [
  {
    points: 0,
    type: 'Spring',
    state: false
  },
  {       
    points: 0,
    type: 'Summer', 
    state: false     
  },
  {      
    points: 0,
    type: 'Autumn', 
    state: false   
  },
  {       
    points: 0,
    type: 'Winter', 
    state: false 
  },]

const seasonsContainer = document.querySelector("#seasonsContainer");

seasonsContainer.style.display = "flex";
seasonsContainer.style.flexWrap = "wrap";
seasonsContainer.style.justifyContent = "space-between";

// Create a <ul> element to hold the images
const ul = document.createElement("ul");
ul.classList.add("image-TwoDArray");

// Loop through each season and create a list item with an image


seasons.forEach((season) => {
const li = document.createElement("li");
const seasonImage = document.createElement("img");
seasonImage.src = season.type + '.jpg'; // Use the current season in the array
seasonImage.style.width = "100px";
seasonImage.style.height = "50px";



 const seasonPointsSpan = document.createElement("span");
 
 seasonPointsSpan.innerText ="Points :" + season.points

li.appendChild(seasonImage);
li.appendChild(seasonPointsSpan);
ul.appendChild(li);

});

seasonsContainer.appendChild(ul);

function updateSpringPoints(input) {
  seasons[0].points = input; // Accumulate points over time
  updateSeasonPointsDisplay();
}

function updateSummerPoints(input) {
  seasons[1].points = input;
  updateSeasonPointsDisplay();
}

function updateAutumnPoints(input) {
  seasons[2].points = input;
  updateSeasonPointsDisplay();
}

function updateWinterPoints(input) {
  seasons[3].points = input;
  updateSeasonPointsDisplay();
}

function updateSeasonPointsDisplay() {
  // Update the display for each season
  seasons.forEach((season, index) => {
      const seasonPointsSpan = document.querySelector(`#seasonsContainer li:nth-child(${index + 1}) span`);
      seasonPointsSpan.innerText = `Points: ${season.points}`;
  });
}




function endGame() { 
  gameInProgress = false;
  const gameOverMessage = document.getElementById("game-over-message");
  gameOverMessage.innerText = "Game Over! Total time units reached 28 or more.";
  
}


// Restart the game by refreshing the browser
function restartGame() {
  // Refresh the browser
  gameInProgress = true;
  location.reload();
  //window.location.reload(true);
}

// Event listener for the restart button
const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", restartGame);



  const cells = document.querySelectorAll("td");
  let currentElement;
  let currentCellIndex;
  cells.forEach((cell,index) => {//this is where cell is defined
    cell.addEventListener("click", () => {  
      
       currentElement = getNextShuffledElement();      
       currentCellIndex = index;
       if (currentElement) {
        placeElement(cell, currentElement);
    }
    });
  });




const rotateButton = document.getElementById("rotateButton");
const mirrorButton = document.getElementById("mirrorButton");



  rotateButton.addEventListener("click", () => {
    if (currentElement !== undefined && currentCellIndex !== undefined) {
        currentElement.rotation = (currentElement.rotation + 1) % 4;
        currentElement.shape = rotateShape(currentElement.shape);
        placeElement2(cells[currentCellIndex], currentElement);
    }
});

mirrorButton.addEventListener("click", () => {
    if (currentElement !== undefined && currentCellIndex !== undefined) {
        currentElement.mirrored = !currentElement.mirrored;
        currentElement.shape = mirrorShape(currentElement.shape);
        placeElement2(cells[currentCellIndex], currentElement);
    }
});

//rotate a shape clockwise
function rotateShape(shape) {
  const size = shape.length;
  const rotatedShape = Array.from({ length: size }, () => Array(size).fill(0));

  for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
          rotatedShape[i][j] = shape[size - 1 - j][i];
      }
  }

  return rotatedShape;
}

//mirror a shape horizontally
function mirrorShape(shape) {
  return shape.map(row => row.slice().reverse());
}


    
    //cell.innerHTML = `<img src="${element.type}.jpg" alt="${element.type}">`;
    function placeElement2(cell, element) {
      const rotationDegrees = element.rotation * 90;
      const mirrorScale = element.mirrored ? -1 : 1;
  
      cell.innerHTML = `<img src="${element.type}.jpg" alt="${element.type}" style="transform: rotate(${rotationDegrees}deg) scaleX(${mirrorScale});">`;
  }