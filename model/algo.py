#!/usr/env/python3

def create():
    task = input("Enter the task/event: ")
    # date = input(" Enter the date ")
    while True:
        tim = input("Enter the time HH:MM ")
        if len(tim) == 3 or len(tim) <2 or len(tim) > 5:
            print("Invalid time format. Please enter time HH:MM e.g 05:23")
        elif len(tim) == 2:
            print("Invalid time format. Please enter the minutes MM")
        else:
            try:
                hours, minutes = map(int, tim.split(":"))
                if hours < 24 and minutes < 60:
                    break
                else:
                    print("Invalid time format. Enter time in HH:MM e.g 05:23")
            except ValueError:
                print("Invalid input,\n Enter time in number format.")
        
    
    print(task)
    print(tim)
# date = input("Enter the date (YYYY-MM-DD): ")
create()