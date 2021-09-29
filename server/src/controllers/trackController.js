const { Tracks } = require("../models");

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
  try {
    const { _id } = await Tracks.create(req.body);
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
    await Tracks.findByIdAndRemove(id);
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
