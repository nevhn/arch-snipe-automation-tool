console.clear()
import https from 'https'
import 'dotenv/config'
import axios from 'axios'
import { createSpinner } from 'nanospinner'
import { parseSystemInfo } from './parseSystemInfo'
export const updatePartiallyAsset = async (asset_tag: string) => {
  const spinner = createSpinner()
  try {
    // const api =
    //   'https://develop.snipeitapp.com/api/v1/hardware?limit=2&offset=0&sort=created_at&order=desc'
    const api = `API_ENDPOINT_HERE`
    const hardwareAssetUrl = `API_ENDPOINT_HERE`

    const httpsAgent = new https.Agent({ rejectUnauthorized: false })

    const config = {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY as string}`,
        // Authorization: `Bearer ${process.env.TEST_API_KEY as string}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      httpsAgent,
    }

    spinner.start({ text: 'Getting system information' })
    const body = await parseSystemInfo()
    spinner.success({ text: 'Retrieved computer specs.' })
    spinner.start({ text: 'Sending information to ArchSnipe...' })
    const response = await axios.post(api, body, config)
    // const response = await axios(api, config)
    if (response.data.status === 'success') {
      spinner.success()
      console.log(response.data.payload)
      console.log('\nAsset was added successfully.')
      return
    }

    if (response.data.messages.asset_tag[0] === 'The asset tag must be unique.') {
      spinner.error({ text: 'Computer is already added' })
      return
    }
    console.log(response.data.messages.asset_tag)
    console.log(response.data)
    spinner.error({ text: "Error: See 'messages'" })
  } catch (error) {
    spinner.error({ text: ` ${error}` })
    return error
  }
}
