import { Types } from '@box/adapter'
import crypto from 'crypto-js'

export const encrypt = (file: Types.File, key: string) => {
  let str = `<i>${file.id}<#>${file.name}<#>${file.owner_id}<#>${file.last_update}</i>`
  const boxes = file.boxes.reduce((acc, box) => {
    acc += '<b>'
    acc += `${box.id}<#>${box.name}<#>${box.props.weight}`
    acc += `<#>${box.geometry.width},${box.geometry.height},${box.geometry.depth}`
    acc += `<#>${box.position.x},${box.position.y},${box.position.z}`
    acc += `<#>${box.rotate.x_rotate},${box.rotate.y_rotate},${box.rotate.z_rotate}`
    acc += `<#>${box.props.rotate_limits.x_rotate},${box.props.rotate_limits.y_rotate},${box.props.rotate_limits.z_rotate}`
    acc += '</b>'
    return acc
  }, '')
  str += boxes
  const containers = file.containers.reduce((acc, container) => {
    acc += '<c>'
    acc += `${container.id}<#>${container.name}`
    acc += `<#>${container.geometry.width},${container.geometry.height},${container.geometry.depth}`
    acc += '<#>' + container.boxes.reduce((ids, id) => id + ',')
    acc += '<c>'
    return acc
  }, '')
  str += containers
  const result = crypto.AES.encrypt(str, key).toString()
  return encodeURIComponent(result)
}

export const decrypt = (str: string, key: string) => {
  const decode = decodeURIComponent(str)
  const bytes = crypto.AES.decrypt(decode, key)
  const data = bytes.toString(crypto.enc.Utf8)
  console.log(data)

  const infoReg = /<i>(.*?)<\/i>/g
  const boxReg = /<b>(.*?)<\/b>/g
  const containerReg = /<c>(.*?)<\/c>/g

  const infoMatch = data.match(infoReg)
  if (!infoMatch || (infoMatch && !infoMatch[0])) {
    return null
  }

  const info = infoMatch[0].replace(/<\/?i>/g, '').split('<#>')

  const file: Types.File = {
    id: info[0],
    name: info[1],
    owner_id: info[2],
    boxes: [],
    containers: [],
    last_update: +info[3]
  }

  const boxesMatch = data.match(boxReg)
  if (boxesMatch) {
    file.boxes = boxesMatch.map((match) => {
      const arr = match.replace(/<\/?b>/g, '').split('<#>')
      const geometry = arr[3].split(',')
      const position = arr[4].split(',')
      const rotate = arr[5].split(',')
      const rotate_limits = arr[6].split(',')
      const box: Types.Box = {
        id: arr[0],
        name: arr[1],
        props: {
          weight: +arr[2],
          rotate_limits: {
            x_rotate: +rotate_limits[0],
            y_rotate: +rotate_limits[1],
            z_rotate: +rotate_limits[2]
          }
        },
        geometry: {
          width: +geometry[0],
          height: +geometry[1],
          depth: +geometry[2]
        },
        position: {
          x: +position[0],
          y: +position[1],
          z: +position[2]
        },
        rotate: {
          x_rotate: +rotate[0],
          y_rotate: +rotate[1],
          z_rotate: +rotate[2]
        },
        type_code: ''
      }
      return box
    })
  }
  const containersMatch = data.match(containerReg)
  if (containersMatch) {
    file.containers = containersMatch.map((match) => {
      const arr = match.replace(/<\/?b>/g, '').split('<#>')
      const geometry = arr[2].split(',')
      const boxes = arr[3].split(',')
      const container: Types.Container = {
        id: arr[0],
        name: arr[1],
        geometry: {
          width: +geometry[0],
          height: +geometry[1],
          depth: +geometry[2]
        },
        type_code: '',
        boxes
      }
      return container
    })
  }

  return file
}
