import { ADDRESSES, CHANGE_PASSWORD, FAVORITES, GET_COUNTRY, PROFILE } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";


export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: PROFILE,
            }),
            providesTags: ["profile"],
        }),
        getUserFavorites: builder.query({
            query: () => ({
                url: FAVORITES,
            }),
            providesTags: ["user_favorites"],
        }),
        addUserFavorite: builder.mutation({
            query: (data) => ({
                url: FAVORITES,
                body: data,
                method: "POST",
            }),
            invalidatesTags: ["user_favorites"],
        }),
        removeUserFavorite: builder.mutation({
            query: (id) => ({
                url: `${FAVORITES}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["user_favorites"],
        }),
        getUserAddresses: builder.query({
            query: (id) => ({
                url: `/user/${id}${ADDRESSES}`,
            }),
            providesTags: ["user_address"],
        }),
        addUserAddress: builder.mutation({
            query: (data) => ({
                url: ADDRESSES,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["user_address"],
        }),
        updateUserAddress: builder.mutation({
            query: ({data, id}) => ({
                url: `${ADDRESSES}/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["user_address"],
        }),
        setDeliveryAddress: builder.mutation({
            query: (id) => ({
                url: `${ADDRESSES}/${id}/set-delivery`,
                method: "PATCH",
            }),
            invalidatesTags: ["user_address"],
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: "/profile",
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["profile"],
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: CHANGE_PASSWORD,
                method: "POST",
                body: data
            }),
        }),
        getCountries: builder.query({
            query: () => ({
              url: GET_COUNTRY,
            }),
            providesTags: ["COUNTRIES"],
          }),
    })
})

export const { 
    useGetProfileQuery, 
    useUpdateProfileMutation,
    useGetUserAddressesQuery, 
    useAddUserAddressMutation,
    useGetCountriesQuery,
    useUpdateUserAddressMutation,
    useGetUserFavoritesQuery,
    useAddUserFavoriteMutation,
    useRemoveUserFavoriteMutation,
    useSetDeliveryAddressMutation,
    useChangePasswordMutation,
} = profileApiSlice;