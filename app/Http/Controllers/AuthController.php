<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Validator;
use App\Notifications\VerifyEmail;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'verifyEmail']]);
    }
    

    /**
     * @OA\Post(
     *     path="/auth/register",
     *     summary="Registration",
     *     tags={"Auth"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"first_name", "last_name", "email", "password", "password_confirmation"},
     *
     *             @OA\Property(property="first_name", type="string", example="Samuel"),
     *             @OA\Property(property="last_name", type="string", example="Ogboye"),
     *             @OA\Property(property="email", type="string", format="email", example="ogboyesam@gmail.com"),
     *             @OA\Property(property="password", type="string", format="password", example="Ok123456"),
     *             @OA\Property(property="password_confirmation", type="string", format="password", example="Ok123456")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid request"
     *     )
     * )
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|',
            'last_name' => 'required|string|',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed|min:6',
            'is_admin' => 'boolean',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        ));

        $user->notify(new VerifyEmail);

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
        ], 201);
    }    

    public function verifyEmail(Request $request)
    {
        $user = User::find($request->route('id'));

        if (!hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
            return response()->json(['message' => 'Invalid verification link'], 400);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified'], 400);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return response()->json(['message' => 'Email verified successfully']);
    }

    public function resendVerificationEmail(Request $request)
    {
        $user = auth()->user();

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified'], 400);
        }

        $user->notify(new VerifyEmail);

        return response()->json(['message' => 'Verification email resent']);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 422);
        }
        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorised'], 401);
        }

        return $this->createNewToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile()
    {
        try {
            $user = Auth::user()->load('addressInfo');
            return response()->json([
                'message' => 'Profile retrieved successfully',
                'data' => $user,
            ]);
        } catch (\Exception $e) {
            Log::error('Error retrieving profile: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while retrieving profile'], 500);
        }
    }
    
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->createNewToken(auth()->refresh());
    }

    public function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user(),
        ]);
    }
}
