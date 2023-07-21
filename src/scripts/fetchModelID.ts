console.clear()
import https from 'https'
import axios from 'axios'
import 'dotenv/config'
// import chalk from 'chalk'
// import fs from 'fs-extra'
export const fetchModelID = async (model: string) => {
  // console.log(model)
  try {
    // const api =
    //   'https://develop.snipeitapp.com/api/v1/hardware?limit=2&offset=0&sort=created_at&order=desc'
    const api = 'API_ENDPOINT_HERE'
    const httpsAgent = new https.Agent({ rejectUnauthorized: false })
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY as string}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      httpsAgent,
    }
    // if (model.includes('Mac')) {
    //   // filter through macbookjson
    // seperate this into a seperate function
    // }
    const response = await axios.get(api, config)
    
    const data = response.data.rows
    // const models = await fs.readJSON('docs/archSnipeItModels.json') //for test
    // const data = models.rows
    const findModel = data.filter((obj: object) => {
      return Object.values(obj).includes(model)
    })
    // console.log(findModel)

    if (!findModel.length) return undefined
    const modelId = findModel[0].id
    return modelId
  } catch (error) {
    // console.error(error)
    return 
  }
}


