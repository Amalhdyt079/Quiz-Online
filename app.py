from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_migrate import Migrate

app = Flask(__name__)
api = Api(app)

# SQLAlchemy Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/quiz'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy extension
db = SQLAlchemy(app)
CORS(app)
migrate = Migrate(app, db)

# Model for Participant table
class Participant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    level = db.Column(db.String(100), nullable=False)
    score = db.Column(db.String(20), nullable=False)

# Model for User table
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

# Parser to extract data from requests
parser = reqparse.RequestParser()
parser.add_argument('name', type=str, help='Name of who join quiz')
parser.add_argument('category', type=str, help='Category of the quiz')
parser.add_argument('level', type=str, help='Level of the quiz')
parser.add_argument('score', type=str, help='Score of the quiz')

# Resource to handle CRUD operations on Participants
class ParticipantResource(Resource):
    def get(self, participant_id=None):
        if participant_id is None:
            participants = Participant.query.all()
            participants_list = [
                {'id': participant.id, 'name': participant.name, 'category': participant.category, 'level': participant.level, 'score': participant.score} 
                for participant in participants]
            return jsonify(participants_list)
        else:
            participant = Participant.query.get_or_404(participant_id)
            return jsonify({'id': participant.id, 'name': participant.name, 'category': participant.category, 'level': participant.level, 'score': participant.score})

    def post(self):
        args = parser.parse_args()
        new_participant = Participant(name=args['name'], category=args['category'], level=args['level'], score=args['score'])
        db.session.add(new_participant)
        db.session.commit()
        return jsonify({'message': 'Participant created successfully'})

    def put(self, participant_id):
        args = parser.parse_args()
        participant = Participant.query.get_or_404(participant_id)
        participant.name = args['name']
        participant.category = args['category']
        participant.level = args['level']
        participant.score = args['score']
        db.session.commit()
        return jsonify({'message': 'Participant updated successfully'})

    def delete(self, participant_id):
        participant = Participant.query.get_or_404(participant_id)
        db.session.delete(participant)
        db.session.commit()
        return jsonify({'message': 'Participant deleted successfully'})

# Resource to handle CRUD operations on Users
class UserResource(Resource):
    def post(self):
        data = request.json
        username = data['username']
        password = data['password']

        # Encrypt the password before storing it in the database
        hashed_password = generate_password_hash(password)

        # Create a new User object
        new_user = User(username=username, password=hashed_password)

        # Save the user to the database
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully'})

# Resource to handle login
class LoginResource(Resource):
    def post(self):
        data = request.json
        username = data['username']
        password = data['password']

        # Fetch the user from the database based on the username
        user = User.query.filter_by(username=username).first()

        # Check if the user exists and the password matches
        if user and check_password_hash(user.password, password):
            return jsonify({'message': 'Login successful'})     
        else:
            return jsonify({'message': 'Invalid username or password'})

# Add resources to the API with the appropriate endpoints
api.add_resource(ParticipantResource,
                 '/participants',
                 '/participants/<int:participant_id>',
                 '/participants/add',
                 '/participants/edit/<int:participant_id>',
                 '/participants/delete/<int:participant_id>')
api.add_resource(UserResource, '/register')
api.add_resource(LoginResource, '/login')

if __name__ == '__main__':
    with app.app_context():
        # Create tables in the database if they don't exist
        db.create_all()
    app.run(debug=True)
