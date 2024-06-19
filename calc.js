let variables;
let varNames;
let formulas;
let formNames;

if (localStorage.getItem("exists")) {
  variables = new Map(JSON.parse(localStorage.getItem("variables")));
  formulas = new Map(JSON.parse(localStorage.getItem("formulas")));
  varNames = new Map(JSON.parse(localStorage.getItem("varNames")));
  formNames = new Map(JSON.parse(localStorage.getItem("formNames")));
} else {
  variables = new Map();
  formulas = new Map();
  varNames = new Map();
  formNames = new Map();
  localStorage.setItem("exists", true);
}

// formulas.set("0", "4*(2+3)+a");

function explicitMult(formula) {
  let replacedFormula = "";
  let lastChar = "";
  for (let index = 0; index < formula.length; index++) {
    let char = formula.charAt(index);
    if (isOperand(lastChar) || lastChar == ")") {
      if (isOperand(char) || char == "(")
        if (!(!isNaN(char) && !isNaN(lastChar)))
          if (isNaN(char)) replacedFormula += "*";
          else throw "invalid formula number after variable";
    }
    lastChar = char;
    replacedFormula += char;
  }
  return replacedFormula;
}

function isOperand(char) {
  return (
    (!isNaN(char) || char.toUpperCase() != char.toLowerCase()) &&
    char.length === 1
  );
}

function replace(formula, variableMap) {
  let replacedFormula = "";
  for (let index = 0; index < formula.length; index++) {
    let char = formula.charAt(index);
    if (variableMap.has(char)) {
      char = variableMap.get(char);
    }
    replacedFormula += char;
  }
  return replacedFormula;
}
function calculate(formula) {
  let result;
  try {
    let explicit = explicitMult(formula);
    let replaced = replace(explicit, variables);
    result = eval(replaced);
  } catch (error) {
    console.warn(error);
  }
  return result;
}
