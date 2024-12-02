import { RETURN_POLICY, SHIPPING_POLICY } from '../../utils/apiConstants';
import { apiSlice } from './apiSlice';

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getShippingPolicy: builder.query({
            query: () => ({
                url: SHIPPING_POLICY,
            }),
            providesTags: ["shipping_policy"],
        }),
        getReturnPolicy: builder.query({
            query: () => ({
                url: RETURN_POLICY,
            }),
            providesTags: ["return_policy"],
        }),
        storeShippingPolicy: builder.mutation({
            query: (data) => ({
                url: `/admin${SHIPPING_POLICY}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["shipping_policy"],
        }),
        storeReturnPolicy: builder.mutation({
            query: (data) => ({
                url: `/admin${RETURN_POLICY}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["return_policy"],
        }),
    })
})

export const {
    useGetReturnPolicyQuery,
    useGetShippingPolicyQuery,
    useStoreShippingPolicyMutation,
    useStoreReturnPolicyMutation,
} = dashboardApiSlice