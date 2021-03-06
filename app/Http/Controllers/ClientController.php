<?php

namespace App\Http\Controllers;

use Illuminate\Cache\Repository;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ClientController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function index(Repository $cache)
    {
    	return view('AppView', [
            'accessToken' => $cache->get('accessToken'),
            'accessTokenExpiration' => $cache->get('accessTokenExpiration')
        ]);
    }
}
