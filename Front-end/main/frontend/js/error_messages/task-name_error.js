import * as html from '../variable_names/inputVar.js'

export const taskNameError = () => {
    html.titleEm.textContent = "Please add a title";
    html.titleEm.classList.remove("hidden");
    html.taskNameEl.classList.remove("border-transparent");
    html.titleEm.classList.add("block");
    html.taskNameEl.classList.add("errorInput");
};