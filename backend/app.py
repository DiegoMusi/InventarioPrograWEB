from flask import Flask, redirect
from flask_cors import CORS

from flask_graphql import GraphQLView
from schema import schema

app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
    return redirect('/graphql')

app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True
    )
)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
