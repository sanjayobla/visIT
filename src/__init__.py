from flask import Flask, render_template, redirect, url_for
import os

# Define the WSGI application object
app = Flask(__name__, template_folder="", static_url_path="", static_folder="")
app.config.from_object(__name__)

app.config["MONGODB_SETTINGS"] = {'DB': "jigsaw"}
app.config["SECRET_KEY"] = "c39dcb77e31b57bb094e816c4982ac3c"

UPLOAD_FOLDER = os.path.join('.', os.path.abspath(os.path.join(__file__, '..')), 'upload/')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

@app.route("/")
def index():
	return render_template('index_serve.html')

# Sample HTTP error handling
@app.errorhandler(404)
def not_found(error):
    return "TODO: 404 page", 404

from src.apis.data.controller import mod_data as mod_data
from src.apis.list.controller import mod_list as mod_list

# Register blueprint(s)
app.register_blueprint(mod_data)
app.register_blueprint(mod_list)