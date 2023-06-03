import ky from 'ky'

const baseUrl = 'https://api/github.com/'
const method = 'get'

export default async (endpoint, params, body, token) => {
  const options = {
    searchParams: params,
    json: body,
    headers: {}
  }

  if (token) {
    options.headers.Authorization = `Bearer ${token}`
  }

  const json = await ky(baseUrl + endpoint, {
    method,
    json: params,
    headers: {}
  }).json()

  return json
}
