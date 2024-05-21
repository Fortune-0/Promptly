import cmd
import json
import os

class promptly(cmd.Cmd):
    """The Promptly command line interface"""
    prompt = "Promptly ##   "
    intro = "Welcome to Promptly Command line interface"
    
    def do_exit(self, arg):
        """Quits the promptly cli"""
        return True
    def do_restart(self, *args):
        """Restarts the promptly cli"""
        print("Restarting................")
        os.system("python3 console.py")
    
    def do_show(self, *args):
        """Shows all the reminders"""
        with open("reminders.json", "r") as f:
            reminder = json.load(f)
            
            print(reminder)
    
if __name__ == "__main__":
    promptly().cmdloop()
    