export default (optionsInput) => {
  const appId = (optionsInput || {}).appId || optionsInput

  const head = {
    meta: []
  }

  if (appId) {
    head.meta.push({
      hid: 'fb:app_id',
      property: 'fb:app_id',
      content: appId
    })
  }

  return head
}
