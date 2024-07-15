print("Importing libraries")
from toastify import notify
import datetime
from apscheduler.schedulers.blocking import BlockingScheduler
import sqlite3

print("Program started running")
sent_notifications = set()

def pull_reminder():
    global sent_notifications
    print("Accessing the database")
    
    conn = sqlite3.connect('promptly_db.sqlite')
    c = conn.cursor()
    
    query = "SELECT task, date, time FROM reminders"
    c.execute(query)
    
    table = c.fetchall()
    
    for dat_tim in table:
        task, date_str, time_str = dat_tim
        
        date = datetime.datetime.strptime(date_str, "%Y-%m-%d")
        time = datetime.datetime.strptime(time_str, "%H:%M:%S").time()
        
        current_date = datetime.date.today()
        current_time = datetime.datetime.now().time()
        print("Information retrieved successfully\nChecking the date and time")
        
        if date.date() == current_date and time <= current_time:
            reminder_key = (task, date_str, time_str)
            if reminder_key not in sent_notifications:
                notify(
                    BodyText=task,
                    AppName='Promptly app',
                    AppPath='AppPath (Optional)',
                    TitleText='Reminder',
                    ImagePath='icon.ico'
                )
                print(f"Notification sent: {task} at {current_time}")
                sent_notifications.add(reminder_key)
        else:
            print(f"No current reminder. You have reminders set for {date.date()} at {time}")
    
    conn.close()

if __name__ == "__main__":
    scheduler = BlockingScheduler()
    scheduler.add_job(pull_reminder, 'interval', minutes=1)
    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        pass
