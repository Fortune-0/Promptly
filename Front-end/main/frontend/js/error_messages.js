import * as html from './variable_names/inputVar.js'

export const clearEm = (elem, error) => {
    elem.classList.remove("errorInput");
    elem.classList.add("border-transparent");
    error.classList.add("hidden");
    error.classList.remove("block");
    error.textContent = "";
};

export const dateError = () => {
    html.dateEm.textContent = "Please select a date";
    html.dateEm.classList.remove("hidden");
    html.taskDateTimeEl.classList.remove("border-transparent");
    html.dateEm.classList.add("block");
    html.taskDateTimeEl.classList.add("errorInput");
};

export const taskNameError = () => {
    html.titleEm.textContent = "Please add a title";
    html.titleEm.classList.remove("hidden");
    html.taskNameEl.classList.remove("border-transparent");
    html.titleEm.classList.add("block");
    html.taskNameEl.classList.add("errorInput");
};

export const timeError = () => {
    dateError();
    html.dateEm.textContent = "Please select a specific time";
};
// POP UPS on submit of creation and edit
export const warningError = (title, text, icon = "warning") => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text
    })
}
// export const emptyForm = 