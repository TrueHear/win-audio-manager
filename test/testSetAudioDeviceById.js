const listAudioDevices = require("../src/listAudioDevices");
const setAudioDeviceById = require("../src/setAudioDeviceById");

(async function () {
    try {
        console.log("\n🔎 Testing setAudioDeviceById...\n");

        const devices = await listAudioDevices();
        if (devices.length === 0) {
            console.log("⚠️ No audio devices found.");
            return;
        }

        console.log("Available devices:");
        devices.forEach((device, index) => {
            console.log(`${index}: ${device.Name} (ID: ${device.ID}) deviceIndex:${device.Index}`);
        });

        const selectedIndex = 0; // Change this index as needed
        const selectedDevice = devices[selectedIndex];

        console.log(`\n🔄 Setting default device to: ${selectedDevice.Name} (ID: ${selectedDevice.ID})...\n`);

        await setAudioDeviceById(selectedDevice.ID);
        console.log("✅ Audio device changed successfully by ID!");
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
})();
