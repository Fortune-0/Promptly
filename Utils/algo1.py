import datetime
import sqlite3

def db_connection():
    connection = sqlite3.connect('./promptly_db.sqlite')
    return connection

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
    
    conn.commit()
    cursor.close()
    conn.close()

    print("REMINDER SAVED SUCCESSFULLY!!!!\n")
    
def delete():
    conn = db_connection()
    cursor = conn.cursor()
    
    try:
        
        reminder_id = input("Enter the task id you want to delete ")
        
        if not reminder_id.isdigit():
            print("Invalid input! \n id should be a number")
            return

        reminder_id = int(reminder_id)
        query = "DELETE FROM reminders WHERE id = ?"
        cursor.execute(query, (reminder_id,))
        
        print(f"Reminder with id {reminder_id} has been deleted")
        conn.commit()
        
    except Exception as e:
        print(" An Error occured: ", e)
    finally:
        conn.close()
        
        
def showAll():
    """ Shows all the reminders stored in the database"""
    conn = db_connection()
    cursor = conn.cursor()
    try:
        query = "SELECT * FROM reminders"
        cursor.execute(query)
        reminders = cursor.fetchall()
        if not reminders:
            print("No reminders found.")
            return
        print("All reminders:")
        for reminder in reminders:
            print(reminder)
    except Exception as e:
        print(f"An error occoured: {e}")
    finally:
        conn.close()
# def delete():
#     conn = db_connection()
#     cursor = conn.cursor()
    
    
        
#     reminder_id = int(input("Enter the task id you want to delete "))
        
        
#     # reminder_id = int(reminder_id)
#     query = "DELETE FROM reminders WHERE id = ?"
#     cursor.execute(query, (reminder_id,))
#     conn.commit()
        
    
#     conn.close()

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

# create()
# delete()
showAll()
# Example usage of get_reminder_by_id:
# reminder_id = input("Enter the reminder ID: ")
# reminder = get_reminder_by_id(reminder_id)
# if reminder:
#     print("Reminder found:", reminder)
# else:
#     print("No reminder found with that ID.")
