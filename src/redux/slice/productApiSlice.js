import { PRODUCT } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";



export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => ({
                url: PRODUCT,
            }),
            providesTags: ["products"],
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: `/admin${PRODUCT}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["products"],
        }),
        deleteProduct: builder.mutation({
            query: (data) => ({
                url: `/admin${PRODUCT}/${data}`,
                method: "DELETE",
            }),
            invalidatesTags: ["products", "single_product"],
        }),
        updateProduct: builder.mutation({
            query: ({data, id}) => ({
                url: `/admin${PRODUCT}/${id}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["products", "single_product"],
        }),
        deleteProductMedia: builder.mutation({
            query: (id) => ({
                url: `admin${PRODUCT}/image/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["products", "single_product"],
        }),
        getSingleProduct: builder.query({
            query: (id) => ({
                url: `${PRODUCT}/${id}`,
            }),
            providesTags: ["single_product"],
        }),
    })
})

export const {
    useCreateProductMutation,
    useGetAllProductsQuery,
    useGetSingleProductQuery,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useDeleteProductMediaMutation,
} = productApiSlice