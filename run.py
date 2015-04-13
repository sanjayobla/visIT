import os, sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask.ext.script import Manager, Server
from flask.ext.triangle import Triangle
from src import app

manager = Manager(app)
Triangle(app)

# Turn on debugger by default and reloader
manager.add_command("runserver", Server( 
    use_debugger = True,
    use_reloader = True,
    host = '0.0.0.0',
    port = 8100)
)

if __name__ == "__main__":
    manager.run()