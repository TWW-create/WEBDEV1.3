import { CATEGORY, PRODUCTTYPE, SUBCATEGORY } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";



export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: CATEGORY,
            }),
            providesTags: ["categories"],
        }),
        getCategoryDetails: builder.query({
            query: (id) => ({
                url: `${CATEGORY}/${id}`,
            }),
            providesTags: ["single_category"],
        }),
        getSubCategoryDetails: builder.query({
            query: (id) => ({
                url: `${SUBCATEGORY}/${id}`,
            }),
            providesTags: ["single_subcategory"],
        }),
        createSubCategory: builder.mutation({
            query: (data) => ({
                url: `/admin${SUBCATEGORY}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["categories", "single_category"],
        }),
        createProductType: builder.mutation({
            query: (data) => ({
                url: `/admin${PRODUCTTYPE}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["categories", "single_category", "single_subcategory"],
        }),
        // deleteCategory: builder.mutation({
        //     query: ({id}) => ({
        //         url: `${CREATE_CATEGORY}/${id}`,
        //         method: "DELETE",
        //     }),
        //     invalidatesTags: ["categories", "single_category"],
        // }),
        // updateCategory: builder.mutation({
        //     query: ({id, data}) => ({
        //         url: `${UPDATE_CATEGORY}/${id}`,
        //         method: "POST",
        //         body: data
        //     }),
        //     invalidatesTags: ["categories", "single_category"],
        // }),
    })
})


export const {
    // useDeleteCategoryMutation,
    useGetCategoriesQuery,
    // useUpdateCategoryMutation,
    useGetCategoryDetailsQuery,
    useCreateSubCategoryMutation,
    useGetSubCategoryDetailsQuery,
    useCreateProductTypeMutation,
} = categoryApiSlice