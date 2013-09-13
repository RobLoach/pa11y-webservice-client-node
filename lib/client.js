'use strict';

var request = require('request');

module.exports = client;

// Create a web-service client
function client (root) {
	return {

		tasks: {

			// Create a new task
			create: function (task, done) {
				post(root + 'tasks', task, done);
			},

			// Get all tasks
			get: function (done) {
				get(root + 'tasks', null, done);
			},

			// Get results for all tasks
			results: function (query, done) {
				get(root + 'tasks/results', query, done);
			}

		},

		task: function (id) {
			return {

				// Get a task
				get: function (done) {
					get(root + 'tasks/' + id, null, done);
				},

				// Remove a task
				remove: function (done) {
					del(root + 'tasks/' + id, null, done);
				},

				// Get results for a task
				results: function (query, done) {
					get(root + 'tasks/' + id + '/results', query, done);
				}

			};
		}

	};
}

// Perform a DELETE request
function del (url, query, done) {
	req('DELETE', url, query, null, done);
}

// Perform a GET request
function get (url, query, done) {
	req('GET', url, query, null, done);
}

// Perform a POST request
function post (url, body, done) {
	req('POST', url, null, body, done);
}

// Perform a request
function req (method, url, query, body, done) {
	request({
		method: method,
		url: url,
		qs: query,
		body: body,
		json: true
	}, function (err, res, body) {
		if (err) {
			return done(err);
		}
		if (res.statusCode > 299) {
			return done(new Error(body.message || 'Error ' + res.statusCode));
		}
		done(null, body);
	});
}