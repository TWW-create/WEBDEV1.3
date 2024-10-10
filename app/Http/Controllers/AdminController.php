<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('admin');
    }

    public function dashboard()
    {
        // Admin dashboard logic
        return response()->json(['message' => 'Welcome to admin dashboard']);
    }

    public function getAllUsers()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function makeAdmin($id)
    {
        $user = User::findOrFail($id);
        $user->is_admin = true;
        $user->save();
        return response()->json(['message' => 'User is now an admin']);
    }
}
