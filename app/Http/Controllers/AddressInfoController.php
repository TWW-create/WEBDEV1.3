<?php

namespace App\Http\Controllers;

use App\Models\AddressInfo;
use App\Models\User;
use Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Validator;

class AddressInfoController extends Controller
{
    public function index()
    {
        try {
            $addressInfos = AddressInfo::with('user:id,first_name,last_name')->get();
            return response()->json([
                'message' => 'All Address Info retrieved',
                'data' => $addressInfos,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error retrieving address info: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while retrieving address info'], 500);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'address_1' => 'required|string|max:255',
            'address_2' => 'nullable|string|max:255',
            'city' => 'required|string|max:50',
            'state_province' => 'required|string|max:50',
            'country' => 'required|string|max:100',
            'zipcode' => 'required|string|max:20',
            'delivery_address' => 'required|string',
            'contact_number' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $userId = Auth::id();
            $addressInfo = AddressInfo::updateOrCreate(
                ['user_id' => $userId],
                array_merge($validator->validated(), ['user_id' => $userId])
            );

            return response()->json([
                'message' => 'Address Info created/updated successfully',
                'data' => $addressInfo->load('user:id,first_name,last_name'),
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating/updating address info: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while creating/updating address info'], 500);
        }
    }

    public function show($id)
    {
        try {
            $addressInfo = AddressInfo::with('user:id,first_name,last_name')->findOrFail($id);
            if (!Auth::user()->isAdmin() && $addressInfo->user_id !== Auth::id()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            return response()->json($addressInfo);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Address Info not found'], 404);
        } catch (\Exception $e) {
            Log::error('Error retrieving address info: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while retrieving address info'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'address_1' => 'required|string|max:255',
            'address_2' => 'nullable|string|max:255',
            'city' => 'required|string|max:50',
            'state_province' => 'required|string|max:50',
            'country' => 'required|string|max:100',
            'zipcode' => 'required|string|max:20',
            'delivery_address' => 'required|string',
            'contact_number' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $addressInfo = AddressInfo::findOrFail($id);
            if (!Auth::user()->isAdmin() && $addressInfo->user_id !== Auth::id()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            $addressInfo->update($validator->validated());
            return response()->json([
                'message' => 'Address Info updated successfully',
                'data' => $addressInfo->load('user:id,first_name,last_name'),
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Address Info not found'], 404);
        } catch (\Exception $e) {
            Log::error('Error updating address info: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while updating address info'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $addressInfo = AddressInfo::findOrFail($id);
            if (!Auth::user()->isAdmin() && $addressInfo->user_id !== Auth::id()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            $addressInfo->delete();
            return response()->json(['message' => 'Address Info deleted successfully'], 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Address Info not found'], 404);
        } catch (\Exception $e) {
            Log::error('Error deleting address info: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while deleting address info'], 500);
        }
    }
}
