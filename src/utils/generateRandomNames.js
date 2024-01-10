export default function generateRandomNames() {
  function capFirst(string) {
    console.log("string:", string);

    if (!string) return "Rocky";

    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function generateName() {
    var name1 = ["Able", "Absolute", "Adorable", "Adventurous", "Academic"];

    var name2 = ["History", "Art", "World", "Family", "Government"];

    var name =
      capFirst(name1[getRandomInt(0, name1.length + 1)]) +
      " " +
      capFirst(name2[getRandomInt(0, name2.length + 1)]);

    return name;
  }

  return generateName();
}
