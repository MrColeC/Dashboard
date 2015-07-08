var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Config options
var url = 'mongodb://localhost:27017/PM';

// ============================================================
// Public functions
exports.test = function () {
  test();
};

exports.load = function (object) {
  createWrapper(object);
};

exports.get = function (callback) {
  readWrapper(callback);
}

exports.remove = function (callback) {
  deleteWrapper(callback);
}

// ============================================================
// Private (meta) functions
var test = function() {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertDocuments(db, function() {
      updateDocument(db, function() {
        removeDocument(db, function() {
          findDocuments(db, function() {
            removeAllDocuments(db, function() {
              end(db);
            });
          });
        });
      });
    });
  });
};

var createWrapper = function(object) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertProject(db, object, function() {
      end(db);
    });
  });
};

var readWrapper = function(callback) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var docHolder;
    findDocuments(db, function(docHolder) {
      end(db);
      callback(docHolder);
    });
  });
};

var deleteWrapper = function(targetId) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    removeDocument(db, targetId, function() {
      end(db);
    });
  });
};

// ============================================================
// Individual functions

// Disconnect
var end = function(db) {
  db.close;
  // console.log("DB close");
}

// Insert
var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('projects');
  // Insert some documents
  collection.insert([
    {x : 1}, {y : 2}, {z : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.length);
    callback(result);
  });
}

// Update
var updateDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('projects');
  // Update document where a is 2, set b equal to 1
  collection.update({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    callback(result);
  });
}

// Remove
var removeDocument = function(db, targetId, callback) {
  // Get the documents collection
  var collection = db.collection('projects');
  // Insert some documents
  var target = JSON.stringify(targetId);
  console.log("Trying to remove: " + target);
  collection.remove(target, function(err, result) {
    assert.equal(err, null);
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
var insertProject = function(db, zobject, callback) {
  // Get the documents collection
  var collection = db.collection('projects');
  // Insert some documents
  collection.insert(zobject, function(err, result) {
    assert.equal(err, null);
    assert.equal(zobject.length, result.length);
    callback(result);
  });
}
