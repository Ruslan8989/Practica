let lowerAlphabet = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

let upperAlphabet = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

function processText() {
  let input = document.getElementById("input").value;
  let output = "";
  let replacements = [];
  let shift = 13;

  let i = 0;
  while (i < input.length) {
    let char = input[i];
    let index = -1;

    let j = 0;
    while (j < lowerAlphabet.length) {
      if (char === lowerAlphabet[j]) {
        index = j;
        break;
      }
      j++;
    }

    if (index === -1) {
      j = 0;
      while (j < upperAlphabet.length) {
        if (char === upperAlphabet[j]) {
          index = j;
          break;
        }
        j++;
      }
    }

    if (index !== -1) {
      let newIndex = (index - shift + 26) % 26;

      let k = 0;
      let found = false;
      while (k < lowerAlphabet.length && !found) {
        if (char === lowerAlphabet[k]) {
          output += lowerAlphabet[newIndex];
          replacements.push(`${char} → ${lowerAlphabet[newIndex]}`);
          found = true;
        } else if (char === upperAlphabet[k]) {
          output += upperAlphabet[newIndex];
          replacements.push(`${char} → ${upperAlphabet[newIndex]}`);
          found = true;
        }
        k++;
      }
    } else {
      output += char;
    }

    i++;
  }

  document.getElementById("encrypted-text").textContent = output;

  let replacementsHTML = "<strong>Замены:</strong><br>";
  for (let i = 0; i < replacements.length; i++) {
    replacementsHTML += replacements[i];
    if (i !== replacements.length - 1) {
      replacementsHTML += "<br>";
    }
  }
  document.getElementById("replacements-list").innerHTML = replacementsHTML;

  let fullReplacementsHTML = "<strong>Полный алфавит:</strong><br>";
  for (let i = 0; i < lowerAlphabet.length; i++) {
    let original = lowerAlphabet[i];
    let shifted = lowerAlphabet[(i - shift + 26) % 26];
    fullReplacementsHTML += `${original} → ${shifted}`;
    if (i !== lowerAlphabet.length - 1) {
      fullReplacementsHTML += "<br>";
    }
  }
  document.getElementById("alphabet-replacements").innerHTML = fullReplacementsHTML;
}

document.getElementById("input").addEventListener("input", processText);