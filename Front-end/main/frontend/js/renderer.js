const taskNameEl = document.getElementById('taskName'),
        taskDateTimeEl = document.getElementById('taskDateTime'),
        taskSubmit = document.getElementById('submitBtn'),
        titleEm = document.getElementById('errorTitle'),
        dateEm = document.getElementById('errorDate'),
        timeEm = document.getElementById('errorTime'),
        totalTaskContainer = document.getElementById('tasks');

const   thisDay = new Date().getDate(),
        thisMonth = new Date().getMonth(),
        thisHour = new Date().getHours(),
        thisMinute = new Date().getMinutes(),
        thisSecond = new Date().getSeconds(),
        thisYear = new Date().getFullYear();

// Function to submit task to Flask backend
async function submitTask(data) {
    const response = await fetch('http://127.0.0.1:5000/api/Reminder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

taskSubmit.addEventListener('click', async () => {
    var task = taskNameEl.value,
    dateTime = taskDateTimeEl.value;

    const [date, time] = dateTime.split('T');
    await submitTask({
        task,
        dateTime: {date, time}
    });

    console.log(dateTime);
    

    
    const formattedDate = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedTime = new Date(dateTime).toLocaleTimeString('en-US', { hour12: true }).replace(/:\d+ /, ' ');

    

    const createTask = (taskContainer) => {
        var firstLetter_TN = task.slice(0, 1).toUpperCase();
        var restName = task.slice(1, task.length);
        var taskHeaderName = firstLetter_TN + restName;

        const taskDiv = document.createElement('article');
        taskDiv.classList.add('task', 'mb-3', 'flex-1');

        const taskNameHeader = document.createElement('h3');
        taskNameHeader.classList.add('taskNameHeader');
        taskNameHeader.textContent = taskHeaderName;

        const taskContent = document.createElement('div');
        taskContent.classList.add('taskContent');

        const taskDateParagraph = document.createElement('p');
        taskDateParagraph.classList.add("taskDate");
        const taskTimeParagraph = document.createElement('p');
        taskTimeParagraph.classList.add("taskTime");

        const taskInputTime = document.createElement('p');
        taskInputTime.classList.add("hidden", "time");
        taskInputTime.textContent = time;
        taskContent.appendChild(taskInputTime);

        taskDateParagraph.textContent = `Date: `;
        const taskDate = document.createElement('span');
        taskDate.classList.add("date");
        taskDate.textContent = formattedDate;
        taskDateParagraph.appendChild(taskDate);
        taskTimeParagraph.textContent = `Time: `;
        const taskTime = document.createElement('span');
        taskTime.classList.add("finalTime");
        taskTime.textContent = formattedTime;
        taskTimeParagraph.appendChild(taskTime);

        const executionTime = document.createElement('p');
        executionTime.classList.add('executionTime');
        const currentTime = new Date().toLocaleTimeString('en-US', { hour12: true }).replace(/:\d+ /, ' ');
        executionTime.textContent = ` ${currentTime}`;

        taskDiv.appendChild(taskNameHeader);
        taskContent.appendChild(taskTimeParagraph);
        taskContent.appendChild(taskDateParagraph);
        taskDiv.appendChild(taskContent);
        taskDiv.appendChild(executionTime);
        taskContainer.appendChild(taskDiv);
        clearData();
    };

    switch (true) {
        case !task && !dateTime:
            checkTaskName();
            checkDate();
            checkTime();
            dateEm.textContent = "Please select a specific date and time";
            break;
        case !task:
            checkTaskName();
            break;
        case !dateTime:
            checkDate();
            break;
        case checkBackDateTime():
            checkBackDateTime();
            break;
        default:
            createTask(totalTaskContainer);
            break;
    }
});

const checkTaskName = () => {
    titleEm.textContent = "Please add a title";
    titleEm.classList.remove("hidden");
    taskNameEl.classList.remove("border-transparent");
    titleEm.classList.add("block");
    taskNameEl.classList.add("errorInput");
};

const checkDate = () => {
    dateEm.textContent = "Please select a date";
    dateEm.classList.remove("hidden");
    taskDateTimeEl.classList.remove("border-transparent");
    dateEm.classList.add("block");
    taskDateTimeEl.classList.add("errorInput");
};

const checkTime = () => {
    checkDate();
    dateEm.textContent = "Please select a specific time";
};

const checkBackDateTime = () => {
    let taskDate = new Date(taskDateTimeEl.value),
        userMonth = taskDate.getMonth(),
        userDay = taskDate.getDate(),
        userYear = taskDate.getFullYear(),
        taskTime = new Date(taskDateTimeEl.value),
        userHour = taskTime.getHours(),
        userMinutes = taskTime.getMinutes(),
        userSecs = taskTime.getSeconds();

    if (userMonth == thisMonth && userDay == thisDay && userHour < thisHour) {
        checkTime();
        dateEm.textContent = "Please input this hour or later";
        return true;
    } else if (userMonth == thisMonth && userDay == thisDay && userHour == thisHour && userMinutes <= thisMinute && userSecs <= thisSecond) {
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
};

const clearEm = (elem, error) => {
    elem.classList.remove("errorInput");
    elem.classList.add("border-transparent");
    error.classList.add("hidden");
    error.classList.remove("block");
    error.textContent = "";
};

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
            dateEm.textContent = "please add a date and time";
            break;
        case checkBackDateTime():
            checkBackDateTime();
            break;
        default:
            clearEm(taskDateTimeEl, dateEm);
            break;
    }
});

totalTaskContainer.addEventListener('click', () => {
    setTimeout(()=> window.location.href = "allTasks.html", 500);
    // the timeout there is actually to set a delay so API calls can be made
});
const clearData = () => {
    taskNameEl.value = '';
    taskDateTimeEl.value = '';
}