from toastify import notify
import datetime
import sqlite3

def pull_reminder():
    conn = sqlite3.connect('promptly_db.sqlite')
    c = conn.cursor()

    query = "SELECT task, date, time FROM reminders"
    c.execute(query)

    table = c.fetchall()

    for dat_tim in table:
        task, date_str, time_str = dat_tim

        date = datetime.datetime.strptime(date_str, "%Y-%m-%d")
        time = datetime.datetime.strptime(time_str, "%H:%M:%S")

        current_date = datetime.date.today()
        current_time = datetime.datetime.now().time()

        print(f"Task: {task}, Date: {date.date()}, Time: {time.time()}")

        if date.date() == current_date and time.time() <= current_time:
            notify(
                BodyText=task,
                AppName='Promptly app',
                AppPath='AppPath (Optional)',
                TitleText='TitleText (Optional)',
                ImagePath='icon.ico'
            )
        else:
            print(f"No current reminder now. You have reminders set for {date.date()} at {time.time()}.")

if __name__ == "__main__":
    pull_reminder()
