# **`windows-audio-manager`**

---

## **🎵 Windows Audio Manager**

*A simple and lightweight Node.js library for managing audio devices on Windows.*

🔊 **Easily list, set, and get default playback devices programmatically!**

---

## **📜 Features**

✅ **List all audio devices** (speakers, headphones, etc.)  
✅ **Set a default playback device** (switch between speakers, headphones, monitors)  
✅ **Get the current default playback device**  
✅ **Handles errors safely and efficiently**  

---

## **🔧 Installation**

### **1️⃣ Install the PowerShell Module**

This library **relies on** the [`AudioDeviceCmdlets`](https://github.com/frgnca/AudioDeviceCmdlets.git) PowerShell module created by [frgnca](https://github.com/frgnca).  
**Before using this library, install the required module by running:**

```powershell
Install-Module -Name AudioDeviceCmdlets -Scope CurrentUser
```

If you are prompted about an untrusted repository, confirm with:

```bash
Y
```

**💡 Credits:** This library builds upon the amazing work of **frgnca**, who developed the `AudioDeviceCmdlets` module.  
🔗 **GitHub:** [AudioDeviceCmdlets](https://github.com/frgnca/AudioDeviceCmdlets.git)

---

### **2️⃣ Install This Library**

Now, install `windows-audio-manager` using **npm**:

```bash
npm install windows-audio-manager
```

---

## **🛠️ Usage**

### **📌 1. Import the Library**

```javascript
const {
    isModuleInstalled,
    listAudioDevices,
    setAudioDevice,
    getDefaultPlaybackDevice
} = require("windows-audio-manager");
```

---

### **📌 2. Check if the PowerShell Module is Installed**

Before using the library, ensure that `AudioDeviceCmdlets` is installed:

#### **Using `then/catch`:**

```javascript
isModuleInstalled().then(installed => {
    console.log(installed ? "✅ Module is installed" : "❌ Module is NOT installed. Please install it.");
}).catch(error => console.error("❌ Error:", error.message));
```

#### **Using `async/await`:**

```javascript
(async () => {
    try {
        const installed = await isModuleInstalled();
        console.log(installed ? "✅ Module is installed" : "❌ Module is NOT installed. Please install it.");
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
})();
```

---

### **📌 3. List All Available Audio Devices**

#### **Using `then/catch`:**

```javascript
listAudioDevices().then(devices => {
    console.log("🔊 Available Audio Devices:");
    devices.forEach((device, index) => {
        console.log(`${index}: ${device.Name} (ID: ${device.ID})`);
    });
}).catch(error => console.error("❌ Error:", error.message));
```

#### **Using `async/await`:**

```javascript
(async () => {
    try {
        const devices = await listAudioDevices();
        console.log("🔊 Available Audio Devices:");
        devices.forEach((device, index) => {
            console.log(`${index}: ${device.Name} (ID: ${device.ID})`);
        });
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
})();
```

**🔹 Example Output:**

```
🔊 Available Audio Devices:
0: Speakers (Realtek) (ID: {0.0.0.00000000})
1: Headphones (ID: {1.0.0.00000001})
2: External Monitor Speakers (ID: {2.0.0.00000002})
```

---

### **📌 4. Get the Current Default Playback Device**

#### **Using `then/catch`:**

```javascript
getDefaultPlaybackDevice().then(device => {
    console.log(`🎧 Current Default Playback Device: ${device.Name} (ID: ${device.ID})`);
}).catch(error => console.error("❌ Error:", error.message));
```

#### **Using `async/await`:**

```javascript
(async () => {
    try {
        const device = await getDefaultPlaybackDevice();
        console.log(`🎧 Current Default Playback Device: ${device.Name} (ID: ${device.ID})`);
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
})();
```

**🔹 Example Output:**

```
🎧 Current Default Playback Device: Headphones (ID: {1.0.0.00000001})
```

---

### **📌 5. Set a New Default Playback Device**

#### **Using `then/catch`:**

**✅ By Index:**

```javascript
listAudioDevices().then(devices => {
    const selectedIndex = 1; // Change this index as needed
    const selectedDevice = devices[selectedIndex];

    console.log(`🔄 Switching to: ${selectedDevice.Name} (ID: ${selectedDevice.ID})`);

    setAudioDevice(selectedDevice.Index).then(index => {
        console.log(`✅ Successfully set device: ${devices.find(d => d.Index === index).Name}`);
    }).catch(error => {
        console.error("❌ Error:", error.message);
    });
});
```

**✅ By ID:**

```javascript
listAudioDevices().then(devices => {
    const selectedIndex = 1; // Change this index as needed
    const selectedDevice = devices[selectedIndex];

    console.log(`🔄 Switching to: ${selectedDevice.Name} (ID: ${selectedDevice.ID})`);

    setAudioDeviceById(selectedDevice.ID).then(id => {
        console.log(`✅ Successfully set device by ID: ${devices.find(d => d.ID === id).Name}`);
    }).catch(error => {
        console.error("❌ Error:", error.message);
    });
});
```

---

#### **Using `async/await`:**

**✅ By Index:**

```javascript
(async () => {
    try {
        const devices = await listAudioDevices();
        const selectedIndex = 1; // Change this index as needed
        const selectedDevice = devices[selectedIndex];

        console.log(`🔄 Switching to: ${selectedDevice.Name} (ID: ${selectedDevice.ID})`);

        const deviceIndex = await setAudioDevice(selectedDevice.Index);
        console.log(`✅ Successfully set device: ${devices.find(d => d.Index === deviceIndex).Name}`);
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
})();
```

**✅ By ID:**

```javascript
(async () => {
    try {
        const devices = await listAudioDevices();
        const selectedIndex = 1; // Change this index as needed
        const selectedDevice = devices[selectedIndex];

        console.log(`🔄 Switching to: ${selectedDevice.Name} (ID: ${selectedDevice.ID})`);

        const deviceId = await setAudioDeviceById(selectedDevice.ID);
        console.log(`✅ Successfully set device by ID: ${devices.find(d => d.ID === deviceId).Name}`);
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
})();
```

---
  
## **🛠️ Error Handling**

This library **throws errors** for failed operations. Always use `.catch()` or `try...catch` to handle exceptions.

**Example:**

```javascript
(async () => {
    try {
        await setAudioDevice(9999); // Invalid index
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
})();
```

**🔹 Example Error Output:**

```bash
❌ Error: Error setting default audio device: PowerShell execution error: Invalid index
```

---

## **📜 API Reference**

### **🔍 `isModuleInstalled()`**

**Checks if the required PowerShell module is installed.**  
✅ **Returns:** `Promise<boolean>`  
🔹 **Usage:**

```javascript
const installed = await isModuleInstalled();
```

---

### **🔊 `listAudioDevices()`**

**Lists all available audio devices.**  
✅ **Returns:** `Promise<Array<{ Index: number, Name: string, ID: string }>>`  
🔹 **Usage:**

```javascript
const devices = await listAudioDevices();
```

---

### **🎧 `getDefaultPlaybackDevice()`**

**Gets the current default playback device.**  
✅ **Returns:** `Promise<{ Index: number, Name: string, ID: string }>`  
🔹 **Usage:**

```javascript
const device = await getDefaultPlaybackDevice();
```

---

### **🔄 `setAudioDevice(index)`**

**Sets the default playback device to the given index.**  
✅ **Returns:** `Promise<number>` (resolves with the index of the new default device)  
🔹 **Usage:**

```javascript
const index = await setAudioDevice(1);
```

---

#### **CLI-Interface**

🔗 **CLI-INTERFACE:** [`CLI-INTERFACE`](CLI-INTERFACE.md)

🚀 **Enjoy seamless audio device management with `windows-audio-manager`!** 🎧🔥  
