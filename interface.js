let formulaField = document.getElementById("formula");
function newFormula(event) {
  // if (!(event.keyCode == 13 || event.keyCode == 9)) return;
  if (formulaField.value == "") return;
  let newKey = 0;
  while (formulas.has(newKey + "")) {
    newKey++;
  }
  formulas.set(newKey + "", event.target.value);
  formNames.set(newKey + "", "new formula");
  event.target.value = "";
  updateFormDiv();
}
function updateForm(event) {
  // if (event.keyCode != 13) return;
  const newForm = event.target.value;
  const key = event.target.name;
  if (newForm == "") {
    formulas.delete(key);
    formNames.delete(key);
  } else formulas.set(key, newForm);
  updateFormDiv();
}
let varField = document.getElementById("var");
function newVar(event) {
  // if (!(event.keyCode == 13 || event.keyCode == 9)) return;
  const name = varField.value;
  if (name == "") return;
  if (name.toUpperCase() == name.toLowerCase()) return;
  variables.set(name, 0);
  varNames.set(name, "new variable");
  varField.value = "";
  updateVarDiv();
  updateFormDiv();
}
function changeVar(event) {
  // if (event.keyCode != 13) return;
  const newVar = event.target.value;
  const key = event.target.name;
  if (newVar == "") {
    variables.delete(key);
    varNames.delete(key);
  } else variables.set(key, eval(newVar));
  updateVarDiv();
  updateFormDiv();
}
function increaseVar(event) {
  const input = document.getElementById(event.target.name);
  let value = parseFloat(variables.get(input.name)) + 1;
  input.value = value;
  variables.set(input.name, value);
  updateFormDiv();
}
function decreaseVar(event) {
  const input = document.getElementById(event.target.name);
  let value = parseFloat(variables.get(input.name)) - 1;
  input.value = value;
  variables.set(input.name, value);
  updateFormDiv();
}
function changeVarName(event) {
  // if (event.keyCode != 13) return;
  varNames.set(event.target.name, event.target.value);
  updateVarDiv();
}
function changeFormName(event) {
  // if (event.keyCode != 13) return;
  formNames.set(event.target.name, event.target.value);
  updateFormDiv();
}
let varDiv = document.getElementById("variables");
function updateVarDiv() {
  localStorage.setItem(
    "variables",
    JSON.stringify(Array.from(variables.entries()))
  );
  localStorage.setItem(
    "varNames",
    JSON.stringify(Array.from(varNames.entries()))
  );
  varDiv.innerHTML = "";
  for (let [key, value] of variables.entries()) {
    const div = document.createElement("div");
    const name = document.createElement("input");
    name.type = "text";
    name.addEventListener("blur", changeVarName);
    name.value = varNames.get(key);
    name.className = "name";
    name.name = key;
    div.appendChild(name);
    const label = document.createElement("label");
    label.innerText = " (" + key + ") ";
    label.for = key;
    div.appendChild(label);
    const input = document.createElement("input");
    input.type = "text";
    input.addEventListener("blur", changeVar);
    input.className = "mono";
    input.value = value;
    input.name = key;
    input.id = key;
    div.appendChild(input);
    const btnadd = document.createElement("button");
    btnadd.innerText = "+";
    btnadd.className = "mono";
    btnadd.name = key;
    btnadd.addEventListener("click", increaseVar);
    div.appendChild(btnadd);
    const btnsub = document.createElement("button");
    btnsub.innerText = "-";
    btnsub.className = "mono";
    btnsub.name = key;
    btnsub.addEventListener("click", decreaseVar);
    div.appendChild(btnsub);
    varDiv.appendChild(div);
  }
}

let formDiv = document.getElementById("formulas");
function updateFormDiv() {
  localStorage.setItem(
    "formulas",
    JSON.stringify(Array.from(formulas.entries()))
  );
  localStorage.setItem(
    "formNames",
    JSON.stringify(Array.from(formNames.entries()))
  );
  formDiv.innerHTML = "";
  for (let [key, value] of formulas.entries()) {
    const div = document.createElement("div");
    const name = document.createElement("input");
    name.type = "text";
    name.addEventListener("blur", changeFormName);
    name.value = formNames.get(key);
    name.className = "name";
    name.name = key;
    div.appendChild(name);
    const input = document.createElement("input");
    input.type = "text";
    input.addEventListener("blur", updateForm);
    input.className = "mono";
    input.value = value;
    input.name = key;
    div.appendChild(input);
    const res = document.createElement("label");
    res.innerText = " = " + Math.round(calculate(value) * 10000) / 10000;
    res.for = key;
    div.appendChild(res);
    formDiv.appendChild(div);
  }
}
updateVarDiv();
updateFormDiv();
