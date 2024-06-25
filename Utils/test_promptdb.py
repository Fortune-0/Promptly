import sqlite3

def check_table():
    conn = sqlite3.connect('../promptly.db')  # Adjust path if needed
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='reminders';")
    table_exists = cursor.fetchone()
    if table_exists:
        print("Table 'reminders' exists.")
    else:
        print("Table 'reminders' does not exist.")
    conn.close()

check_table()
