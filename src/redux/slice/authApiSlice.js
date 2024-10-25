import { LOGIN, REGISTER, } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";



export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createAccount: builder.mutation({
            query: (data) => ({
                url: REGISTER,
                method: 'POST',
                body: data,
            })
        }),
        // verifyEmail: builder.mutation({
        //     query: (data) => ({
        //         url: VERIFY_EMAIL,
        //         method: 'POST',
        //         body: data,
        //     })
        // }),
        signIn: builder.mutation({
            query: (data) => ({
                url: LOGIN,
                method: 'POST',
                body: data,
            })
        }),
        // googleLogin: builder.mutation({
        //     query: (data) => ({
        //         url: GOOGLE_LOGIN,
        //         method: 'POST',
        //         body: data,
        //     })
        // }),
        // forgotPassword: builder.mutation({
        //     query: (data) => ({
        //         url: FORGET_PASSWORD,
        //         method: 'POST',
        //         body: data,
        //     })
        // }),
        // verifyResetPass: builder.mutation({
        //     query: (data) => ({
        //         url: VERIFY_RESET_PASS,
        //         method: 'POST',
        //         body: data,
        //     })
        // }),
        // resetPass: builder.mutation({
        //     query: (data) => ({
        //         url: RESET_PASS,
        //         method: 'POST',
        //         body: data,
        //     })
        // }),
        // resendCode: builder.mutation({
        //     query: (data) => ({
        //         url: RESEND_VERIFY_CODE,
        //         method: 'POST',
        //         body: data
        //     }),
        // }),
        // verifyPartEmail: builder.query({
        //     query: (token) => ({
        //         url: `${VERIFY_PARTIAL_MAIL}/${token}`,
        //     }),
        // }),
    })
})


export const { 
    useCreateAccountMutation,
    // useVerifyEmailMutation,
    useSignInMutation,
    // useForgotPasswordMutation,
    // useVerifyResetPassMutation,
    // useResetPassMutation,
    // useResendCodeMutation,
    // useVerifyPartEmailQuery,
    // useGoogleLoginMutation,
} = authApiSlice;