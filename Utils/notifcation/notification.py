from toastify import notify
import datetime
from apscheduler.schedulers.blocking import BlockingScheduler
import sqlite3

notification_start_time = None
def pull_reminder():
     global notification_start_time
     conn = sqlite3.connect('promptly_db.sqlite')
     c = conn.cursor()
     
     query = "SELECT  task, date, time FROM reminders"
     c.execute(query)
      
     table = c.fetchall()
     
     for dat_tim in table:
          task, date_str, time_str = dat_tim
          
          date = datetime.datetime.strptime(date_str, "%Y-%m-%d")
          time = datetime.datetime.strptime(time_str, "%H:%M:%S")
          # print(f" {task} this is the date {date.date()}, and time {time.time()} of the reminder")
          # print(datetime.date.today())
          
          current_date = datetime.date.today()
          current_time = datetime.datetime.now().time()
          # print(task)
     
          if date.date() == current_date and time.time() <= current_time:
               if notification_start_time is None:
                    notification_start_time = datetime.datetime.now()
                    elapsed_time = datetime.datetime.now() - notification_start_time
                    
                    if elapsed_time.seconds < 300:
                         notify(
                              BodyText=task,
                              AppName='Promptly app',
                              AppPath='AppPath (Optional)',
                              TitleText='Reminder',
                              ImagePath='icon.ico'
                              )
                    else:
                         print("Stopping notifications after 5 mins")
                         notification_start_time = None
                         print("No current reminder\n")
               # print(f"No current reminder now you have reminders set for {date.date()}, with time {time.time()}")
# if __name__ == "__main__":
#      pull_reminder()
               
          # date, time = dat_tim.split
          # if date == time:
          
          #      notify(title, message)
          #      time.sleep(1)
# pass
     # if date.date = 
# def notify(pull_reminder):
#      current = datatime.datatime.now()
#      if date == current:
#           notify (
# 	BodyText= task',
# 	AppName='Promptly app',
# 	AppPath='AppPath (Optional)',
# 	TitleText='TitleText (Optional)',
# 	ImagePath='icon.ico)'
# 	)
if __name__ == "__main__":
     scheduler = BlockingScheduler()
     scheduler.add_job(pull_reminder, 'interval', minutes=1)
     try:
        scheduler.start()
     except (KeyboardInterrupt, SystemExit):
          pass
# pull_reminder()