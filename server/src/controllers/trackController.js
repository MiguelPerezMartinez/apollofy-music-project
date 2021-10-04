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
      data: req.params.id,
      error: error.message,
    });
  }
}

async function uploadTrack(req, res) {
  const { owner } = req.body;
  try {
    //Creating new track
    const { _id } = await Tracks.create(req.body);
    //Finding the user to update myTracks property and saving the document
    const userFound = await Users.findById(owner);
    userFound.myTracks.push(_id);
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
    const { owner } = await Tracks.findByIdAndRemove(id);
    //Finding the user to update myTracks property and saving the document
    const userFound = await Users.findById(owner);
    const trackToRemove = userFound.myTracks.indexOf(id);
    userFound.myTracks.splice(trackToRemove, 1);
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
      data: req.params.id,
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

async function handlerTrackLike(req, res) {
  const { trackId, userId } = req.body;
  let messageResponse = "";
  try {
    // Collect both documents: trackDoc and userDoc by id's
    const trackDoc = await Tracks.findById(trackId);
    const userDoc = await Users.findById(userId);

    // Check if the like is registered in both docs
    const userIndex = trackDoc.totalLikes.indexOf(userId);
    const trackIndex = userDoc.favTracks.indexOf(trackId);

    // Do handling action
    if (userIndex >= 0 && trackIndex >= 0) {
      messageResponse = "Track like removed";
      trackDoc.totalLikes.splice(userIndex, 1);
      userDoc.favTracks.splice(trackIndex, 1);
    } else {
      messageResponse = "Track like added";
      trackDoc.totalLikes.push(userId);
      userDoc.favTracks.push(trackId);
    }

    // Update the docs
    await trackDoc.save();
    await userDoc.save();

    res.status(200).send({
      message: messageResponse,
      trackId: trackId,
      userId: userId,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
}

async function incrementTotalPlays(req, res) {
  const { id: trackId } = req.params;
  try {
    const trackDoc = await Tracks.findById(trackId);
    trackDoc.totalPlays += 1;
    trackDoc.save();
    res.status(200).send({
      message: "Track total plays incremented",
      trackId: trackId,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
}

async function isLikedByUser(req, res) {
  const { id: trackId } = req.params;
  const { userId } = req.body;

  try {
    const trackDoc = await Tracks.findById(trackId);
    const userInLikesArray = trackDoc.totalLikes.indexOf(userId);

    if (userInLikesArray == 0) {
      res.status(200).send({
        message: `User: ${userId} likes track: ${trackId}`,
        isLiked: true,
      });
    } else {
      res.status(200).send({
        message: `User: ${userId} likes track: ${trackId}`,
        isLiked: false,
      });
    }
  } catch (error) {
    res.status(500).send({
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
  handlerTrackLike: handlerTrackLike,
  incrementTotalPlays: incrementTotalPlays,
  isLikedByUser: isLikedByUser,
};
