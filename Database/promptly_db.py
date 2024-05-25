import sqlite3

def setup_db():
    # create promptly.db if it doesn't exit
    conn = sqlite3.connect('promptly.db')
    cursor = conn.cursor()
    cursor.execute('''
                   CREATE TABLE IF NOT EXISTS reminders(
                       id INTEGER PRIMARY AUTOINCREMENT,
                       task TEXT NOT NULL,
                       date DATE NOT NULL,
                       time TIME NOT NULL
                       )
                       ''')
    conn.commit()
    conn.close

setup_db()