import { defineStore } from 'pinia'

import contentful from './setup/contentful'

export default defineStore('contentful', contentful())
