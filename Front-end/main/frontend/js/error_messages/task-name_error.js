import * as say from '../variable_names/inputVar.js'

export const checkTaskName = () => {
    say.titleEm.textContent = "Please add a title";
    say.titleEm.classList.remove("hidden");
    say.taskNameEl.classList.remove("border-transparent");
    say.titleEm.classList.add("block");
    say.taskNameEl.classList.add("errorInput");
};