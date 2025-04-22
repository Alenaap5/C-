from flask import Flask, Response, jsonify, request
from flask_cors import CORS
from sqlalchemy import create_engine, text, bindparam

connection_string = "mysql+pymysql://asi1:6969@192.168.50.118/cars"
engine = create_engine(connection_string, echo=True)


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/")
def index():
    return "Hello world"

@app.route("/api/car/all")
def get_cars():
    with engine.connect() as connection:
        raw_result = connection.execute(text("SELECT * FROM cars"))
        result = []
        for r in raw_result.all():
            result.append(r._asdict())
        return jsonify(result)
    return Response(jsonify({"status": "500", "message": "Database is down!"}), status=500)

@app.route("/api/car", methods=["POST"])
def add_car():
    if request.method == "POST":
        form = request.form
        with engine.connect() as connection:
            query = text("INSERT INTO cars (name, description, price, photo) VALUES (:name, :description, :price, :photo) RETURNING *")
            query = query.bindparams(bindparam("name", form.get("name")))
            query = query.bindparams(bindparam("description", form.get("description")))
            query = query.bindparams(bindparam("price", form.get("price")))
            query = query.bindparams(bindparam("photo", form.get("image")))
            result = connection.execute(query)
            connection.commit()
            return jsonify(result.fetchone()._asdict())
        return jsonify({"message": "Error"})
    
@app.route("/api/car/<int:id>", methods=["DELETE"])
def delete_car(id):
    if request.method == "DELETE":
        with engine.connect() as connection:
            query = text("DELETE FROM cars WHERE id = :id;")
            query = query.bindparams(bindparam("id", id))
            result = connection.execute(query)
            connection.commit()
            return jsonify({"message": "Success", "id" : id})

def main():
    app.run("localhost", 8000, True)

if __name__ == "__main__":
    main()