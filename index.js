const getDefaultPlaybackDevice = require("./src/getDefaultPlaybackDevice");
const isModuleInstalled = require("./src/isModuleInstalled");
const listAudioDevices = require("./src/listAudioDevices");
const setAudioDevice = require("./src/setAudioDevice");
const setAudioDeviceById = require("./src/setAudioDeviceById");


module.exports = {
    isModuleInstalled,
    listAudioDevices,
    setAudioDevice,
    getDefaultPlaybackDevice,
    setAudioDeviceById
};
