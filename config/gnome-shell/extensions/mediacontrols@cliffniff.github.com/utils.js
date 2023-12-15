import GLib from "gi://GLib";
import Soup from "gi://Soup";
import Pango from "gi://Pango";

const metadataKeys = {
    "xesam:artist": "artist",
    "xesam:album": "album",
    "xesam:title": "title",
    "mpris:artUrl": "image",
    "xesam:url": "url",
    "mpris:trackid": "trackid",
    "mpris:length": "length",
};

export const msToHHMMSS = (ms) => {
    let seconds = Math.floor(ms / 1000000);
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - hours * 3600) / 60);
    seconds = seconds - hours * 3600 - minutes * 60;

    if (hours < 10) {
        hours = `0${hours}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    if (hours === "00") {
        return `${minutes}:${seconds}`;
    }

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        return "--";
    }

    return `${hours}:${minutes}:${seconds}`;
};

const isValidTitle = (title) => {
    return title && title.trim() !== "";
};

const isValidArtist = (artist) => {
    return artist && Array.isArray(artist) && artist.length > 0 && artist.some((a) => a.trim() !== "");
};

export const parseMetadata = (_metadata) => {
    if (!_metadata) {
        return _metadata;
    }

    const metadata = {};
    for (const key in metadataKeys) {
        const val = _metadata[key];
        metadata[metadataKeys[key]] = val instanceof GLib.Variant ? val.recursiveUnpack() : val;
    }

    metadata.isInactive = !isValidTitle(metadata.title) && !isValidArtist(metadata.artist) && metadata.length === 0;

    let title = metadata.title || metadata.url || metadata.id;

    if (title && title === metadata.url) {
        const urlParts = metadata.url.split("/");
        if (urlParts[0] === "file:") {
            title = urlParts[urlParts.length - 1];
        }
    } else if (title && title === metadata.id) {
        if (title.includes("/org/mpris/MediaPlayer2/Track/")) {
            title = title.replace("/org/mpris/MediaPlayer2/Track/", "Track ");
        } else if (title === "/org/mpris/MediaPlayer2/TrackList/NoTrack") {
            title = "No track";
        }
    }

    let image = metadata.image;

    if (image) {
        image = image.replace("https://open.spotify.com/image/", "https://i.scdn.co/image/");
    }

    metadata.title = title;
    metadata.image = image;

    return metadata;
};

export const stripInstanceNumbers = (busName) => {
    return busName.replace(/\.instance\d+$/, "");
};

export const getRequest = (url) => {
    return new Promise((resolve, reject) => {
        const session = new Soup.Session();
        const request = Soup.Message.new("GET", url);
        session.send_and_read_async(request, GLib.PRIORITY_DEFAULT, null, (_session, result) => {
            if (request.get_status() === Soup.Status.OK) {
                const bytes = _session.send_and_read_finish(result);
                resolve(bytes);
            } else {
                reject(new Error("Soup request not resolved"));
            }
        });
    });
};

export const wrappingText = (wrapping, widget) => {
    if (wrapping) {
        widget.clutter_text.single_line_mode = false;
        widget.clutter_text.activatable = false;
        widget.clutter_text.line_wrap = true;
        widget.clutter_text.line_wrap_mode = Pango.WrapMode.WORD_CHAR;
    } else {
        widget.clutter_text.single_line_mode = true;
        widget.clutter_text.activatable = false;
        widget.clutter_text.line_wrap = false;
    }
    return true;
};
