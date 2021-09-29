const { Tracks } = require("../models");
const { Users } = require("../models");

async function getAllTracks(req, res) {
  try {
    const tracks = await Tracks.find({});
    return res.status(200).send({
      tracks: tracks,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      error: error.message,
    });
  }
}

async function getTrackById(req, res) {
  const { id } = req.params;
  try {
    const foundTrack = await Tracks.findOne({
      _id: id,
    });
    return res.status(200).send({
      message: "Track found",
      currentTrack: foundTrack,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      error: error.message,
    });
  }
}

async function uploadTrack(req, res) {
  const { owner } = req.body;
  try {
    //Creating new track
    const { _id } = await Tracks.create(req.body);
    //Finding the user to update mySongs property and saving the document
    const userFound = await Users.findById(owner);
    userFound.mySongs.push(_id);
    await userFound.save();
    //Returning statuts after track upload and user document update
    return res.status(200).send({
      message: "Track created very successfully",
      data: {
        trackId: _id,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      error: error.message,
    });
  }
}

async function deleteTrack(req, res) {
  const { id } = req.params;
  try {
    //Deleting existing track
    const {owner} = await Tracks.findByIdAndRemove(id);
    //Finding the user to update mySongs property and saving the document
    const userFound = await Users.findById(owner);
    const trackToRemove = userFound.mySongs.indexOf(id);
    userFound.mySongs.splice(trackToRemove, 1);
    await userFound.save();
    //Returning statuts after track delete and user document update
    return res.status(200).send({
      message: "Track deleted very successfully",
      data: {
        trackId: id,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      error: error.message,
    });
  }
}

async function updateTrack(req, res) {
  const { id } = req.params;
  try {
    const dbResponse = await Tracks.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!dbResponse) {
      return res.status(400).send({
        data: null,
        error: "Track ID doesn't exist",
      });
    } else {
      res.status(200).send({
        message: "Track updated successfully",
        updatedTrack: dbResponse,
      });
    }
  } catch (error) {
    res.status(500).send({
      data: req.params.id,
      error: error.message,
    });
  }
}

module.exports = {
  getAllTracks: getAllTracks,
  getTrackById: getTrackById,
  uploadTrack: uploadTrack,
  deleteTrack: deleteTrack,
  updateTrack: updateTrack,
};
