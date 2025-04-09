#!/usr/bin/env node

(async () => {
    const chalk = (await import("chalk")).default;
    const inquirer = (await import("inquirer")).default;
    const ora = (await import("ora")).default;

    const {
        isModuleInstalled,
        listAudioDevices,
        setAudioDevice,
        setAudioDeviceById,
        getDefaultPlaybackDevice,
    } = await import("../index.js");

    /**
     * Gracefully handles exit (Ctrl+C) to prevent ugly errors.
     */
    process.on("SIGINT", () => {
        console.log(chalk.yellow("\n❌ Process terminated by user. Exiting gracefully...\n"));
        process.exit(0);
    });

    /**
     * Displays the main CLI menu.
     */
    async function mainMenu() {
        console.clear();
        console.log(chalk.blue.bold("\n🎵 Windows Audio Manager CLI 🎵\n"));

        // Show loading spinner for module check
        const spinner = ora("Checking if the required PowerShell module is installed...").start();
        const installed = await isModuleInstalled();
        spinner.stop();

        if (!installed) {
            console.log(chalk.red("❌ Required PowerShell module is not installed!"));
            console.log(chalk.yellow("Run the following command in PowerShell to install it:\n"));
            console.log(chalk.green.bold("Install-Module -Name AudioDeviceCmdlets -Scope CurrentUser\n"));
            process.exit(1);
        }

        console.log(chalk.green("✅ PowerShell module is installed!"));

        // Loop the menu until the user chooses to exit
        let continueLoop = true;
        while (continueLoop) {
            try {
                const action = await inquirer.prompt([
                    {
                        type: "list",
                        name: "action",
                        message: "What do you want to do?",
                        choices: [
                            { name: "🔊 List Audio Devices", value: "list" },
                            { name: "🎧 Get Default Playback Device", value: "getDefault" },
                            { name: "🔄 Set Default Playback Device", value: "set" },
                            { name: "🆔 Set Default Playback Device (by ID)", value: "setById" },
                            { name: "❌ Exit", value: "exit" }
                        ]
                    }
                ]);

                // Handle User Selection
                switch (action.action) {
                    case "list":
                        await handleListDevices();
                        break;
                    case "getDefault":
                        await handleGetDefaultDevice();
                        break;
                    case "set":
                        await handleSetDefaultDevice();
                        break;
                    case "setById":
                        await handleSetDefaultDeviceById();
                        break;
                    case "exit":
                        console.log(chalk.green("\n👋 Exiting. Have a great day!\n"));
                        continueLoop = false;
                        break;
                }

                if (continueLoop) {
                    const { repeat } = await inquirer.prompt([
                        {
                            type: "confirm",
                            name: "repeat",
                            message: "Do you want to perform another action?",
                            default: true
                        }
                    ]);
                    continueLoop = repeat;
                }
            } catch (error) {
                // Handle Ctrl+C or Inquirer exit errors gracefully
                if (error.isTtyError || error.message.includes("User force closed")) {
                    console.log(chalk.yellow("\n❌ Process terminated by user. Exiting gracefully...\n"));
                    process.exit(0);
                }
                console.log(chalk.red("❌ An unexpected error occurred:"), error.message);
                process.exit(1);
            }
        }

        process.exit(0);
    }

    /**
     * Handles listing all audio devices.
     */
    async function handleListDevices() {
        console.log(chalk.blue("\n🔊 Fetching available audio devices...\n"));
        const spinner = ora("Fetching device list...").start();

        try {
            const devices = await listAudioDevices();
            spinner.stop();

            if (devices.length === 0) {
                console.log(chalk.yellow("⚠️ No audio devices found."));
            } else {
                devices.forEach(device => {
                    console.log(chalk.cyan(`🎵 ${device.Name} (ID: ${device.ID}) [Index: ${device.Index}]`));
                });
            }
        } catch (error) {
            spinner.stop();
            console.log(chalk.red("❌ Error listing devices:"), error.message);
        }
    }

    /**
     * Handles getting the default playback device.
     */
    async function handleGetDefaultDevice() {
        console.log(chalk.blue("\n🎧 Retrieving default playback device...\n"));
        const spinner = ora("Fetching default playback device...").start();

        try {
            const device = await getDefaultPlaybackDevice();
            spinner.stop();
            console.log(chalk.green(`🎧 Default Playback Device: ${device.Name} (ID: ${device.ID})`));
        } catch (error) {
            spinner.stop();
            console.log(chalk.red("❌ Error retrieving default device:"), error.message);
        }
    }

    /**
     * Handles setting a new default playback device.
     */
    async function handleSetDefaultDevice() {
        console.log(chalk.blue("\n🔄 Fetching available devices for selection...\n"));
        const spinner = ora("Fetching device list...").start();

        try {
            const devices = await listAudioDevices();
            spinner.stop();

            if (devices.length === 0) {
                console.log(chalk.yellow("⚠️ No audio devices found."));
                return;
            }

            // Prompt user to select a device
            const { selectedIndex } = await inquirer.prompt([
                {
                    type: "list",
                    name: "selectedIndex",
                    message: "Select a device:",
                    choices: devices.map(device => ({
                        name: `${device.Name} (Index: ${device.Index})`,
                        value: device.Index
                    }))
                }
            ]);

            // Set the selected device as default
            const setSpinner = ora(`Switching to ${devices.find(d => d.Index === selectedIndex).Name}...`).start();
            const index = await setAudioDevice(selectedIndex);
            setSpinner.stop();

            console.log(chalk.green(`✅ Successfully set default audio device: ${devices.find(d => d.Index === index).Name}`));

        } catch (error) {
            spinner.stop();
            console.log(chalk.red("❌ Error setting default device:"), error.message);
        }
    }

    /**
     * Function to change the default playback using Id
     */
    async function handleSetDefaultDeviceById() {
        console.log(chalk.blue("\n🆔 Set Default Playback Device by ID\n"));
        const { deviceId } = await inquirer.prompt([
            {
                type: "input",
                name: "deviceId",
                message: "Paste the device ID:",
                validate: input => input.trim() !== "" || "Device ID cannot be empty."
            }
        ]);

        const spinner = ora(`Switching to device with ID: ${deviceId}...`).start();
        try {
            await setAudioDeviceById(deviceId.trim());
            spinner.stop();
            console.log(chalk.green(`✅ Successfully set default audio device by ID!`));
        } catch (error) {
            spinner.stop();
            console.log(chalk.red("❌ Error setting device by ID:"), error.message);
        }
    }

    // Start the CLI
    mainMenu();
})();
