const { Tracks } = require("../models");

async function getById(req, res) {
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

module.exports = {
  getById: getById,
  uploadTrack: uploadTrack,
  deleteTrack: deleteTrack,
};
