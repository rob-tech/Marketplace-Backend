const express = require("express");
const { MongoClient, ObjectID} = require('mongodb')
const studentSchema = require('./schema')
const mongoServerURL = 'mongodb://localhost:27017'

