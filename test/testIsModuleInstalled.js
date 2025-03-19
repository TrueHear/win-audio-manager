const isModuleInstalled = require("../src/isModuleInstalled");

(async function () {
    console.log("\n🔎 Testing isModuleInstalled...\n");

    const installed = await isModuleInstalled();
    console.log(installed ? "✅ Module is installed" : "⚠️ Module is NOT installed.");
})();
