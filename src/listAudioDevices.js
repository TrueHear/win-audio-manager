const executePowerShell = require("./executePowerShell");

/**
 * Lists all available audio playback devices.
 * 
 * @returns {Promise<Array<{ Index: number, Name: string, ID: string }>>} Resolves with an array of devices.
 */
async function listAudioDevices() {
    try {
        const command = `powershell -Command "Get-AudioDevice -List | ConvertTo-Json"`;
        const output = await executePowerShell(command);
        const devices = JSON.parse(output);
        return Array.isArray(devices) ? devices : [devices];
    } catch (error) {
        throw new Error(`Error listing audio devices: ${error.message}`);
    }
}

module.exports = listAudioDevices;
