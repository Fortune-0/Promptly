import tkinter as tk
from tkinter import messagebox

def add_reminder():
    task = task_entry.get()
    date = date_entry.get()
    time = time_entry.get()
    # Add reminder to the database
    # (Ensure to validate and handle the database operations here)
    messagebox.showinfo("Success", "Reminder added successfully!")
    # Clear input fields
    task_entry.delete(0, tk.END)
    date_entry.delete(0, tk.END)
    time_entry.delete(0, tk.END)

root = tk.Tk()
root.title("Promptly - Reminder Application")

tk.Label(root, text="Task:").grid(row=0)
tk.Label(root, text="Date (YYYY-MM-DD):").grid(row=1)
tk.Label(root, text="Time (HH:MM:SS):").grid(row=2)

task_entry = tk.Entry(root)
date_entry = tk.Entry(root)
time_entry = tk.Entry(root)

task_entry.grid(row=0, column=1)
date_entry.grid(row=1, column=1)
time_entry.grid(row=2, column=1)

tk.Button(root, text="Add Reminder", command=add_reminder).grid(row=3, column=1)

root.mainloop()
