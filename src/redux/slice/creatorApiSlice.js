import { CREATOR } from '../../utils/apiConstants';
import { apiSlice } from './apiSlice';

export const creatorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCreators: builder.query({
            query: () => ({
                url: CREATOR,
            }),
            providesTags: ['Creators'],
        }),
        addCreators: builder.mutation({
            query: (data) => ({
                url: '/admin' + CREATOR,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Creators'],
        }),
    })
})

export const {
    useGetCreatorsQuery,
    useAddCreatorsMutation,
} = creatorApiSlice