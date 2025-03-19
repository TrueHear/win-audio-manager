const getDefaultPlaybackDevice = require("./src/getDefaultPlaybackDevice");
const isModuleInstalled = require("./src/isModuleInstalled");
const listAudioDevices = require("./src/listAudioDevices");
const setAudioDevice = require("./src/setAudioDevice");

module.exports = {
    isModuleInstalled,
    listAudioDevices,
    setAudioDevice,
    getDefaultPlaybackDevice,
};
