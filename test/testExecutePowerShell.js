const executePowerShell = require("../src/executePowerShell");

(async function () {
    try {
        console.log("\n🔎 Testing executePowerShell...\n");

        // Successful execution: PowerShell `Write-Output`
        const output = await executePowerShell('powershell -Command "Write-Output Hello, PowerShell!"');
        console.log("✅ Success:", output);

        // Error case: Invalid PowerShell command
        await executePowerShell('powershell -Command "InvalidCommand"');
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
})();
