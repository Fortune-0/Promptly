import * as say from '../variable_names/inputVar.js'

export const checkDate = () => {
    say.dateEm.textContent = "Please select a date";
    say.dateEm.classList.remove("hidden");
    say.taskDateTimeEl.classList.remove("border-transparent");
    say.dateEm.classList.add("block");
    say.taskDateTimeEl.classList.add("errorInput");
};

