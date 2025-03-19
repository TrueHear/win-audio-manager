const { exec } = require("child_process");

/**
 * Executes a PowerShell command safely.
 * 
 * @param {string} command The PowerShell command to execute.
 * @returns {Promise<string>} Resolves with command output.
 */
function executePowerShell(command) {
    return new Promise((resolve, reject) => {
        exec(command, { shell: "powershell.exe" }, (error, stdout, stderr) => {
            if (error) return reject(new Error(`PowerShell execution error: ${error.message}`));
            if (stderr) return reject(new Error(`PowerShell error: ${stderr}`));
            resolve(stdout.trim());
        });
    });
}

module.exports = executePowerShell;
