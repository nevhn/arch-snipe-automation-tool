# Arch-SnipeIT-Automation-Tool
A CLI application designed to simplify the process of managing computer inventory using the Snipe-It database system for the City College of New York Architecture IT department. This tool automates the process of extracting computer specifications and adding new desktops/laptops to the database with ease.
(Showcase purpose only. This tool was developed and used internally. None of the API functions will work obviously, expect the system report options)

## Screenshots
![image](https://user-images.githubusercontent.com/51008990/218598800-424e3426-f5e6-4f4e-9729-19ef3cfea67a.png)


### Technologies Used
- Node.js
- TypeScript
- pkg (helps distribute tool as native binaries)

### Features
- Cross-platform compatibility: Works on both Windows and Mac operating systems.
- Easy Inventory Management: Extract system information and automatically add new computers to the Snipe-It database with a simple POST request. (Internet connection required)
- System Information at Your Fingertips: Generate a detailed report of your computer's specifications, including hardware and software information.
- Output to Text File: Store your system information for future reference by generating a text file report.


Installation
1. Git clone the project
2. In the root directory of the project, `npm install`
3. npm `start`

You can also build windows/macos binares using pkg - https://www.npmjs.com/package/pkg
