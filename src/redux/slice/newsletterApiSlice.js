import { NEWSLETTER } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";



export const newsletterApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNewsletterSubscribers: builder.query({
            query: () => ({
                url: `/admin${NEWSLETTER}/subscribers`,
            }),
        }),
        subscribeNewsletter: builder.mutation({
            query: (data) => ({
                url: `${NEWSLETTER}/subscribe`,
                method: "POST",
                body: data
            }),
        }),
        unsubscribeNewsletter: builder.mutation({
            query: (data) => ({
                url: `${NEWSLETTER}/unsubscribe`,
                method: "POST",
                body: data
            }),
        }),
    })
})


export const {
    useGetNewsletterSubscribersQuery,
    useSubscribeNewsletterMutation,
    useUnsubscribeNewsletterMutation,
} = newsletterApiSlice