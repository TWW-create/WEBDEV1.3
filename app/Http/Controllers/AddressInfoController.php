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
    // Get all addresses
    public function index()
    {
        try {
            $addressInfos = AddressInfo::with('user:id,first_name,last_name')->get();
            return response()->json([
                'message' => 'All addresses retrieved successfully',
                'data' => $addressInfos
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error retrieving all addresses: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to retrieve addresses',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Get authenticated user's addresses
    public function myAddresses()
    {
        try {
            $addresses = AddressInfo::where('user_id', Auth::id())->get();
            return response()->json([
                'message' => 'Your addresses retrieved successfully',
                'data' => $addresses
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error retrieving user addresses: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to retrieve your addresses',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Get addresses for a specific user
    public function userAddresses($userId)
    {
        try {
            $user = User::findOrFail($userId);
            $addresses = AddressInfo::where('user_id', $userId)
                ->with('user:id,first_name,last_name')
                ->get();
            
            return response()->json([
                'message' => 'User addresses retrieved successfully',
                'data' => $addresses
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'User not found',
                'error' => $e->getMessage()
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error retrieving user addresses: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to retrieve user addresses',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Add new address
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'address_1' => 'required|string|max:255',
            'address_2' => 'nullable|string|max:255',
            'city' => 'required|string|max:50',
            'state_province' => 'required|string|max:50',
            'country' => 'required|string|max:100',
            'zipcode' => 'required|string|max:20',
            'delivery_address' => 'nullable|boolean',
            'contact_number' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $userId = Auth::id();
            
            if ($request->delivery_address) {
                AddressInfo::where('user_id', $userId)
                    ->update(['delivery_address' => false]);
            }

            $addressInfo = AddressInfo::create(
                array_merge($validator->validated(), ['user_id' => $userId])
            );

            return response()->json([
                'message' => 'Address added successfully',
                'data' => $addressInfo
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating address: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to create address',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Set delivery address
    public function setDeliveryAddress($id)
    {
        try {
            $address = AddressInfo::where('user_id', Auth::id())
                ->findOrFail($id);

            AddressInfo::where('user_id', Auth::id())
                ->update(['delivery_address' => false]);

            $address->update(['delivery_address' => true]);

            return response()->json([
                'message' => 'Delivery address updated successfully',
                'data' => $address
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Address not found',
                'error' => $e->getMessage()
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error setting delivery address: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to set delivery address',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Update address
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'address_1' => 'required|string|max:255',
            'address_2' => 'nullable|string|max:255',
            'city' => 'required|string|max:50',
            'state_province' => 'required|string|max:50',
            'country' => 'required|string|max:100',
            'zipcode' => 'required|string|max:20',
            'delivery_address' => 'nullable|boolean',
            'contact_number' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $address = AddressInfo::where('user_id', Auth::id())
                ->findOrFail($id);

            if ($request->delivery_address) {
                AddressInfo::where('user_id', Auth::id())
                    ->update(['delivery_address' => false]);
            }

            $address->update($validator->validated());
            
            return response()->json([
                'message' => 'Address updated successfully',
                'data' => $address
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Address not found',
                'error' => $e->getMessage()
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error updating address: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to update address',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Delete address
    public function destroy($id)
    {
        try {
            $address = AddressInfo::where('user_id', Auth::id())
                ->findOrFail($id);
                
            $address->delete();
            return response()->json([
                'message' => 'Address deleted successfully'
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Address not found',
                'error' => $e->getMessage()
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error deleting address: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to delete address',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
