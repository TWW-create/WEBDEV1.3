import { ADMIN_DASHBOARD } from '../../utils/apiConstants';
import { apiSlice } from './apiSlice';

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDash: builder.query({
            query: () => ({
                url: ADMIN_DASHBOARD,
            }),
        }),
    })
})

export const {
    useGetDashQuery
} = dashboardApiSlice