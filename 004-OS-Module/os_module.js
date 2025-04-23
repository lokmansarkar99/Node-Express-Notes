//OS Module
// Get the OS platform & User Info
const os = require('os');
const osPlatform = os.platform(); // Get the OS platform
console.log("Platform " , osPlatform)

const osUserInfo = os.userInfo(); // Get the user info
console.log("User Info " , osUserInfo)
const osArchitecture = os.arch(); // Get the OS architecture
console.log("Architecture " , osArchitecture)
const osFreeMemory = os.freemem(); // Get the free memory
console.log("Free Memory " , osFreeMemory)
const osTotalMemory = os.totalmem(); // Get the total memory

console.log("Total Memory " , osTotalMemory)
const osHostname = os.hostname(); // Get the hostname
console.log("Hostname " , osHostname)
const osType = os.type(); // Get the OS type
console.log("Type " , osType)
const osRelease = os.release(); // Get the OS release
console.log("Release " , osRelease)
const osUptime = os.uptime(); // Get the OS uptime
console.log("Uptime " , osUptime)
const osNetworkInterfaces = os.networkInterfaces(); // Get the network interfaces

console.log("Network Interfaces " , osNetworkInterfaces)
const osTmpDir = os.tmpdir(); // Get the temporary directory
console.log("Temporary Directory " , osTmpDir)
const osHomeDir = os.homedir(); // Get the home directory
console.log("Home Directory " , osHomeDir)

const osEndianness = os.endianness(); // Get the endianness
console.log("Endianness " , osEndianness)
const osLoadAvg = os.loadavg(); // Get the load average
console.log("Load Average " , osLoadAvg)
const osConstants = os.constants; // Get the constants
console.log("Constants " , osConstants)
const osEOL = os.EOL; // Get the end of line
console.log("End of Line " , osEOL)
const osCPUS = os.cpus(); // Get the CPUs
console.log("CPUs " , osCPUS)



