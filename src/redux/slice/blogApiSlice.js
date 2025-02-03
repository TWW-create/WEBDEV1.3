import { BLOGS } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";



export const blogApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBlogPosts: builder.query({
            query: ({page, per_page}) => ({
                url: BLOGS,
                params: {page, per_page}
            }),
            providesTags: ["blog_posts"],
        }),
        getCreator: builder.query({
            query: (creator) => ({
                url: `${BLOGS}`,
                params: {creator}
            }),
        }),
        getBlogPost: builder.query({
            query: (id) => ({
                url: `${BLOGS}/${id}`,
            }),
            providesTags: ["single_post"],
        }),
        createBlogPost: builder.mutation({
            query: (data) => ({
                url: `admin${BLOGS}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["blog_posts"],
        }),
        deleteBlogPost: builder.mutation({
            query: ({id}) => ({
                url: `admin${BLOGS}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["blog_posts", "single_post",],
        }),
        deleteBlogMedia: builder.mutation({
            query: (id) => ({
                url: `admin${BLOGS}/media/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["single_post", "blog_posts"],
        }),
        updateBlogPost: builder.mutation({
            query: ({id, data}) => ({
                url: `admin${BLOGS}/${id}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["blog_posts", "single_post"],
        }),
    })
})


export const {
    useCreateBlogPostMutation,
    useDeleteBlogPostMutation,
    useGetBlogPostsQuery,
    useGetBlogPostQuery,
    useUpdateBlogPostMutation,
    useDeleteBlogMediaMutation,
    useGetCreatorQuery,
} = blogApiSlice