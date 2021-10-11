// imports
const { Tracks, Users, Playlists } = require("../models");

// functions
async function createPlaylist(req, res) {
  const { title, owner, ...bodyReq } = req.body;
  try {
    const foundPlaylist = await Playlists.findOne({ title: title });
    if (!foundPlaylist) {
      //Create playlist
      const { _id } = await Playlists.create({
        title: title,
        owner: owner,
        ...bodyReq,
      });

      //Finding the user to update myPlaylists property and saving the document
      const userFound = await Users.findById(owner);
      userFound.myPlaylists.push(_id);
      await userFound.save();

      //Returning status after playlist creation and user document update
      return res.status(200).send({
        message: "Playlist created very successfully",
        playlistId: _id,
      });
    } else {
      return res.status(201).send({
        message: "This playlist already exists",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      error: error.message,
    });
  }
}

async function updatePlaylistById(req, res) {
  const { id } = req.params;
  try {
    const dbResponse = await Playlists.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!dbResponse) {
      return res.status(400).send({
        data: null,
        error: "Playlist ID doesn't exist",
      });
    } else {
      res.status(200).send({
        message: "Playlist updated successfully",
        updatedPlaylist: dbResponse,
      });
    }
  } catch (error) {
    res.status(500).send({
      data: req.params.id,
      error: error.message,
    });
  }
}

async function deleteTrackFromPlaylist(req, res) {
  const { id } = req.params;
  const { trackId } = req.body;
  let messageResponse = "Track not found";
  try {
    //Collect playlist document and track to delete index
    const playlistDoc = await Playlists.findOne({ _id: id });
    const trackIndexToDelete = playlistDoc.tracks.indexOf(trackId);

    //Checking if index exists, removing it from playlist and updating playlistDoc
    if (trackIndexToDelete >= 0) {
      messageResponse = "Track removed";
      playlistDoc.tracks.splice(trackIndexToDelete, 1);
      playlistDoc.save();
    }
    res.status(200).send({
      message: messageResponse,
      trackId: trackId,
      playListId: playlistDoc._id,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
}

async function deletePlaylistById(req, res) {
  const { id } = req.params;
  try {
    //Deleting existing playlist
    const { owner } = await Playlists.findByIdAndDelete(id);
    //Finding the user to update myPlaylists property and saving the document
    const userFound = await Users.findById(owner);
    const playlistToRemove = userFound.myPlaylists.indexOf(id);
    userFound.myPlaylists.splice(playlistToRemove, 1);
    await userFound.save();
    //Finding all user documents to update their favPlaylists property and saving them
    const users = await Users.find({});
    for (const user of users) {
      userFavPlaylistToRemove = user.favPlaylists.indexOf(id);
      if (userFavPlaylistToRemove >= 0) {
        user.favPlaylists.splice(userFavPlaylistToRemove, 1);
        await user.save();
      }
    }

    //Returning statuts after playlist delete and user document update
    return res.status(200).send({
      message: "Playlist deleted very successfully",
      data: {
        playlistId: id,
      },
    });
  } catch (error) {
    return res.status(500).send({
      data: req.params.id,
      error: error.message,
    });
  }
}

async function getAllPlaylists(req, res) {
  //Receive the limitation by req.body, by default 20
  const { limit = 20 } = req.body;
  try {
    const playlists = await Playlists.find({})
      .sort({ createdAt: -1 })
      .limit(limit);
    return res.status(200).send({
      playlistsSize: limit,
      playlists: playlists,
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
}

async function getPlaylistById(req, res) {
  const { id } = req.params;
  try {
    const foundPlaylist = await Playlists.findOne({
      _id: id,
    });
    return res.status(200).send({
      message: "Playlist found",
      currentPlaylist: foundPlaylist,
    });
  } catch (error) {
    return res.status(500).send({
      data: req.params.id,
      error: error.message,
    });
  }
}

//exports
module.exports = {
  createPlaylist: createPlaylist,
  updatePlaylistById: updatePlaylistById,
  deleteTrackFromPlaylist:deleteTrackFromPlaylist,
  deletePlaylistById: deletePlaylistById,
  getAllPlaylists: getAllPlaylists,
  getPlaylistById: getPlaylistById,
};
