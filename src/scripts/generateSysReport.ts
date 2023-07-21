console.clear()
import fs from 'fs-extra'
import { createSpinner } from 'nanospinner'
import { fetchSystemInfo } from './fetchSystemInfo'
export const generateSystemReport = async () => {
  const spinner = createSpinner()
  try {
    spinner.start({ text: 'Generating... ' })
    const output = await fetchSystemInfo(true)
    // spinner.reset()
    // console.log(JSON.stringify(output, null, '  '))
    console.log(output)
    const fileName = output.name
    await fs.writeFile(`./${fileName}.txt`, JSON.stringify(output, null, 4))
    spinner.success({ text: 'Created system-report.txt' })
    console.log('\nFile is created at the root folder where the script is currently at.')
  } catch (error) {
    spinner.error({ text: ` ${error}` })
  }
}
