/**
 * Created by simpa on 8/16/2014.
 */
'use strict';

/**
 * Module dependencies.
 */
var ss = require('socket.io-stream');

var path = require('path');

var fs = require('fs');
var sim =require ('./socket');
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
//var mongo = mongoose.mongo;
Grid.mongo = mongoose.mongo;
 var sio = require('socket.io');

module.exports=function (app) {

        var io = sio.listen(app);


    var conn = mongoose.createConnection('localhost','testDB', 27017);
    conn.once('open', function () {
        var gfs = new Grid(conn.db);

        // all set!
    });

    console.log('socket.io running');
    io.on('connection', function(socket){
     console.log('finally connected');
        socket.emit('getmessage', 'finally connected' );
        //  socket.emit('getmessage', 'connected');

          socket.on('sendmessage', function (data) {
                console.log(data);
            io.emit('getmessage', data );
            });



    });

    io.of('/file').on('connection', function(socket) {

        //Grid.mongo = mongoose.mongo;
        //conn.once('open', function () {
            var gfs = new Grid(conn.db);

            // all set!
        //});
        ss(socket).on('uploadfile', function (stream, data) {
            console.log('receiving files');
            var filename = path.basename(data.name);
            var writestream = gfs.createWriteStream({filename:filename,metadata: {name: 'simpa'}});
            stream.pipe(writestream);
            console.log('data saved in db');
            writestream.on('close', function (file) {
                // do something with `file`
                console.log(file.filename);
            });
            stream.pipe(fs.createWriteStream('./app/upload/sendfile1.html'));
        });
        //read from gridfs
        //var readstream = gfs.createReadStream(options);
        // var readstream = gfs.createReadStream({_id: '50e03d29edfdc00d34000001'})
        //readstream.pipe(response);
        //
        //

    });
};