'use strict';
//Global Variables
var DHTt = require('bittorrent-dht');
var file = require('fs-sync');
var hash = require('hash.js');
var peers = [];
//Read user's config:
console.log("Welcome to PeerSocial! A true Peer-to-peer social network!");
console.log("Loading configuration file...");
var config = JSON.parse(file.read("config.json")); //Read config.json, parse into JS object.
var username = hash.sha1().update(config['username']).digest('hex'); //Hashed username
var boots = config['dhtServer']; //Configured DHT Server for the user to discover peers

//Configure and connect to DHT server using username and URL.
var dht = new DHTt({ nodeId: username, bootstrap: [boots] });

//Test peers for now
//Hash for PeerSocial Clients on any DHT Server:661DBC9D295541738C34F8829A3D979CE6FAA8FD
//Hash for test peer discovery(real torrent):e3811b9539cacff680e418124272177c47477157
dht.lookup("661DBC9D295541738C34F8829A3D979CE6FAA8FD");
//Announce ourselfs on dht server...
dht.announce("661DBC9D295541738C34F8829A3D979CE6FAA8FD", "192.168.1.2", "6688");
dht.listen(20000, function () {
    console.log("Now listening for new peers...");
})
dht.on('peer', function (peer, infoHash, from) {
    //console.log('found potential peer ' + peer.host + ':' + peer.port + ' through ' + from.address + ':' + from.port)
    peers.push({ peer, from });
    //console.log("Peer " + peer.host + ":" + peer.port + " found.");
    //console.log(peers[(peers.length - 1)]);
})