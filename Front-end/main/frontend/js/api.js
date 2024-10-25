// Function to submit task to Flask backend
export async function submitTask(data) {
    const response = await fetch('http://127.0.0.1:5000/api/Reminder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

//function to put task to flask backend

export async function putTask(data, taskId) {
    const response = await fetch('http://127.0.0.1:5000/api/update/' + taskId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        return response.json();
    } else {
        console.log("bad request");   
    }
    
}