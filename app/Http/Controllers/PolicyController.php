<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ShippingPolicy;
use App\Models\ReturnPolicy;
use App\Models\Faq;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class PolicyController extends Controller
{
    public function getShippingPolicy()
    {
        try {
            $policy = ShippingPolicy::where('status', true)->latest()->first();
            
            if (!$policy) {
                return response()->json(['message' => 'No shipping policy found'], 404);
            }
            
            return response()->json(['data' => $policy]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch shipping policy'], 500);
        }
    }

    public function updateShippingPolicy(Request $request)
    {
        try {
            $request->validate(['content' => 'required|string']);
            
            $policy = ShippingPolicy::create([
                'content' => $request->content,
                'status' => true
            ]);
            
            return response()->json([
                'message' => 'Shipping policy updated successfully',
                'data' => $policy
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Invalid input data',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update shipping policy'], 500);
        }
    }

    public function getReturnPolicy()
    {
        try {
            $policy = ReturnPolicy::where('status', true)->latest()->first();
            
            if (!$policy) {
                return response()->json(['message' => 'No return policy found'], 404);
            }
            
            return response()->json(['data' => $policy]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch return policy'], 500);
        }
    }

    public function updateReturnPolicy(Request $request)
    {
        try {
            $request->validate(['content' => 'required|string']);
            
            $policy = ReturnPolicy::create([
                'content' => $request->content,
                'status' => true
            ]);
            
            return response()->json([
                'message' => 'Return policy updated successfully',
                'data' => $policy
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Invalid input data',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update return policy'], 500);
        }
    }

    public function getFaqs()
    {
        try {
            $faqs = Faq::where('status', true)
                ->orderBy('order')
                ->get();
                
            if ($faqs->isEmpty()) {
                return response()->json(['message' => 'No FAQs found'], 404);
            }
            
            return response()->json(['data' => $faqs]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch FAQs'], 500);
        }
    }

    public function createFaq(Request $request)
    {
        try {
            $request->validate([
                'question' => 'required|string',
                'answer' => 'required|string',
                'order' => 'nullable|integer'
            ]);

            $faq = Faq::create([
                'question' => $request->question,
                'answer' => $request->answer,
                'order' => $request->order ?? 0,
                'status' => true
            ]);

            return response()->json([
                'message' => 'FAQ created successfully',
                'data' => $faq
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Invalid input data',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create FAQ'], 500);
        }
    }

    public function updateFaq(Request $request, Faq $faq)
    {
        try {
            $request->validate([
                'question' => 'required|string',
                'answer' => 'required|string',
                'order' => 'nullable|integer'
            ]);

            $faq->update($request->all());
            
            return response()->json([
                'message' => 'FAQ updated successfully',
                'data' => $faq
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'FAQ not found'], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Invalid input data',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update FAQ'], 500);
        }
    }

    public function deleteFaq(Faq $faq)
    {
        try {
            $faq->delete();
            return response()->json(['message' => 'FAQ deleted successfully']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'FAQ not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete FAQ'], 500);
        }
    }

    public function getInactiveShippingPolicies()
    {
        try {
            $policies = ShippingPolicy::where('status', false)
                ->latest()
                ->get();
                
            return response()->json(['data' => $policies]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch inactive shipping policies'], 500);
        }
    }
    
    public function getInactiveReturnPolicies()
    {
        try {
            $policies = ReturnPolicy::where('status', false)
                ->latest()
                ->get();
                
            return response()->json(['data' => $policies]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch inactive return policies'], 500);
        }
    }
    
    public function getInactiveFaqs()
    {
        try {
            $faqs = Faq::where('status', false)
                ->orderBy('order')
                ->get();
                
            return response()->json(['data' => $faqs]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch inactive FAQs'], 500);
        }
    }
    
}
