export default (fileSizeInBytes) => {
  const kb = fileSizeInBytes / 1024
  const mb = kb / 1024
  const gb = mb / 1024
  // const tb = gb / 1024

  if (fileSizeInBytes < 1) {
    return '0 kB'
  }

  if (gb >= 1000) {
    return Math.round((gb / 1024) * 10) / 10 + ' TB'
  }

  if (mb >= 1000) {
    return Math.round((mb / 1024) * 10) / 10 + ' GB'
  }

  if (kb >= 1000) {
    return Math.round((kb / 1024) * 10) / 10 + ' MB'
  }

  if (fileSizeInBytes >= 1000) {
    return Math.round(kb * 10) / 10 + ' kB'
  }

  return Math.round(fileSizeInBytes) + ' B'
}
