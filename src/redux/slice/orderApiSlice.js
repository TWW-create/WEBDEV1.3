import { ADMIN_ORDERS, ORDERS, TRANSACTIONS } from '../../utils/apiConstants';
import { apiSlice } from './apiSlice';

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: ORDERS + "/create",
                method: "POST",
                body: data,
            }),
        }),
        verifyPayment: builder.mutation({
            query: (data) => ({
                url: ORDERS + "/verify-payment",
                method: "POST",
                body: data,
            }),
        }),
        getTransactions: builder.query({
            query: () => ({
                url: TRANSACTIONS,
            }),
            transformResponse: (response) => response.data,
        }),
        getOrders: builder.query({
            query: () => ({
                url: ORDERS,
            }),
            transformResponse: (response) => response.data,
        }),
        getOrder: builder.query({
            query: (id) => ({
                url: ORDERS +   `/${id}`,
            }),
            transformResponse: (response) => response.data,
        }),
        getAdminOrders: builder.query({
            query: () => ({
                url: ADMIN_ORDERS,
            }),
            transformResponse: (response) => response.data,
        }),
    })
})

export const {
    useCreateOrderMutation,
    useVerifyPaymentMutation,
    useGetTransactionsQuery,
    useGetOrdersQuery,
    useGetAdminOrdersQuery,
    useGetOrderQuery,
} = orderApiSlice