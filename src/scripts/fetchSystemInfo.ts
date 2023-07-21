/**
 * TODO:
 * [] - test this function on mac
 * [x] - parse output for the proper keys
 * [x] - change filename to something specific
 * [x] - save system report from multiple workstations
 * [x] - get custom fields
 * [x] - get model_id
 */
console.clear()
import si from 'systeminformation'
import chalk from 'chalk'
import { fetchModelID } from './fetchModelID'

export const fetchSystemInfo = async (generate?:boolean) => {
  try {
    /** get sys info */
    const { system, osInfo, mem, diskLayout, graphics, networkInterfaces, cpu } = si
    /**parse output */
    const { serial, model, manufacturer } = await system()
    // const modelNumber = model.match(/\b((?=[A-Za-z/ -]{1}\d)[A-Za-z0-9/ -]{4,20})\b/)?.[0]
    const { hostname, distro } = await osInfo()
    const asset_tag = hostname.match(/\d+/)?.[0] // SSA46264Y125 -> 46264
    const { total } = await mem()
    const disk = (await diskLayout()).find(
      (e) =>
        e.interfaceType === 'SATA' ||
        e.interfaceType === 'NVMe' ||
        e.interfaceType === 'RAID' ||
        e.interfaceType === 'PCIe',
    )
    const { controllers } = await graphics()
    const network = (await networkInterfaces()).find(
      (e) => e.iface === 'Ethernet' || e.iface === 'en0',
    )
    const { brand } = await cpu() // Xeon(R)

    /**format bytes */
    const storage = formatBytes(disk?.size as number)
    const ram = formatBytes(total)
    /**format strings */
    const formatModel = model.includes('OptiPlex') ? model.replace('OptiPlex', 'Optiplex') : model
    const formatManufacturer = manufacturer.includes('Inc.')
      ? manufacturer.replace('Inc.', '').trim()
      : manufacturer
    if (generate){
      return {
        name: hostname, // asset name
        serial,
        manufacturer: formatManufacturer,
        model: formatModel,
        _snipeit_os_3: distro, // os
        _snipeit_mac_address_10: network?.mac,
        _snipeit_ram_memory_12: ram,
        _snipeit_cpu_processor_13: brand,
        _snipeit_storage_gb_14: storage,
        _snipeit_gpu_15: controllers[0].model,
        asset_tag,
      }
    } 
    let model_id = await fetchModelID(formatModel)
    // let test_id = await fetchModelID('Precisioon 3240')
    if (!model_id) {
      /**TODO: Give instructions on how to find model_id */
      console.log(
        chalk.yellow(
          '\nmodel_id was not found on archsnipe. Please assign the correct model_id (model) ',
        ),
      )
      model_id = 5
    }
    // const location = 'CAD48706Y125'.match(/\d+$/)![0]
    // console.log('System Specs 🔵 \n', newDate)

    return {
      status_id: 5, // Good Unknown, Good e.g
      model_id, // ids are assigned to the asset model of the computer  e.g id =7 -> Optiplex 790
      name: hostname, // asset name
      // TODO: GET CUSTOM FIELDS NAMES(all of these are custom fields)
      serial,
      manufacturer: formatManufacturer,
      model: formatModel,
      _snipeit_os_3: distro, // os
      _snipeit_mac_address_10: network?.mac,
      _snipeit_ram_memory_12: ram,
      _snipeit_cpu_processor_13: brand,
      _snipeit_storage_gb_14: storage,
      _snipeit_gpu_15: controllers[0].model,
      asset_tag,
    }
  } catch (err) {
    console.error(err)
    return { err }
  }
}

const formatBytes = (bytes: number, decimals = 0) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
