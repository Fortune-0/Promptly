import datetime
import sqlite3

class ReminderApp:
    def __init__(self, db_path='./promptly_db.sqlite'):
        self.db_path = db_path

    def db_connection(self):
        connection = sqlite3.connect(self.db_path)
        return connection

    def create(self):
        conn = self.db_connection()
        cursor = conn.cursor()
        current_year = datetime.datetime.now().year
        
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
                print("Day must be between 1 and 31, and month must be between 1 and 12.")
                continue

        while True:
            tim = input("Enter the time in 24hr format HH:MM ")
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
        date_str_with_year = f'{dat}-{current_year}'

        reminder = {
            'task': task,
            'date': datetime.datetime.strptime(date_str_with_year, "%d-%m-%Y").strftime("%Y-%m-%d"),
            'time': tim + ":00"
        }

        cursor.execute("""
            INSERT INTO reminders (task, date, time)
            VALUES (?, ?, ?)
        """, (reminder['task'], reminder['date'], reminder['time']))
        
        conn.commit()
        cursor.close()
        conn.close()

        print("REMINDER SAVED SUCCESSFULLY!!!!\n")

    def delete(self):
        conn = self.db_connection()
        cursor = conn.cursor()
        
        print("NOTE!!!\n Always use the show command first before you delete anything")

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
            print(" An Error occurred: ", e)
        finally:
            conn.close()
            
    def show_all(self):
        conn = self.db_connection()
        cursor = conn.cursor()
        try:
            query = "SELECT * FROM reminders"
            cursor.execute(query)
            reminders = cursor.fetchall()
            if not reminders:
                print("No reminders found.")
                return
            print("All reminders:\n")
            for row in reminders:
                id, task, date, time = row
                print(f"Reminder ID: {id}\nTask: {task}\nDate: {date}\nTime: {time}\n{'-'*20}")
        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            conn.close()

    def update(self):
        conn = self.db_connection()
        cursor = conn.cursor()
        
        id = input("Enter the id of the reminder to update: ")

        updates = []
        for field in ['task', 'date', 'time']:
            new_value = input(f"Enter the new {field} (or leave blank to keep the same): ")
            if new_value:
                updates.append((field, new_value))

        set_clause = ', '.join(f"{field} = ?" for field, _ in updates)
        query = f"""
        UPDATE reminders
        SET {set_clause}
        WHERE id = ?
        """

        values = tuple(value for _, value in updates) + (id,)

        cursor.execute(query, values)
        conn.commit()
        cursor.close()
        conn.close()
        

if __name__ == "__main__":
    app = ReminderApp()

    app.create()
    # while True:
    #     print("1. Create Reminder")
    #     print("2. Delete Reminder")
    #     print("3. Show All Reminders")
    #     print("4. Update Reminder")
    #     print("5. Exit")

    #     choice = input("Enter your choice: ")

    #     if choice == '1':
    #         app.create()
    #     elif choice == '2':
    #         app.delete()
    #     elif choice == '3':
    #         app.show_all()
    #     elif choice == '4':
    #         app.update()
    #     elif choice == '5':
    #         break
    #     else:
    #         print("Invalid choice. Please enter a number between 1 and 5.")       