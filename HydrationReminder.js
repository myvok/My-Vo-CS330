// Import the 'readline' module to handle user input and output
const readline = require('readline');

// Create a readline interface for reading input from the user and displaying output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to get user input with error handling for non-numeric values
// Uses Promises to handle asynchronous input
function getUserInput(promptText) {
    return new Promise((resolve) => {
        // Use rl.question to display the prompt and capture user input asynchronously
        rl.question(promptText, (userInput) => {
            const parsedInput = parseFloat(userInput); // Convert input to a number

            // Check if the input is not a number (NaN) or is less than or equal to zero
            if (isNaN(parsedInput) || parsedInput <= 0) {
                console.log("Invalid input. Please enter a number.");
                // Recursively call getUserInput to re-prompt the user for valid input
                resolve(getUserInput(promptText)); 
            } else {
                resolve(parsedInput); // Return the valid number
            }
        });
    });
}

// Function to calculate daily water intake goal
function calculateDailyGoal(userWeight) {
    const dailyGoal = userWeight * 30; // 30 ml per kg of body weight
    return dailyGoal;
}

// Function to display the daily water goal
function displayGoal(dailyGoal) {
    console.log("Your daily water goal is: " + dailyGoal + " ml.");
}

// Function to calculate remaining water intake
function calculateRemainingIntake(waterConsumed, dailyGoal) {
    const remaining = dailyGoal - waterConsumed;
    return remaining;
}

// Function to display hydration progress
function displayProgress(waterConsumed, dailyGoal) {
    const remaining = calculateRemainingIntake(waterConsumed, dailyGoal);
    console.log("You have consumed " + waterConsumed + " ml out of " + dailyGoal + " ml today.");
    if (remaining > 0) {
        console.log("You need to drink " + remaining + " ml more to meet your goal.");
    } else {
        console.log("Congratulations! You have met or exceeded your hydration goal for the day!");
    }
}

// Main Program function to execute the hydration reminder logic
async function main() {
    try {
        // Step 1: Get user weight
        const userWeight = await getUserInput("Enter your weight in kg: ");

        // Step 2: Calculate and display daily goal
        const userGoal = calculateDailyGoal(userWeight);
        displayGoal(userGoal);

        // Step 3: Track water intake and display progress
        const waterConsumed = await getUserInput("Enter the amount of water you have consumed today in ml: ");
        displayProgress(waterConsumed, userGoal);
    } catch (error) {
        console.error("An error occurred:", error);  // Catch any errors during execution
    } finally {
        rl.close(); // Close the readline interface
    }
}

// Run the main program
main();
