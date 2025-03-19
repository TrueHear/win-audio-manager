const getDefaultPlaybackDevice = require("../src/getDefaultPlaybackDevice");

(async function () {
    try {
        console.log("\n🔎 Testing getDefaultPlaybackDevice...\n");

        const device = await getDefaultPlaybackDevice();

        console.log("✅ Default Playback Device:");
        console.log(`   🎵 Name: ${device.Name}`);
        console.log(`   🔢 Index: ${device.Index}`);
        console.log(`   🆔 ID: ${device.ID}`);

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
})();
