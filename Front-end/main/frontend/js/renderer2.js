var totalNumberOfTasks = document.getElementById("taskList").childElementCount;

const totalNumContainer = document.getElementsByTagName("var"),
      deleteBtns = document.querySelectorAll(".taskDeleteBtn"),
      editBtns = document.querySelectorAll(".taskEditBtn"),
      taskInputName = document.querySelector("#taskName"),
      taskInputDateTime = document.querySelector("#taskDateTime"),
      editCancelButton = document.querySelector("#editCancel"),
      submitEditButton = document.querySelector("#editSubmit"),
      taskNameEl = document.querySelector("#taskName"),
      taskDateTimeEl = document.querySelector("#taskDateTime"),
      titleEm = document.querySelector("#errorTitle"),
      dateEm = document.querySelector("#errorDate"),
      totalTaskContainer = document.querySelector("#totalTaskContainer");

totalNumContainer[0].textContent = totalNumberOfTasks;

// Handle task deletion with Flask API
deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener("click", async function () {
        const parentEl = this.closest(".task");
        if (parentEl) {
            const taskId = parentEl.getAttribute('data-task-id');

            // Send DELETE request to Flask API
            const response = await fetch(`http://127.0.0.1:5000/api/delete/${taskId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                parentEl.style.display = "none";
                totalNumberOfTasks--;
                totalNumContainer[0].textContent = totalNumberOfTasks;

                if (totalNumberOfTasks == 0) {
                    totalNumContainer[0].classList.remove("bg-green-300");
                    totalNumContainer[0].classList.add("empty");
                }
            } else {
                alert("Failed to delete the task.");
            }
        }
    });
});

// Display the edit form
function displayEdit() {
    const parentE = document.querySelector("#allTasks");
    parentE.style.display = 'none';
    const aside = document.getElementById("aside");
    aside.classList.remove("hidden");
    aside.classList.add("flex");
}

// Cancel the edit form
function cancelEdit() {
    const parentE = document.querySelector("#allTasks");
    parentE.style.display = 'flex';
    const aside = document.getElementById("aside");
    aside.classList.remove("flex");
    aside.classList.add("hidden");
}

// Handle task editing with Flask API
editBtns.forEach(editBtn => {
    editBtn.addEventListener('click', () => {
        displayEdit();

        const parentElement = editBtn.closest(".task");
        const taskId = parentElement.getAttribute('data-task-id');
        const taskName = parentElement.querySelector(".taskNameHeader").textContent;
        const taskDate = parentElement.querySelector(".date").textContent;
        const taskTime = parentElement.querySelector(".time").textContent;

        setTimeout(() => {
            if (parentElement) {
                const [month, day, year] = taskDate.split('/');
                const reversedDate = [year, month, day].join('/');
                const formattedReversedDate = reversedDate.replace(/\//g, '-');

                taskInputDateTime.value = `${formattedReversedDate}T${taskTime}`;
                taskInputName.value = taskName;
            }
        }, 500);

        const onSubmitEdit = async () => {
            const finalTaskName = taskInputName.value;
            let firstLetter_TN = finalTaskName.slice(0,1).toUpperCase();
            let restName = finalTaskName.slice(1);
            let taskHeaderName = firstLetter_TN + restName;

            const finalTaskDateTime = taskInputDateTime.value;
            let [date, time] = finalTaskDateTime.split("T");

            const formattedDate = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const formattedTime = new Date(finalTaskDateTime).toLocaleTimeString('en-US', { hour12: true }).replace(/:\d+ /, ' ');

            // Send PUT request to Flask API to update the task
            const response = await fetch(`http://127.0.0.1:5000/api/update/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    task: taskHeaderName,
                    dateTime: { date, time }
                })
            });

            if (response.ok) {
                let finalTaskTime = parentElement.querySelector(".finalTime");
                let finalTaskDate = parentElement.querySelector(".date");
                let editInputTime = parentElement.querySelector(".time");
                editInputTime.textContent = time;
                finalTaskDate.textContent = formattedDate;
                finalTaskTime.textContent = formattedTime;

                cancelEdit();
                submitEditButton.removeEventListener('click', onSubmitEdit); // Remove the listener after execution
            } else {
                alert("Failed to update the task.");
            }
        };

        submitEditButton.addEventListener('click', onSubmitEdit);
    });
});

// Cancel edit button listener
editCancelButton.addEventListener("click", cancelEdit);

// Input validation functionalities
const checkTaskName = () => {
    titleEm.textContent = "Please add a title";
    titleEm.classList.remove("hidden");
    taskNameEl.classList.remove("border-transparent");
    titleEm.classList.add("block");
    taskNameEl.classList.add("errorInput");
}

const checkDate = () => {
    dateEm.textContent = "Please select a date";
    dateEm.classList.remove("hidden");
    taskDateTimeEl.classList.remove("border-transparent");
    dateEm.classList.add("block");
    taskDateTimeEl.classList.add("errorInput");
}

const checkTime = () => {
    checkDate();
    dateEm.textContent = "Please select a specific time";
}

const checkBackDateTime = () => {
    let taskDate = new Date(taskDateTimeEl.value),
        userMonth = taskDate.getMonth(),
        userDay = taskDate.getDate(),
        userYear = taskDate.getFullYear(),
        taskTime = new Date(taskDateTimeEl.value),
        userHour = taskTime.getHours(),
        userMinutes = taskTime.getMinutes();

    let thisDate = new Date(),
        thisMonth = thisDate.getMonth(),
        thisDay = thisDate.getDate(),
        thisYear = thisDate.getFullYear(),
        thisHour = thisDate.getHours(),
        thisMinute = thisDate.getMinutes();

    if (userMonth == thisMonth && userDay == thisDay && userHour < thisHour) {
        checkTime();
        dateEm.textContent = "Please input this hour or later";
        return true;
    } else if (userMonth == thisMonth && userDay == thisDay && userHour == thisHour && userMinutes <= thisMinute) {
        checkTime();
        dateEm.textContent = "Please input some mins in the future";
        return true;
    }

    if (userYear < thisYear) {
        checkDate();
        dateEm.textContent = "Please input this year or later.";
        return true;
    } else if (userMonth < thisMonth) {
        checkDate();
        dateEm.textContent = "Please input this month or later.";
        return true;
    } else if (userYear == thisYear && userMonth == thisMonth && userDay < thisDay) {
        checkDate();
        dateEm.textContent = "Please input today or later.";
        return true;
    }
    return false;
}

const clearEm = (elem, error) => {
    elem.classList.remove("errorInput");
    elem.classList.add("border-transparent");
    error.classList.add("hidden");
    error.classList.remove("block");
    error.textContent = "";
}

taskNameEl.addEventListener("input", () => {
    if (taskNameEl.value.length <= 2) {
        checkTaskName();
        titleEm.textContent = "Task name should be at least 3 characters long";
    } else {
        clearEm(taskNameEl, titleEm);
    }
});

taskDateTimeEl.addEventListener("input", () => {
    switch (true) {
        case !taskDateTimeEl.value:
            checkDate();
            checkTime();
            dateEm.textContent = "Please add a date and time";
            break;
        case checkBackDateTime():
            checkBackDateTime();
            break;
        default:
            clearEm(taskDateTimeEl, dateEm);
            break;
    }
});

const clearData = () => {
    taskNameEl.value = '';
    taskDateTimeEl.value = '';
}
