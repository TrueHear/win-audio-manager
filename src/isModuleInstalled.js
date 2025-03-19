const executePowerShell = require("./executePowerShell");

/**
 * Checks if the AudioDeviceCmdlets module is installed in PowerShell.
 * 
 * @returns {Promise<boolean>} Resolves with `true` if installed, `false` otherwise.
 */
async function isModuleInstalled() {
    try {
        const command = `Get-Module -ListAvailable | Where-Object { $_.Name -eq 'AudioDeviceCmdlets' } | Select-Object -ExpandProperty Name`;


        const result = await executePowerShell(command);
        // Ensure we check the trimmed output
        return result.trim().toLowerCase() === "audiodevicecmdlets";
    } catch (error) {
        console.error("❌ Error checking module installation:", error.message);
        return false; // Module not installed or error occurred
    }
}

module.exports = isModuleInstalled;
