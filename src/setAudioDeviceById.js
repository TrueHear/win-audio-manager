const executePowerShell = require("./executePowerShell");

/**
 * Sets the default audio playback device by its ID.
 * 
 * @param {string} deviceId - The ID of the device to set as default.
 * @returns {Promise<string>} Resolves with the ID of the successfully set device.
 * @throws {Error} Throws an error if setting fails.
 */
async function setAudioDeviceById(deviceId) {
    try {
        const command = `powershell -Command "Set-AudioDevice -ID '${deviceId}'"`;
        await executePowerShell(command);
        return deviceId; // Return ID of the successfully set device
    } catch (error) {
        throw new Error(`Error setting default audio device by ID: ${error.message}`);
    }
}

module.exports = setAudioDeviceById;
