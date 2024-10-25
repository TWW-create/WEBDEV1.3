import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../utils/apiConstants'

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = Cookies.get('jwtbara')

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: () => ({}),
})
