    // Fetch tasks from Flask API
    
    const loadingScreen = document.getElementById('loading-screen'),
            mainContent = document.getElementById('taskList');
(async () => {
                try {
                    // if (loadingScreen) loadingScreen.classList.remove('hidden'); // Show loading screen
                    // Fetch the data from the API
                    const response = await fetch('http://127.0.0.1:5000/api/allReminder');
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    // if (response.ok) {
                    //     if (loadingScreen) loadingScreen.classList.remove('flex');
                    //     if (loadingScreen) loadingScreen.classList.add('hidden'); // Hide loading screen
                    //     if (mainContent) mainContent.classList.remove('hidden'); // Show main content
                    // }
            
                    let tasks = await response.json();

                    console.log(tasks);
                    
            
                    // Loop through each task and create the HTML structure
                    tasks.forEach(task => {
                        const taskParentContainer = document.createElement('article');
                        taskParentContainer.setAttribute('data-task-id', task.id);
                        taskParentContainer.classList.add("flex", "task", "taskContainer", "mb-5", "hover:border-blue-300", "border", "bg-white", "cursor-pointer", "p-6", "hover:scale-105", "transition-all", "rounded-xl");
            
                        // Use correct string interpolation for task properties
                        taskParentContainer.innerHTML = `
                            <div class="text-green-500">
                                <h3 class="taskNameHeader">${task.task}</h3>
                                <div class="taskContent">
                                    <p class="hidden time">${task.time}</p>
                                    <p class="text-xs">Time: <span class="finalTime">${new Date(task.date+"T"+task.time).toLocaleTimeString('en-US', {hour12: true}).replace(/:\d+ /, ' ')}</span></p>
                                    <p class="text-xs">Date: <span class="date">${new Date(task.date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span></p>
                                </div>
                            </div>
                            <div class="ml-auto mt-auto hidden btns">
                                <button class="taskDeleteBtn" title="Delete Reminder" class="mr-3">
                                    <svg width="40px" height="40px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7H20" stroke="#f87171" stroke-width="1.224" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10" stroke="#f87171" stroke-width="1.224" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#f87171" stroke-width="1.224" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                </button>
                                <button class="taskEditBtn" title="Edit Reminder">
                                    <svg width="40px" height="40px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#93c5fd"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.2"></g><g id="SVGRepo_iconCarrier"> <path stroke="#93c5fd" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.02" d="M3.8 12.963L2 18l4.8-.63L18.11 6.58a2.612 2.612 0 00-3.601-3.785L3.8 12.963z"></path> </g></svg>
                                </button>
                            </div>
                        `;
            
                        // Append the task container to the task list
                        document.getElementById('taskList').appendChild(taskParentContainer);
                        
                    });
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
                        dateEm = document.querySelector("#errorDate");
                        

                    totalNumContainer[0].textContent = totalNumberOfTasks;

                    // Handle task deletion with Flask API
                    deleteBtns.forEach(deleteBtn => {
                        deleteBtn.addEventListener("click", async function () {
                            const parentEl = this.closest(".task");
                            if (parentEl) {
                                const taskId = parentEl.getAttribute('data-task-id');
                                console.log(taskId);
                                

                                // Send DELETE request to Flask API
                                const response = await fetch('http://127.0.0.1:5000/api/delete/'+ taskId, {
                                    method: 'DELETE'
                                });

                                if (response.ok) {
                                    parentEl.remove();
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
                        clearData();
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
                                let task = firstLetter_TN + restName;

                                let dateTime = taskInputDateTime.value;
                                let [date, time] = dateTime.split("T");

                                // Send PUT request to Flask API to update the task
                                const response = await fetch('http://127.0.0.1:5000/api/update/' + taskId, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        task,
                                        dateTime: {date, time}
                                    })
                                });

                                const formattedDate = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
                                const formattedTime = new Date(dateTime).toLocaleTimeString('en-US', { hour12: true }).replace(/:\d+ /, ' ');

                                if (response.ok) {
                                    let finalTaskTime = parentElement.querySelector(".finalTime");
                                    let finalTaskDate = parentElement.querySelector(".date");
                                    let editInputTime = parentElement.querySelector(".time");
                                    editInputTime.textContent = time;
                                    finalTaskDate.textContent = formattedDate;
                                    finalTaskTime.textContent = formattedTime;

                                    clearData();
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
                    const taskNameError = () => {
                        titleEm.textContent = "Please add a title";
                        titleEm.classList.remove("hidden");
                        taskNameEl.classList.remove("border-transparent");
                        titleEm.classList.add("block");
                        taskNameEl.classList.add("errorInput");
                    }

                    const dateError = () => {
                        dateEm.textContent = "Please select a date";
                        dateEm.classList.remove("hidden");
                        taskDateTimeEl.classList.remove("border-transparent");
                        dateEm.classList.add("block");
                        taskDateTimeEl.classList.add("errorInput");
                    }

                    const timeError = () => {
                        dateError();
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
                            timeError();
                            dateEm.textContent = "Please input this hour or later";
                            return true;
                        } else if (userMonth == thisMonth && userDay == thisDay && userHour == thisHour && userMinutes <= thisMinute) {
                            timeError();
                            dateEm.textContent = "Please input some mins in the future";
                            return true;
                        }

                        if (userYear < thisYear) {
                            dateError();
                            dateEm.textContent = "Please input this year or later.";
                            return true;
                        } else if (userMonth < thisMonth) {
                            dateError();
                            dateEm.textContent = "Please input this month or later.";
                            return true;
                        } else if (userYear == thisYear && userMonth == thisMonth && userDay < thisDay) {
                            dateError();
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
                            taskNameError();
                            titleEm.textContent = "Task name should be at least 3 characters long";
                        } else {
                            clearEm(taskNameEl, titleEm);
                        }
                    });

                    taskDateTimeEl.addEventListener("input", () => {
                        switch (true) {
                            case !taskDateTimeEl.value:
                                dateError();
                                timeError();
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
            
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                    alert('Failed to load');
                }
})();

// add reminder_id to line 87 in app.py to fix error message in editing task
    

