// HELPER FUNCTIONS FOR FORMATTING TEXT AND NUMBERS
// capitalize() standardizes the letter casing of string inputs 
// randomNumber() returns a random number between two values, inclusive


export function titleCase(inputString) {
    let stringArray = inputString.split(" ");
    let titleCaseArray = [];
    for(let i = 0; i < stringArray.length; i++){
        let string = stringArray[i];
        string = string.toLowerCase();
        if (string !== "and") {
            string = string.charAt(0).toUpperCase() + string.substring(1, string.length).toLowerCase();
        }
        titleCaseArray.push(string)
    }
    return titleCaseArray.join(' ');
}

export function randomNumber(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 