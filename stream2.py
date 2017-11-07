from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os

app = Flask(__name__)

MONGODB_URI = os.environ.get('MONGODB_URI')
DBS_NAME = os.environ.get('MONGO_DB_NAME', 'mcdonald')
COLLECTION_NAME = os.environ.get('MONGO_COLLECTION_NAME','food')

# Modify the following for your fields
FIELDS = {'Category': True, 'Item': True, 'ServingSizePerGram': True, 'Calories': True,
          'Calories from Fat': True, 'TotalFat': True,'Total Fat (% Daily Value)': True,
          'Saturated Fat':True,'Saturated Fat (% Daily Value)':True,'Trans Fat':True,'Cholesterol':True,
          'Cholesterol (% Daily Value)':True,'Sodium':True,'Sodium (% Daily Value)':True,'Carbohydrates':True, 
          'Carbohydrates (% Daily Value)':True,'Dietary Fiber':True,'Dietary Fiber (% Daily Value)':True,'Sugars':True,
          'Protein':True,'Vitamin A (% Daily Value)':True,'Vitamin C (% Daily Value)':True,'Calcium (% Daily Value)':True,
            'Iron (% Daily Value)':True,'veg':True, '_id': False}

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/data")
def get_data():
    with MongoClient(MONGODB_URI) as conn:
        # Define which collection we wish to access
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to 55000
        results = collection.find(projection=FIELDS)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(results))


if __name__ == "__main__":
    app.run(host=os.getenv('IP', '0.0.0.0'),port=int(os.getenv('PORT', 8080)))