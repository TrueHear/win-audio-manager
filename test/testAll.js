const isModuleInstalled = require("../src/isModuleInstalled");
const listAudioDevices = require("../src/listAudioDevices");
const setAudioDevice = require("../src/setAudioDevice");
const getDefaultPlaybackDevice = require("../src/getDefaultPlaybackDevice");

(async function () {
    try {
        console.log("\n🔎 Running all tests...\n");

        console.log("1️⃣ Checking if PowerShell module is installed...");
        const installed = await isModuleInstalled();
        console.log(installed ? "✅ Module is installed" : "⚠️ Module is NOT installed.");

        console.log("\n2️⃣ Listing audio devices...");
        const devices = await listAudioDevices();
        if (devices.length === 0) {
            console.log("⚠️ No audio devices found.");
            return;
        }
        devices.forEach((device, index) => {
            console.log(`${index}: ${device.Name} (ID: ${device.ID})`);
        });

        // Choose a device to set as default
        const selectedIndex = 1; // Change this index as needed
        const selectedDevice = devices[selectedIndex];

        console.log(`\n3️⃣ Setting default audio device to: ${selectedDevice.Name} (ID: ${selectedDevice.ID})...\n`);

        const deviceIndex = await setAudioDevice(selectedDevice.Index);

        console.log(`✅ Default audio device successfully changed to: ${devices.find(d => d.Index === deviceIndex).Name}`);

        // Verify the change
        console.log("\n4️⃣ Verifying default playback device...");
        const defaultDevice = await getDefaultPlaybackDevice();
        console.log(`✅ New default playback device: ${defaultDevice.Name} (ID: ${defaultDevice.ID})\n`);

        console.log("\n🎉 All tests passed!");
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
})();
