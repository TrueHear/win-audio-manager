const executePowerShell = require("./executePowerShell");

/**
 * Sets the default audio playback device by its index.
 * 
 * @param {number} deviceIndex - The index of the device to set as default.
 * @returns {Promise<number>} Resolves with the index of the successfully set device.
 * @throws {Error} Throws an error if setting fails.
 */
async function setAudioDevice(deviceIndex) {
    try {
        const command = `powershell -Command "Set-AudioDevice -Index ${deviceIndex}"`;
        await executePowerShell(command);
        return deviceIndex; // Return index of the successfully set device
    } catch (error) {
        throw new Error(`Error setting default audio device: ${error.message}`);
    }
}

module.exports = setAudioDevice;
