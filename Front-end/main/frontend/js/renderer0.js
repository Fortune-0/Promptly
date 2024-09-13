document.getElementById("startPage").addEventListener("click", () => {
    setTimeout(()=> window.location.href = "allTasks.html", 500);
    // the timeout there is actually to set a delay so API calls can be made
});