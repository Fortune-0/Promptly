import sqlite3
''''Creates the project DATABASE'''

def setup_db():
    # create promptly.db if it doesn't exit
    conn = sqlite3.connect('./apromptly_db.sqlite')
    cursor = conn.cursor()
    cursor.execute('''
                   CREATE TABLE IF NOT EXISTS reminders(
                       id INTEGER PRIMARY KEY AUTOINCREMENT,
                       task TEXT NOT NULL,
                       date DATE NOT NULL,
                       time TIME NOT NULL
                       )
                       ''')
    conn.commit()
    conn.close()

setup_db()
print("Database created successfully")

# import sqlite3

# def setup_database():
#     conn = sqlite3.connect('../promptly.db')  # Adjust path if needed
#     cursor = conn.cursor()
#     cursor.execute('''
#         CREATE TABLE IF NOT EXISTS reminders (
#             id INTEGER PRIMARY KEY AUTOINCREMENT,
#             task TEXT NOT NULL,
#             date DATE NOT NULL,
#             time TIME NOT NULL
#         )
#     ''')
#     conn.commit()
#     conn.close()

# # Run this function once to set up the database
# setup_database()
# print("Database created successfully")
