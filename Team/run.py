from flask import Flask, render_template
import os

template_dir = os.path.join(os.path.dirname(__file__), 'app', 'templates')
static_dir = os.path.join(os.path.dirname(__file__), 'app', 'static')

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

@app.route('/')
def login():
    return render_template('index.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/board')
def board():
    return render_template('board.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

if __name__ == '__main__':
    app.run(debug=True)
