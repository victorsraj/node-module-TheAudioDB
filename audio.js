const superagent = require('superagent');

// reference to TheAudioDB api: '2' is the free test apikey
const base = 'theaudiodb.com/api/v1/json/2';

// search artist looks for artistName and returns results
// async because this func is making a web request and we have to wait response
// query param is artistName
const searchArtist = async (artistName) => {
    try{
        const searchURL = `${base}/search.php?s=${artistName}`;
        const response = await superagent.get(searchURL);

        return response.body;
    } catch (error) {
        return error;
    }
};
// search artist using artist's ID: looks for artistID and returns results
// async because this func is making a web request and we have to wait response
// query param is artistId
const searchByID = async (artistId) => {
    try{
    const searchIdURL = `${base}/artist.php?i=${artistId}`;
    const response = await superagent.get(searchIdURL);

    return response.body;
    } catch (error) {
        return error;
    }
};

// search albums looks for artistId and returns all albums of that artist
// async because this func is making a web request and we have to wait response
// query param is artistID
const searchAlbums = async (artistId) => {
    try{
    const searchIdURL = `${base}/album.php?i=${artistId}`;
    const response = await superagent.get(searchIdURL);

    return response.body;
    } catch (error) {
        return error;
    }
};

// search album looks for albumId and returns results for the single album
// async because this func is making a web request and we have to wait response
// query param is albumId
const searchAlbumsById = async (albumId) => {
    try{
    const searchIdURL = `${base}/album.php?m=${albumId}`;
    const response = await superagent.get(searchIdURL);

    return response.body;
    } catch (error) {
        return error;
    }
};

// search tracks looks for albumId and returns data of each track in an album
// async because this func is making a web request and we have to wait response
// query param is albumId
const searchTracks = async (albumId) => {
    try{
    const searchIdURL = `${base}/track.php?m=${albumId}`;
    const response = await superagent.get(searchIdURL);
    return response.body;
    } catch (error) {
        return error;
    }
};

// search tracks by ID looks for trackId and returns results of a single track
// async because this func is making a web request and we have to wait response
// query param is trackId
const searchTracksById = async (trackId) => {
    try{
    const searchIdURL = `${base}/track.php?h=${trackId}`;
    const response = await superagent.get(searchIdURL);
    return response.body;
    } catch (error) {
        return error;
    }
};

module.exports = {
    searchArtist,
    searchByID,
    searchAlbums,
    searchAlbumsById,
    searchTracks,
    searchTracksById
};

