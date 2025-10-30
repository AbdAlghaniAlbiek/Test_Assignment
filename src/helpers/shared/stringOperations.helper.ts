export function snakeToPascalCase(snakeStr: string) {
  return snakeStr
    .split("-") // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back together
}

export function pascalToSeparated(pascalStr: string, separator = " ") {
  return pascalStr
    .replace(/([a-z])([A-Z])/g, "$1" + separator + "$2") // Add separator between lowercase and uppercase letters
    .replace(/([A-Z])([A-Z][a-z])/g, "$1" + separator + "$2") // Add separator between consecutive uppercase letters
    .toLowerCase(); // Convert the entire string to lowercase
}

export function camelToPascalWithSpaces(camelStr: string) {
  return camelStr
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camelCase boundaries
    .replace(/([A-Z])/g, "$1") // Add space before any uppercase letter
    .replace(/^./, function (match: string) {
      // Capitalize the first letter of the string
      return match.toUpperCase();
    })
    .trim(); // Trim any leading/trailing spaces
}

export function splitPascalCase(input: string) {
  // Use a regular expression to split the string at uppercase letters
  return input.replace(/([A-Z])/g, " $1").trim();
}

export function getShortcutNameAvatar(name: string) {
  const splitedName = name.split(" ");
  return splitedName.length > 1
    ? splitedName[0].toLocaleUpperCase().charAt(0) +
        splitedName[splitedName.length - 1].toLocaleUpperCase().charAt(0)
    : splitedName[0].toLocaleUpperCase().charAt(0) +
        splitedName[0].toLocaleUpperCase().charAt(1);
}

export function getGridColumns() {
  return new Array(100).fill(0).map((_, i) => `grid-cols-${i}`);
}
