export const clearEm = (elem, error) => {
    elem.classList.remove("errorInput");
    elem.classList.add("border-transparent");
    error.classList.add("hidden");
    error.classList.remove("block");
    error.textContent = "";
};