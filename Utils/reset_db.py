import sqlite3
def clear_database():
    # Connect to MySQL database
    conn = sqlite3.connect('./promptly_db.sqlite')
    cursor = conn.cursor()

    # Execute SQL DELETE statement
    cursor.execute("DELETE FROM reminders")
    cursor.execute("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='reminders'")

    # Commit the changes
    conn.commit()

    cursor.close()
    conn.close()

    print("Database cleared successfully!")

clear_database()