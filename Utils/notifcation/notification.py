from toastify import notify
import time
import sqlite3

def notify_reminder():
     conn = sqlite3.connect('promptly_db.sqlite')
     c = conn.cursor()
     
     query = "SELECT date, time FROM reminders"
     c.execute(query)
      
     table = c.fetchall()
     
     for dat_tim in table:
          date, time = dat_tim
          print(f"this is the date {date}, and time {time} of the reminder")
          # date, time = dat_tim.split
          # if date == time:
          #      notify(title, message)
          #      time.sleep(1)
pass

notify_reminder()