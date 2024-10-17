<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use App\Notifications\VerifyEmail;
use Illuminate\Auth\Events\Verified;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'verifyEmail']]);
    }

    public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
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
        } catch (\Exception $e) {
            Log::error('Registration error: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred during registration'], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email',
                'password' => 'required|string|min:6',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            if (!$token = auth()->attempt($validator->validated())) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            return $this->createNewToken($token);
        } catch (\Exception $e) {
            Log::error('Login error: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred during login'], 500);
        }
    }

    public function profile()
    {
        try {
            $user = Auth::user()->load('addressInfo');
            return response()->json([
                'message' => 'Profile retrieved successfully',
                'data' => $user,
            ]);
        } catch (\Exception $e) {
            Log::error('Profile retrieval error: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while retrieving profile'], 500);
        }
    }

    public function logout()
    {
        try {
            auth()->logout();
            return response()->json(['message' => 'Successfully logged out']);
        } catch (\Exception $e) {
            Log::error('Logout error: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred during logout'], 500);
        }
    }

    public function refresh()
    {
        try {
            return $this->createNewToken(auth()->refresh());
        } catch (\Exception $e) {
            Log::error('Token refresh error: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while refreshing token'], 500);
        }
    }

    public function verifyEmail(Request $request)
    {
        try {
            $user = User::find($request->route('id'));

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

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
        } catch (\Exception $e) {
            Log::error('Email verification error: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred during email verification'], 500);
        }
    }

    public function resendVerificationEmail(Request $request)
    {
        try {
            $user = auth()->user();

            if ($user->hasVerifiedEmail()) {
                return response()->json(['message' => 'Email already verified'], 400);
            }

            $user->notify(new VerifyEmail);

            return response()->json(['message' => 'Verification email resent']);
        } catch (\Exception $e) {
            Log::error('Resend verification email error: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while resending verification email'], 500);
        }
    }

    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user(),
        ]);
    }
}
