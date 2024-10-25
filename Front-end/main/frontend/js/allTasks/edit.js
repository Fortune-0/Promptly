  import * as html from '../variable_names/allTasksVar.js'
  
  // Display the edit form
 export function displayEdit() {
    const parentE = document.querySelector("#allTasks");
    parentE.style.display = 'none';
    const aside = document.getElementById("aside");
    aside.classList.replace('hidden', 'flex')
}

// Cancel the edit form
export function cancelEdit() {
    const parentE = document.querySelector("#allTasks");
    parentE.style.display = 'flex';
    const aside = document.getElementById("aside");
    aside.classList.replace('flex', 'hidden')
    clearData();
}

export const clearData = () => {
    html.taskNameEl.value = '';
    html.taskDateTimeEl.value = '';
}