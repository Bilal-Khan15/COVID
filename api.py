from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import peewee as pw
from functools import wraps
import datetime
from VerificationEmai import send_email
from TokenGenerator import token_generator

# Connect to MySQL DB
DB_NAME = "covid"
db = pw.MySQLDatabase(DB_NAME, host="localhost", port=3306, user="root", passwd="root")


# Triage Model
class Triage(pw.Model):
    fname = pw.TextField()
    lname = pw.TextField()
    sex = pw.TextField()
    dob = pw.TextField()
    mobile = pw.CharField()
    email = pw.CharField()
    address = pw.TextField()
    id_number = pw.CharField()
    nig = pw.BooleanField()
    fever = pw.BooleanField()
    cough = pw.BooleanField()
    breath = pw.BooleanField()
    other = pw.TextField()
    travel = pw.BooleanField()
    contact_case = pw.BooleanField()
    hf = pw.BooleanField()
    dead = pw.BooleanField()
    status = pw.TextField()
    reg_date = pw.TextField()
    evacuate = pw.TextField()
    discharge = pw.TextField()
    epid = pw.TextField()
    center = pw.TextField()
    outcome = pw.TextField()
    current_status = pw.TextField()
    throat = pw.BooleanField()
    hospital = pw.TextField()

    class Meta:
        database = db

# Create Triage Table
Triage.create_table()


# Triage Model
class Lab(pw.Model):
    email = pw.CharField()
    types = pw.TextField()
    condition = pw.TextField()
    collection_date = pw.TextField()
    lab_date = pw.TextField()
    epid = pw.TextField()
    test = pw.TextField()
    viral = pw.TextField()
    diagnosis = pw.TextField()
    fever = pw.BooleanField()
    cough = pw.BooleanField()
    breath = pw.BooleanField()
    travel = pw.BooleanField()
    contact_case = pw.BooleanField()
    hf = pw.BooleanField()
    status = pw.TextField()

    class Meta:
        database = db

# Create Triage Table
Lab.create_table()


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


# db.create_tables([User, Triage])

# Flask App
app = Flask(__name__)

app.config['SECRET_KEY'] = 'thisissecret'  # Secret Key for JWT
app.config['DOMAIN'] = '127.0.0.1:5000'  # Domain Name


# Route to create user
@cross_origin
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


@cross_origin
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


@cross_origin
@app.route('/checkEmail', methods=['POST'])
def check_email():
    data = request.get_json()

    # Validate Request
    if (data['email'] == ''):
        return make_response('Error: Form Fields Missing', 400)

    query = User.select().where(User.email == data['email'])  # Check if user exists
    if query.exists():
        return jsonify({'message': 'User verified!', "user": data})

    # Return Response
    return make_response('Error: User does not exist ', 400)


# Reset Password
@cross_origin
@app.route('/resetPassword', methods=['PUT'])
def reset_password():

    data = request.get_json()    # Get Request Fields

    # Validate Request
    if (data['email'] == '' or data['password'] == '' or data['confirm_password'] == ''):
        return make_response('Error: Form Fields Missing', 400)

    # Check if passwords match
    if data['password'] != data['confirm_password']:
        return make_response('Error: Passwords Mismatched', 400)

    # Hash Password
    hashed_password = generate_password_hash(data['password'], method='sha256')

    # Update Password
    user = User.get(User.email == data['email'])
    user.password = hashed_password
    user.save()

    return jsonify({'Message': 'Password has been updated'})


# Route to create triage
@cross_origin
@app.route('/createTriage', methods=['POST'])
def create_triage():
    data = request.get_json()
    status = ""
    reg_date = str(datetime.datetime.now()).split(" ")[0]

    # Validate Request
    if (data['fname'] == '' or data['lname'] == '' or data['sex'] == '' or data['dob'] == '' or data['mobile'] == '' or data['email'] == '' or data['address'] == '' or data['id'] == '' or data['nig'] == ''):
        return make_response('Error: Form Fields Missing', 400)

    query = Triage.select().where(Triage.email == data['email'])  # Check if user exists
    if query.exists():
        return make_response('Error: Email Already Exists', 400)

    if((data["fever"] or data["cough"] or data["breath"]) and (data["travel"] or data["contact_case"] or data["hf"])):
        status = "High risk"
    else:
        status = "Low risk"
        
    # Create Entry
    Triage.create_table()
    triage = Triage(fname=data['fname'], lname=data['lname'], sex=data['sex'], dob=data['dob'], mobile=data['mobile'], email=data['email'], address=data['address'], id_number=data['id'], nig=data['nig'], fever=data['fever'], cough=data['cough'], breath=data['breath'], other=data['other'], travel=data['travel'], contact_case=data['contact_case'], hf=data['hf'], dead=False, throat=False, hospital="", status=status, reg_date=reg_date, evacuate="", discharge="", epid="", center="", outcome="", current_status="Suspected")
    triage.save()

    # Return Response
    return jsonify({'message': 'New triage registered!', "status": status})


