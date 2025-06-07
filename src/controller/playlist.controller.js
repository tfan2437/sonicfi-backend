import { Playlist } from "../models/playlist.model.js";
import { Track } from "../models/track.model.js";

export const getPlaylists = async (req, res) => {
  try {
    const { uid } = req.params;

    const playlists = await Playlist.find({ uid }).sort({ createdAt: -1 });

    const resultPlaylists = await Promise.all(
      playlists.map(async (playlist) => {
        const tracks = await Track.find({
          _id: { $in: playlist.track_ids },
        });

        return {
          _id: playlist._id.toString(),
          uid: playlist.uid,
          name: playlist.name,
          track_ids: playlist.track_ids,
          tracks: tracks,
        };
      })
    );

    res.status(200).json({
      message: "Playlists fetched successfully",
      playlists: resultPlaylists,
    });
  } catch (error) {
    console.log("Error in getUser", error);
    res.status(500).json({ message: "Error fetching user", playlists: [] });
  }
};

export const createPlaylist = async (req, res) => {
  try {
    const { uid } = req.params;
    const { name, track_ids } = req.body;

    await Playlist.create({ uid, name, track_ids });

    res.status(201).json({
      message: "Playlist created successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in create Playlist on db", error);
    res.status(500).json({
      message: "Error creating playlist on db",
      success: false,
    });
  }
};

export const getPlaylist = async (req, res) => {
  try {
    const { _id } = req.params;

    const playlist = await Playlist.findOne({ _id });

    if (!playlist) {
      return res
        .status(404)
        .json({ message: "Playlist not found", playlist: null });
    }

    const tracks = await Track.find({
      _id: { $in: playlist.track_ids },
    });

    res.status(200).json({
      message: "Playlist fetched successfully",
      playlist: {
        _id: playlist._id.toString(),
        uid: playlist.uid,
        name: playlist.name,
        track_ids: playlist.track_ids,
        tracks: tracks,
      },
    });
  } catch (error) {
    console.log("Error in getPlaylist", error);
    res
      .status(500)
      .json({ message: "Error fetching playlist", playlist: null });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const { _id } = req.params;

    const playlist = await Playlist.findByIdAndDelete({ _id });

    if (!playlist) {
      return res
        .status(404)
        .json({ message: "Playlist not found", success: false });
    }

    res.status(200).json({
      message: "Playlist deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in getPlaylist", error);
    res
      .status(500)
      .json({ message: "Error deleting playlist", success: false });
  }
};

export const updatePlaylist = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, track_ids } = req.body;

    let playlist;

    if (name === "") {
      playlist = await Playlist.findByIdAndUpdate({ _id }, { track_ids });
    } else {
      playlist = await Playlist.findByIdAndUpdate({ _id }, { name });
    }

    if (!playlist) {
      return res
        .status(404)
        .json({ message: "Playlist not found", success: false });
    }

    res.status(200).json({
      message: "Playlist updated successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in updatePlaylist", error);
    res
      .status(500)
      .json({ message: "Error updating playlist", success: false });
  }
};
