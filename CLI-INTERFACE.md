# **🎵 Win Audio Manager CLI**  

*A simple, interactive CLI tool to manage Windows audio devices.*

---

## **📌 About**

The **Win Audio Manager CLI** allows you to:
✅ **List available audio devices**  
✅ **Get the current default playback device**  
✅ **Change the default playback device**  
✅ **Interactive prompts for a user-friendly experience**  

It uses **PowerShell** commands via the `AudioDeviceCmdlets` module.

---

## **📌 Installation**

### **1️⃣ Install the Required PowerShell Module**

Before using this CLI, install **`AudioDeviceCmdlets`**:  

```powershell
Install-Module -Name AudioDeviceCmdlets -Scope CurrentUser
```

If prompted about an **untrusted repository**, confirm with:  

```powershell
Y
```

💡 **Credit:** This CLI relies on [`AudioDeviceCmdlets`](https://github.com/frgnca/AudioDeviceCmdlets.git) by [frgnca](https://github.com/frgnca).

---

### **2️⃣ Install Win Audio Manager CLI**

Using **npm**, install the CLI globally:

```bash
npm install -g win-audio-manager-cli
```

Now, you can use it as a system command:

```bash
win-audio
```

---

## **📌 Usage**

To launch the CLI, simply run:

```bash
win-audio
```

You'll see an **interactive menu** like this:

```bash
🎵 Windows Audio Manager CLI 🎵

✅ PowerShell module is installed!
? What do you want to do?
  🔊 List Audio Devices
  🎧 Get Default Playback Device
  🔄 Set Default Playback Device
  ❌ Exit
> 
```

---

### **📌 1. List Available Audio Devices**

Select **🔊 List Audio Devices**, or run:

```bash
win-audio --list
```

Example output:

```bash
🎵 Speakers (Realtek) (ID: {0.0.0.00000000}) [Index: 0]
🎵 Headphones (ID: {1.0.0.00000001}) [Index: 1]
🎵 External Monitor Speakers (ID: {2.0.0.00000002}) [Index: 2]
```

---

### **📌 2. Get Default Playback Device**

Select **🎧 Get Default Playback Device**, or run:

```bash
win-audio --get
```

Example output:

```bash
🎧 Default Playback Device: Headphones (ID: {1.0.0.00000001})
```

---

### **📌 3. Change Default Playback Device**

Select **🔄 Set Default Playback Device**, or run:

```bash
win-audio --set 1
```

You'll be prompted to **choose a device**:

```bash
? Select a device:
  🎵 Speakers (Index: 0)
  🎵 Headphones (Index: 1)
  🎵 External Monitor Speakers (Index: 2)
> 🎵 Headphones
✅ Successfully set default audio device: Headphones
```

---

## **📌 CLI Flags (For Power Users)**

| Command | Description |
|---------|------------|
| `win-audio` | Open interactive CLI |
| `win-audio --list` | List all audio devices |
| `win-audio --get` | Get the default playback device |
| `win-audio --set <index>` | Set default playback device (by index) |

---

## **📌 Handling Ctrl+C**

If you press `Ctrl+C`, the CLI **exits gracefully**:

```bash
❌ Process terminated by user. Exiting gracefully...
```

---

## **📌 Uninstall**

To remove the CLI:

```bash
npm uninstall -g win-audio-manager-cli
```

---
