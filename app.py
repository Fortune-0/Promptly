from flask import Flask, request, jsonify
import sqlite3


app = Flask(__name__)

def connect_db():
    conn = sqlite3.connect('promptly_db.sqlite')
    return conn

@app.route('/api/Reminder', methods=['POST'])
def add_reminder():
    data = request.get_json()
    task = data['task']
    date = data['dateTime']['date']
    time = data['dateTime']['time']
    
    
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('''INSERT INTO reminders (task, date, time) VALUES (?, ?, ?)''', (task, date, time))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Reminder added successfully!"}), 201

@app.route('/api/Reminder', methods=['GET'])
def retrive_reminder():
    """ Retrives all the reminders in the database"""
    conn = connect_db()
    cursor = conn.cursor()
    
    cursor.execute('''SELECT id, task, date, time FROM reminders''')
    reminders = cursor.fetchall()
    
    # Convert the reminders to a list of dictionaries
    reminders_list = []
    for reminder in reminders:
        reminders_list.append({
            'id': reminder[0],
            'task': reminder[1],
            'date': reminder[2],
            'time': reminder[3]
        })
    
    conn.close()
    
    return jsonify(reminders_list), 200
    

if __name__ == '__main__':
    app.run(debug=True)
