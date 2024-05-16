#!/usr/env/python3
import datetime
import json

def create():
    task = input("Enter the task/event: ")
    while True:
        
        try:
            dat = input("Enter the date DD-MM: ")
            datetime.datetime.strptime(dat, "%d-%m")
            day, month = map(int, dat.split("-"))
            if day < 31 and month < 12:
                break
            else:
                print("Out of range, input a valid date")
        except ValueError:
            print("Invalid date format. Please enter date in DD-MM (Day & Month) format e.g 23-05")
            continue
        
    while True:
        tim = input("Enter the time HH:MM ")
        if len(tim) == 3 or len(tim) <2 or len(tim) > 5:
            print("Invalid time format. Please enter time HH:MM e.g 05:23")
        else:
            try:
                hours, minutes = map(int, tim.split(":"))
                if hours < 24 and minutes < 60:
                    break
                else:
                    print("Invalid time format. Enter time in HH:MM e.g 05:23")
            except ValueError:
                print("Invalid input,\n Enter time in number format.")
    
    print ("REMINDER CREATED SUCCESSFULLY")
                
    reminder = {
            'task': task,
            'date': dat,
            'time': tim
        }
    
    # reminder.append(reminder)
    
    with open("reminder.json",'w') as f:
        json.dump(reminder, f, indent=4)
        
        print("Reminder Saved Successfully\n")
                
# def update(arg):
        
    
    print("\n",task)
    print(tim)
    print(dat)
# date = input("Enter the date (YYYY-MM-DD): ")
create()