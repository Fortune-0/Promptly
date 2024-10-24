  import * as html from '../variable_names/allTasksVar.js'
  
  // Display the edit form
 export function displayEdit() {
    const parentE = document.querySelector("#allTasks");
    parentE.style.display = 'none';
    const aside = document.getElementById("aside");
    aside.classList.remove("hidden");
    aside.classList.add("flex");
}

// Cancel the edit form
export function cancelEdit() {
    const parentE = document.querySelector("#allTasks");
    parentE.style.display = 'flex';
    const aside = document.getElementById("aside");
    aside.classList.remove("flex");
    aside.classList.add("hidden");
    clearData();
}

export const clearData = () => {
    html.taskNameEl.value = '';
    html.taskDateTimeEl.value = '';
}