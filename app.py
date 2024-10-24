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

@app.route('/api/allReminder', methods=['GET'])
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

@app.route('/api/delete/<int:reminder_id>', methods=['DELETE'])
def delete_reminder(reminder_id):
    """Delete reminder from the database

    Args:
        reminder_id (int): pass the number of the id to be deleted

    Returns:
        _type_: _description_
    """
    try:
        with connect_db() as conn:
            cursor = conn.cursor()
            cursor.execute('''DELETE FROM reminders WHERE id = ?''', (reminder_id,))
            if cursor.rowcount == 0:
                return jsonify({"message": "Reminder not found!"}), 404
            conn.commit()
        
        return jsonify({"message": "Reminder deleted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/update/<int:reminder_id>', methods=['PUT'])
def update_reminder(reminder_id):
    """ Updates the reminder """
    try:
        data = request.get_json()
        task = data.get('task')
        date = data.get('dateTime', {}).get('date')
        time = data.get('dateTime', {}).get('time')
        
        with connect_db() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                           UPDATE reminders
                           set task = ?, date = ?, time = ?
                           WHERe id = ?
                           ''', (task, date, time, reminder_id))
            if cursor.rowcount == 0:
                return jsonify({"message": "Reminder not found!"}), 404
            conn.commit()
        return jsonify({"message": "Reminder successfully updated!"}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

            
if __name__ == '__main__':
    app.run(debug=True)
