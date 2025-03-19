const executePowerShell = require("./executePowerShell");

/**
 * Retrieves the default playback device on Windows.
 * 
 * @returns {Promise<{ Index: number, Name: string, ID: string }>} 
 * Resolves with an object containing the default playback device details.
 * Throws an error if PowerShell command fails.
 */
async function getDefaultPlaybackDevice() {
    try {
        // PowerShell command to get the default playback device
        const command = `powershell -Command "Get-AudioDevice -Playback | ConvertTo-Json"`;

        // Execute the PowerShell command
        const output = await executePowerShell(command);

        // Parse the JSON response from PowerShell
        const device = JSON.parse(output);

        // Ensure valid device data is returned
        if (!device || !device.Name || !device.ID) {
            throw new Error("No default playback device found.");
        }

        return device;
    } catch (error) {
        throw new Error(`Error retrieving default playback device: ${error.message}`);
    }
}

module.exports = getDefaultPlaybackDevice;
