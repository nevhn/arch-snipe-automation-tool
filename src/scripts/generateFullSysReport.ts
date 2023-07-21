console.clear()
import fs from 'fs-extra'
import si from 'systeminformation'
import { createSpinner } from 'nanospinner'
export const generateFullSysReport = async () => {
  const spinner = createSpinner()
  try {
    /** get sys info without parsing the output*/
    const { system, osInfo, mem, diskLayout, graphics, networkInterfaces, cpu } = si
    spinner.start({ text: 'Generating....' })
    const output = {
      system: await system(),
      osInfo: await osInfo(),
      mem: await mem(),
      diskLayout: await diskLayout(),
      graphics: await graphics(),
      networkInterfaces: await networkInterfaces(),
      cpu: await cpu(),
    }
    // const filename = `${(await system())?.model}-${(await osInfo())?.hostname}`
    const fileName = (await osInfo())?.hostname
    await fs.writeFile(`./${fileName}-full.txt`, JSON.stringify(output, null, 4))
    spinner.success({ text: 'Created full-system-report.txt' })
    console.log('\nFile is created at the root folder where the script is currently at.')
    // const filePath = "__dirname"+ ""
  } catch (err) {
    spinner.error({ text: ` ${err}` })
  }
}
