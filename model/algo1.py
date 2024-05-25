import datetime
import sqlite3

def db_connection():
    db_connection.connection = sqlite3.connect('prompt_db')
    return db_connection

def create():
    # Connect to MySQL database
    conn = db_connection()
    cursor = conn.cursor()

    task = input("Enter the task/event: ")
    while True:
        try:
            dat = input("Enter the date DD-MM: ")
            datetime.datetime.strptime(dat, "%d-%m")
            day, month = map(int, dat.split("-"))
            if day <= 31 and month <= 12:
                break
            else:
                print("Out of range, input a valid date")
        except ValueError:
            print("Invalid date format. Please enter date in DD-MM format e.g 23-05")
            continue

    while True:
        tim = input("Enter the time HH:MM ")
        if len(tim) == 3 or len(tim) < 2 or len(tim) > 5:
            print("Invalid time format. Please enter time HH:MM e.g 05:23")
        else:
            try:
                hours, minutes = map(int, tim.split(":"))
                if hours <= 24 and minutes <= 60:
                    break
                else:
                    print(f"Out Of Range, input a valid time. A day has only 24hrs and 60min \nThe time you entered {tim} is above 24hrs")
            except ValueError:
                print("Invalid input, Enter time in number format.")

    print("REMINDER CREATED SUCCESSFULLY")

    reminder = {
        'task': task,
        'date': datetime.datetime.strptime(dat, "%d-%m").strftime("%Y-%m-%d"),
        'time': tim + ":00"
    }

    # Insert reminder into the database
    cursor.execute("""
        INSERT INTO reminders (task, date, time)
        VALUES (?, ?, ?)
    """, (reminder['task'], reminder['date'], reminder['time']))
    
    db_connection.commit()
    cursor.close()
    db_connection.close()

    print("Reminder Saved Successfully\n")
# def update():
    
#     pass

# def get_reminder_by_id(reminder_id):
#     conn = mysql.connector.connect(
#         host='localhost',
#         user='your_username',
#         password='your_password',
#         database='reminders_db'
#     )
#     cursor = conn.cursor(dictionary=True)
    
#     cursor.execute("SELECT * FROM reminders WHERE id = %s", (reminder_id,))
#     reminder = cursor.fetchone()
    
#     cursor.close()
#     conn.close()
    
#     return reminder

create()
# Example usage of get_reminder_by_id:
# reminder_id = input("Enter the reminder ID: ")
# reminder = get_reminder_by_id(reminder_id)
# if reminder:
#     print("Reminder found:", reminder)
# else:
#     print("No reminder found with that ID.")