@cross_origin
@app.route('/dead', methods=['PUT'])
def dead():

    data = request.get_json()    # Get Request Fields

    # Update Symptoms
    triage = Triage.get(Triage.email == data['email'])
    triage.dead = data['dead']
    triage.save()

    return jsonify({'Message': 'Triage has been updated'})


@cross_origin
@app.route('/triage')
def triage():
    cases = []
    
    query = Triage.select().dicts()
    for user in query:
        cases.append(user)

    # Return Response
    return jsonify({"triage": cases})


@cross_origin
@app.route('/updateSymptoms', methods=['PUT'])
def update_symptoms():

    data = request.get_json()    # Get Request Fields

    # Update Symptoms
    triage = Triage.get(Triage.email == data['email'])
    triage.fever = data['fever']
    triage.throat = data['throat']
    triage.cough = data['cough']
    triage.breath = data['breath']
    triage.other = data['other']
    triage.hospital = data['hospital']
    triage.outcome = data['outcome']
    triage.dead = data['dead']
    triage.save()

    return jsonify({'Message': 'Triage has been updated'})


@cross_origin
@app.route('/updateEpid', methods=['PUT'])
def update_epid():

    data = request.get_json()    # Get Request Fields

    # Update Symptoms
    triage = Triage.get(Triage.email == data['email'])
    triage.evacuate = data['evacuate']
    triage.discharge = data['discharge']
    triage.epid = data['epid']
    triage.center = data['center']
    triage.save()

    return jsonify({'Message': 'Triage has been updated'})


@cross_origin
@app.route('/suspected')
def suspected():
    cases = []
    
    query = Triage.select().dicts()
    for user in query:
        if(user['current_status'] == "Suspected"):
            cases.append(user)

    # Return Response
    return jsonify({"triage": cases})


# Route to create lab
@cross_origin
@app.route('/createLab', methods=['POST'])
def create_lab():
    data = request.get_json()
    status = ""

    # Validate Request
    if (data['email'] == '' or data['types'] == '' or data['condition'] == '' or data['collection_date'] == '' or data['lab_date'] == '' or data['epid'] == '' or data['test'] == '' or data['viral'] == '' or data['diagnosis'] == ''):
        return make_response('Error: Form Fields Missing', 400)

    query = Lab.select().where(Lab.email == data['email'])  # Check if user exists
    if query.exists():
        return make_response('Error: Email Already Exists', 400)

    if((data["fever"] or data["cough"] or data["breath"]) and (data["travel"] or data["contact_case"] or data["hf"]) and data['test'] == 'positive'):
        status = "Confirmed"
    else:
        status = "Probable"
        
    # Create Entry
    Lab.create_table()
    lab = Lab(email=data['email'], types=data['types'], condition=data['condition'], collection_date=data['collection_date'], lab_date=data['lab_date'], epid=data['epid'], test=data['test'], viral=data['viral'], diagnosis=data['diagnosis'], fever=data['fever'], cough=data['cough'], breath=data['breath'], travel=data['travel'], contact_case=data['contact_case'], hf=data['hf'], status=status)
    lab.save()

    # Return Response
    return jsonify({'message': 'New Lab registered!', "status": status})


@cross_origin
@app.route('/case', methods=['POST'])
def case():
    data = request.get_json()
    cases = []
    
    query = Triage.select().where(Triage.id_number == data['id']).dicts()
    for user in query:
        cases.append(user)

    # Return Response
    return jsonify({"triage": cases})



# triaged = Triage.select().dicts()
# lab = Lab.select().dicts()
# print(len(lab))






















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


# Route to activate user account
@cross_origin
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
@cross_origin
@app.route('/protected', methods=['POST'])
@token_required
def protected_route(current_user):
    return jsonify({'name': current_user.name, 'email': current_user.email})


# Delete User
@cross_origin
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
