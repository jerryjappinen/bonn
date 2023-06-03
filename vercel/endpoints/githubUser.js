import flatten from 'lodash-es/flatten'
import omit from 'lodash-es/omit'

import endpoint from '../endpoint'

import sendGithubApiRequest from '../../util/sendGithubApiRequest'

const initialRepoPages = 5

export default (token) => {
  return endpoint(async ({ query }) => {
    const params = omit(query, ['user', 'token'])

    // Fetch user
    const user = sendGithubApiRequest(
      `users/${query.user}`,
      params,
      null,
      token || query.token
    )

    // Fetch repos of user
    // Repo list can be paginated
    const repos = []
    for (let i = 0; i < initialRepoPages; i++) {
      repos.push(sendGithubApiRequest(
        `users/${query.user}/repos`,
        {
          ...params,
          page: i + 1 // Pages start from 1
        },
        null,
        token || query.token
      ))
    }

    // TODO: we should test if the last page is empty. If not, we should fetch more until we know the list is complete
    await Promise.all(repos)

    return {
      ...await user,
      repos: flatten(repos)
    }
  })
}
