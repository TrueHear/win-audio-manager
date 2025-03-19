const listAudioDevices = require("../src/listAudioDevices");

(async function () {
    try {
        console.log("\n🔎 Testing listAudioDevices...\n");

        const devices = await listAudioDevices();
        if (devices.length === 0) {
            console.log("⚠️ No audio devices found.");
        } else {
            devices.forEach((device, index) => {
                console.log(`${index}: ${device.Name} (ID: ${device.ID})`);
            });
        }
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
})();
