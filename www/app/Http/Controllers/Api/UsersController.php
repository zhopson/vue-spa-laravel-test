<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Artisan;

class UsersController extends Controller
{
    public function index_all()
    {
        return UserResource::collection(User::all());
    }
    public function index()
    {
        return UserResource::collection(User::paginate(10));
//        $data = User::paginate(10);
//        return $data;
//        return response()->json($data);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required|min:8',
        ]);

        return new UserResource(User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]));
    }
    public function show(User $user)
    {
        return new UserResource($user);
    }
    public function update(User $user, Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
        ]);

        $user->update($data);

        return new UserResource($user);
    }
    public function destroy(User $user)
    {
        $user->delete();

        return response(null, 204);
    }
    public function fill_db()
    {
        Artisan::call('migrate --seed');
//        return $this->sendResponse("", 'Database cleared and filled faker data.');
        return response(null, 204);
    }
    
}
