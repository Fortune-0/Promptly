import cmd
from Utils.algo2 import ReminderApp
import os
from Utils.promptly_db import setup_db

class promptly(cmd.Cmd):
    """The Promptly command line interface"""
    prompt = "Promptly ##   "
    intro = "Welcome to Promptly Command line interface"
    
    def __init__(self):
        super().__init__()
        self.algo2 = ReminderApp()
        
    def do_exit(self, arg):
        """Quits the promptly cli"""
        return True
    def do_restart(self, *args):
        """Restarts the promptly cli"""
        print("Restarting................")
        os.system("python3 console.py")
        
    def do_show(self, *args):
        """Shows all the Reminders in the Database"""
        self.algo2.show_all()
        
    def do_create(self, *args):
        """Creates a new Reminder"""
        self.algo2.create()
        
    def do_delete(self, *args):
        """Deletes a Reminder using reminder id fro, the database"""
        self.algo2.delete()
    
    def do_edit(self, *args):
        """Edits a Reminder using field from the database"""
        self.algo2.update()
    
    def do_setup(self, *args):
        """Sets up the database"""
        setup_db()
        print("Database created successfully")
                
if __name__ == "__main__":
    promptly().cmdloop()
    