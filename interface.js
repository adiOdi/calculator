let formulaField = document.getElementById("formula");
function newFormula(event) {
  if (event.keyCode != 13) return;
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
  if (event.keyCode != 13) return;
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
  if (event.keyCode != 13) return;
  if (varField.value == "") return;
  variables.set(varField.value, 0);
  varNames.set(varField.value, "new variable");
  varField.value = "";
  updateVarDiv();
  updateFormDiv();
}
function changeVar(event) {
  if (event.keyCode != 13) return;
  const newVar = event.target.value;
  const key = event.target.name;
  if (newVar == "") {
    variables.delete(key);
    varNames.delete(key);
  } else variables.set(key, newVar);
  updateVarDiv();
  updateFormDiv();
}
function increaseVar(event) {
  const input = document.getElementById(event.target.name);
  let value = variables.get(input.name) + 1;
  input.value = value;
  variables.set(input.name, value);
  updateFormDiv();
}
function decreaseVar(event) {
  const input = document.getElementById(event.target.name);
  let value = variables.get(input.name) - 1;
  input.value = value;
  variables.set(input.name, value);
  updateFormDiv();
}
function changeVarName(event) {
  if (event.keyCode != 13) return;
  varNames.set(event.target.name, event.target.value);
  updateVarDiv();
}
function changeFormName(event) {
  if (event.keyCode != 13) return;
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
    name.addEventListener("keydown", changeVarName);
    name.value = varNames.get(key);
    name.name = key;
    div.appendChild(name);
    const label = document.createElement("label");
    label.innerText = " (" + key + ") ";
    label.for = key;
    div.appendChild(label);
    const input = document.createElement("input");
    input.type = "text";
    input.addEventListener("keydown", changeVar);
    input.value = value;
    input.name = key;
    input.id = key;
    div.appendChild(input);
    const btnadd = document.createElement("input");
    btnadd.type = "button";
    btnadd.value = "+";
    btnadd.name = key;
    btnadd.addEventListener("click", increaseVar);
    div.appendChild(btnadd);
    const btnsub = document.createElement("input");
    btnsub.type = "button";
    btnsub.value = "-";
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
    name.addEventListener("keydown", changeFormName);
    name.value = formNames.get(key);
    name.name = key;
    div.appendChild(name);
    const input = document.createElement("input");
    input.type = "text";
    input.addEventListener("keydown", updateForm);
    input.value = value;
    input.name = key;
    div.appendChild(input);
    const res = document.createElement("label");
    res.innerText = " = " + calculate(value);
    res.for = key;
    div.appendChild(res);
    formDiv.appendChild(div);
  }
}
updateVarDiv();
updateFormDiv();
