var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mdb = require('mongodb');

// Config options
var url = 'mongodb://localhost:27017/PM';

// ============================================================
// Public functions
exports.test = function () {
  test();
};

exports.load = function (object, callback) {
  createWrapper(object, callback);
};

exports.update = function (object, callback) {
  updateWrapper(object, callback);
};

exports.get = function (callback) {
  readWrapper(callback);
}

exports.remove = function (callback) {
  deleteWrapper(callback);
}

// ============================================================
// Private (meta) functions
var createWrapper = function(object, callback) {
  MongoClient.connect(url, function(err, db) {
    // console.log("+1 DB connection");
    assert.equal(null, err);
    insertProject(db, object, function(result) {
      end(db);
      callback(result);
    });
  });
};

var readWrapper = function(callback) {
  MongoClient.connect(url, function(err, db) {
    // console.log("+1 DB connection");
    assert.equal(null, err);
    var docHolder;
    findDocuments(db, function(docHolder) {
      end(db);
      callback(docHolder);
    });
  });
};

var updateWrapper = function(object, callback) {
  MongoClient.connect(url, function(err, db) {
    // console.log("+1 DB connection");
    assert.equal(null, err);
    updateDocument(db, object[0], function(result) {
      end(db);
      callback(result);
    });
  });
};

var deleteWrapper = function(target) {
  MongoClient.connect(url, function(err, db) {
    // console.log("+1 DB connection");
    assert.equal(null, err);
    removeDocument(db, target, function() {
      end(db);
    });
  });
};

// ============================================================
// Individual functions

// Disconnect
var end = function(db) {
  db.close();
  // console.log("-1 DB close");
}

// Update
var updateDocument = function(db, target, callback) {
  // Get the documents collection
  var collection = db.collection('projects');
  // Update document where a is 2, set b equal to 1
  // console.log("Updating project with ID [" + target.id + "] -> setting [" + JSON.stringify(target) + "]");
  collection.update({_id: new mdb.ObjectID(target.id)}, { $set: target }, function(err, result) {
    assert.equal(err, null);
    callback('success');
  });
}

// Remove
var removeDocument = function(db, target, callback) {
  // Get the documents collection
  var collection = db.collection('projects');
  // Insert some documents
  // console.log("Trying to remove: " + target.id);
  collection.remove({_id: new mdb.ObjectID(target.id)}, function(err, result) {
    assert.equal(err, null);
    // console.log("Result: " + result);
    callback(result);
  });
}

// Remove all
var removeAllDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('projects');
  // Insert some documents
  collection.remove({}, function(err, result) {
    assert.equal(err, null);
    callback(result);
  });
}

// Find all
var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('projects');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    // console.log("Found the following records");
    // console.dir(docs);
    callback(docs);
  });
}

// Insert
var insertProject = function(db, object, callback) {
  // Get the documents collection
  var collection = db.collection('projects');
  // Insert some documents
  collection.insert(object, function(err, result) {
    assert.equal(err, null);
    assert.equal(object.length, result.length);
    // console.log("Result: " + JSON.stringify(result));
    callback(result);
  });
}
