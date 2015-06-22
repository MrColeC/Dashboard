var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/PM';

// Public functions
exports.insert = function () {
  insert();
};

// Private functions
var insert = function() {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected to the server");
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

var end = function(db) {
  db.close;
  console.log("Disconnected from the server");
}

// Insert
var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insert([
    {x : 1}, {y : 2}, {z : 3}
  ], function(err, result) {
    assert.equal(err, null);
    console.log("update: " + result);
    assert.equal(3, result.length);
    console.log("Inserted 3 documents into the document collection");
    callback(result);
  });
}

// Update
var updateDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.update({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    console.log("update: " + result);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });
}

// Remove
var removeDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.remove({ a : 3 }, function(err, result) {
    assert.equal(err, null);
    console.log("remove: " + result);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });
}

// Remove all
var removeAllDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.remove({}, function(err, result) {
    assert.equal(err, null);
    console.log("remove: " + result);
    console.log("Removed all documents");
    callback(result);
  });
}

// Find all
var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    // console.log(docs);
    // assert.equal(2, docs.length);
    console.log("Found the following records");
    console.dir(docs);
    callback(docs);
  });
}
