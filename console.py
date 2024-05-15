import cmd

class promptly(cmd.Cmd):
    """The Promptly command line interface"""
    prompt = "Promptly ##   "
    intro = "Welcome to Promptly Command line interface"
    
    def do_exit(self, arg):
        """Quits the promptly cli"""
        return True
    
if __name__ == "__main__":
    promptly().cmdloop()
    