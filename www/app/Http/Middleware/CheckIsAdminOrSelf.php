<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckIsAdminOrSelf
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
//        $requestedUserId = $request->route()->parameter('id');
        $requestedUserId = $request->route()->parameter('user');
        //var_dump($requestedUserId['id']); exit;
        if(
            Auth::user()->is_admin === 1 ||
//            Auth::user()->id === $requestedUserId
            Auth::user()->id === $requestedUserId['id']
        ) {
            return $next($request);
        }
        else {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }
}
