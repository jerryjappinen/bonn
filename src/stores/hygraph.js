import { defineStore } from 'pinia'

import { request } from 'graphql-request'

import hygraph from './setup/hygraph'

export default defineStore('hygraph', hygraph({
  request
}))
