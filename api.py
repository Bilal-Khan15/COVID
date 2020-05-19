from flask import Flask, request, jsonify, make_response
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import peewee as pw
from functools import wraps

from VerificationEmai import send_email
from TokenGenerator import token_generator

# Connect to MySQL DB
DB_NAME = "covid"
db = pw.MySQLDatabase(DB_NAME, host="localhost", port=3306, user="root", passwd="root")


# User Model
class User(pw.Model):
    fname = pw.TextField()
    lname = pw.TextField()
    institution = pw.TextField()
    mobile = pw.CharField()
    email = pw.CharField()
    password = pw.CharField()
    token = pw.CharField()

    class Meta:
        database = db


# Create User Table
User.create_table()

# Flask App
app = Flask(__name__)

app.config['SECRET_KEY'] = 'thisissecret'  # Secret Key for JWT
app.config['DOMAIN'] = '127.0.0.1:5000'  # Domain Name


# Protected Routes Wrapper to Check JWT Token
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message': 'Not Allowed'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.get(User.email == data['email'])
        except:
            return jsonify({'message': 'Invalid Token'}), 401

        return f(current_user, *args, **kwargs)

    return decorated


# Route to create user
@app.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()

    # Validate Request
    if (data['fname'] == '' or data['lname'] == '' or data['institution'] == '' or data['mobile'] == '' or data['email'] == '' or data['password'] == '' or data['confirm_password'] == ''):
        return make_response('Error: Form Fields Missing', 400)

    if data['password'] != data['confirm_password']:
        return make_response('Error: Passwords Mismatched', 400)

    query = User.select().where(User.email == data['email'])  # Check if user exists
    if query.exists():
        return make_response('Error: Email Already Exists', 400)

    # Hash Password
    hashed_password = generate_password_hash(data['password'], method='sha256')

    # Generate Token for Email Verification
    token = token_generator(32)

    # Create Entry
    User.create_table()
    user = User(fname=data['fname'], lname=data['lname'], institution=data['institution'], mobile=data['mobile'], email=data['email'], password=hashed_password, token=token)
    user.save()

    # Return Response
    return jsonify({'message': 'New user created!', "user": data})


@app.route('/login')
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:  # Check if request is valid
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    # Get User Info and Check Password
    user = User.get(User.email == auth.username)
    if not check_password_hash(user.password, auth.password):
        return make_response('Invalid Credentials', 401)

    # Generate JWT
    token = jwt.encode({'email': auth.username, 'fname': user.fname, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=3000)},
                       app.config['SECRET_KEY'])

    # Update User Token
    user.token = token
    user.save()

    return jsonify({'token': token.decode('UTF-8')})


# Route to activate user account
@app.route('/activate/<token>', methods=['GET'])
def activate_user(token):
    # Get user by token
    query = User.select().where(User.token == token)

    # If user exists
    if query.exists():
        user = User.get(User.token == token)
        user.is_active = True
        user.token = token_generator(32)  # Update Token
        user.save()
        return jsonify({'message': 'User Activated', 'Name': user.name})

    return make_response('Error: Invalid Token', 400)




# Protected Route
@app.route('/protected', methods=['POST'])
@token_required
def protected_route(current_user):
    return jsonify({'name': current_user.name, 'email': current_user.email})






# Reset Password
@app.route('/resetPassword', methods=['PUT'])
@token_required
def reset_password(current_user):

    data = request.get_json()    # Get Request Fields

    # Check if passwords match
    if data['password'] != data['confirm_password']:
        return make_response('Error: Passwords Mismatched', 400)

    # Hash Password
    hashed_password = generate_password_hash(data['password'], method='sha256')

    # Update Password
    user = User.get(User.email == current_user.email)
    user.password = hashed_password
    user.save()

    return jsonify({'Message': 'Password has been updated'})





# Delete User
@app.route('/revoke', methods=['DELETE'])
@token_required
def delete_user(current_user):
    if not current_user:
        return jsonify({'message' : 'No user found!'})

    # Get User Records and delete it
    user = User.get(User.email == current_user.email)
    user.is_active = False
    user.token = ''
    user.save()
    return jsonify({'message': 'The user has been deleted!'})


if __name__ == '__main__':
    app.run(debug=True)
