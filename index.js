const fs = require('fs')
const os = require('os')
const { exec } = require('child_process')

console.log('Starting generation of SVGs')

const userHomeDir = os.homedir()
const baseDirectory = `${userHomeDir}/Documents/SCD/STICKERS KENNELS`
const resultDirectory = `${userHomeDir}/Documents/SCD/STICKERS KENNELS/result`
const size = 'M'.toUpperCase()
//const size = 'S'.toUpperCase()

// read the example file
const exampleContent = fs.readFileSync(`${baseDirectory}/scd-sticker-k${size.toLowerCase()}-01.svg`).toString()

for (let i = 1; i <= 10; i++) {
    const num = `${i}`.padStart(2, '0')
    const resultFilename = `scd-sticker-k${size.toLowerCase()}-${num}`
    const resultFilePath = `${resultDirectory}/${resultFilename}.svg`
    const pngFilePath = `${resultDirectory}/${resultFilename}.png`
    console.log(`Cloning file: ${resultFilePath}`)
    // create the clone file
    const resultFileContent = exampleContent.replace(new RegExp(`K${size}-01`, 'g'), `K${size}-${num}`)
    // save the clone file
    fs.writeFileSync(resultFilePath, resultFileContent)
    //inkscape --export-png="/home/nautimeister/Documents/SCD/STICKERS KENNELS/result/scd-sticker-km-99.png" "/home/nautimeister/Documents/SCD/STICKERS KENNELS/scd-sticker-km-01.svg"
    exec(`inkscape --export-png="${pngFilePath}" "${resultFilePath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
        console.log(`stdout: ${stdout}`)
    })
}

console.log('Finish generation of SVGs')
