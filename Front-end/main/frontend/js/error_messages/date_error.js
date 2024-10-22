import * as html from '../variable_names/inputVar.js'

export const dateError = () => {
    html.dateEm.textContent = "Please select a date";
    html.dateEm.classList.remove("hidden");
    html.taskDateTimeEl.classList.remove("border-transparent");
    html.dateEm.classList.add("block");
    html.taskDateTimeEl.classList.add("errorInput");
};

