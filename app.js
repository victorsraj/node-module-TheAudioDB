/* eslint-disable camelcase */
// Build in class with inquirer and using deck.js
const inquirer = require('inquirer');

const audio = require('./audio.js'); 

// helper functions for printing artist information
const _print_artist_info = (artist) => {
    console.log('-------- Artist Information --------');
    console.log('Artist Name: ' + artist.artists[0].strArtist);
    console.log('Record Label :' + artist.artists[0].strLabel);
    console.log('Year Born: ' + artist.artists[0].intBornYear);
    console.log('Formed Year: ' + artist.artists[0].intFormedYear);
    console.log('Genre: ' + artist.artists[0].strGenre);
    console.log('Style: ' + artist.artists[0].strStyle);
    console.log('Website: ' + artist.artists[0].strWebsite);
    console.log('Bio: ' + artist.artists[0].strBiographyEN);
    console.log('----------------------------------------------------------------------------');
    console.log('\n');
};

// // helper functions for printing album information
const _print_album_info = (album) => {
    console.log('\n');
    console.log('--------- Album Information --------');
    console.log('Album Name: ' + album.album[0].strAlbum);
    console.log('Artist Name: ' + album.album[0].strArtist);
    console.log('Release Date: ' + album.album[0].intYearReleased);
    console.log('Sales: ' + album.album[0].intSales);
    console.log("Genre: " + album.album[0].strGenre);
    console.log("Style: " + album.album[0].strStyle);
    console.log("Description: " + album.album[0].strDescriptionEN.substring(0, 500) + '...');
    console.log('----------------------------------------------------------------------------');
    console.log('\n');

};

// // helper functions for printing track information
const _print_track_info = (track) => {
    console.log('\n');
    console.log('--------- Track Information --------');
    console.log('Track Name: ' + track.track[0].strTrack)
    console.log('Artist Name: ' + track.track[0].strArtist);
    console.log('Album Name: ' + track.track[0].strAlbum);
    console.log("Genre: " + track.track[0].strGenre);
    console.log("Duration : " + track.track[0].intDuration.substring(0,3) + " seconds");
    console.log('----------------------------------------------------------------------------');
    console.log('\n');

};

// Prompts user to select an artist from the list of artists
const _ArtistsPrompt = async (artistList) => {  
    const artistArr = [];
    // create an array of objects containing each artist name and bio
    artistList.artists.forEach(artists => {
        const artistObj = {
            name: artists.strArtist + ', \n Bio: ' + artists.strBiographyEN.substring(0, 200) + '...' + '\n',
            value: {
                ID: artists.idArtist
            }
        };
        artistArr.push(artistObj);
    });
    
    return inquirer.prompt({
        type: 'list',
        name: 'userSelected',
        message: 'select the artist',
        choices: artistArr
    });
};

const _AlbumsPrompt = async (albumList) => {
    
    const albums = [];
    // create array of objects containing each album name of an artist 
    albumList.album.forEach(album => {

        const albumObj = {
            name: album.strAlbum,
            value: {
                Name: album.strAlbum,
                ID: album.idAlbum
            }
        };
        albums.push(albumObj);
    });
    return inquirer.prompt({
        type: 'list',
        name: 'userSelected',
        message: 'select the album',
        choices: albums
  
    });
};

const _TracksPrompt = async (trackList) => {
    
    const tracks = [];
    // create an array of objects to contain each track name of an album
    trackList.track.forEach(track => {

        const trackObj = {
            name: track.strTrack,
            value: {
                ID: track.idTrack
            }
        };
        tracks.push(trackObj);
    });
    return inquirer.prompt({
        type: 'list',
        name: 'userSelected',
        message: 'select the track',
        choices: tracks
  
    });
};


const search = async (args) => {
    try {
        const { artistName } = args; //the artist name from cli.js

        // gets data from TheAudioDB and set to an array of objects (each object contains each artist's data)
        const artistsList = await audio.searchArtist(artistName);
        // output how many artists matched the search keywords 
        console.log(artistsList.artists.length, 'artists found:')
        // prompt the user to choose which artist out of the list
        const selectArtist = await _ArtistsPrompt(artistsList);
        // call function to get the artist's Id 
        const artistId = selectArtist.userSelected.ID;
        //get all data of the selected artist
        const artist = await audio.searchByID(artistId);
        //call function to display information about artist
        _print_artist_info(artist);
        

        // get selected artist's album data from TheAudioDB and set to an array of objects
        const albumList = await audio.searchAlbums(artistId);
        // prompt the user to select one of the albums 
        const selectAlbum = await _AlbumsPrompt(albumList);
        // get the album ID
        const albumId = selectAlbum.userSelected.ID;
        // get data from the album 
        const album = await audio.searchAlbumsById(albumId);
        // print the album information
        _print_album_info(album);


        // get selected album's track data from TheAudioDB and set to an array of objects
        const tracklist = await audio.searchTracks(albumId);
        // prompt the user to select one of the tracks 
        const selectTrack = await _TracksPrompt(tracklist);
        // get the id of the track selected by the user
        const trackId = selectTrack.userSelected.ID;
        // get track data on the users selected track
        const track = await audio.searchTracksById(trackId);
        //print the track information
        _print_track_info(track);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    search
};