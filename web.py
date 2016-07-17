# -*- coding: utf-8 -*-
import json
import random

from bottle import route, run, static_file


@route('/api/v1/nodes/<path:path>')
def index(path):
    path1 = str(random.random())
    path2 = str(random.random())
    return json.dumps({
        'key': path,
        'fullpath': path,
        'value': random.random(),
        'children': [
            {'key': path1, 'fullpath': path + '/' + path1},
            {'key': path2, 'fullpath': path + '/' + path2}
        ]
    })


@route('/')
def home():
    with open('index.html') as fp:
        return fp.read()


@route('/<filename:path>')
def send_static(filename):
    return static_file(filename, root='')

if __name__ == '__main__':
    run(host='localhost', port=8080, debug=True, reloader=True)
