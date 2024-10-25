import { BANNER  } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";



export const bannerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBanners: builder.query({
            query: () => ({
                url: BANNER,
            }),
            providesTags: ["banners"],
        }),
        createBanner: builder.mutation({
            query: (data) => ({
                url:  `/admin/${BANNER}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["banners"],
        }),
        deleteBanner: builder.mutation({
            query: ({id}) => ({
                url: `/admin/${BANNER}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["banners", "single_banner"],
        }),
        getBanner: builder.query({
            query: (id) => ({
                url: `${BANNER}/${id}`,
            }),
            providesTags: ["single_banner"],
        }),
        updateBanner: builder.mutation({
            query: ({id, data}) => ({
                url: `/admin/${BANNER}/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["banners", "single_banner"],
        }),
    })
})


export const {
    useCreateBannerMutation,
    useGetBannersQuery,
    useDeleteBannerMutation,
    useGetBannerQuery,
    useUpdateBannerMutation,
} = bannerApiSlice