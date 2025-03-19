const listAudioDevices = require("../src/listAudioDevices");
const setAudioDevice = require("../src/setAudioDevice");

(async function () {
    try {
        console.log("\n🔎 Testing setAudioDevice...\n");

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
        console.log(`\n🔄 Setting default device to: ${devices[selectedIndex].Name}...\n`);

        await setAudioDevice(devices[selectedIndex].Index);
        console.log("✅ Audio device changed successfully!");
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
})();
