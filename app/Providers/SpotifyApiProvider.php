<?php

namespace App\Providers;

use Illuminate\Cache\Repository;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use SpotifyWebAPI\Session;
use SpotifyWebAPI\SpotifyWebAPI;

class SpotifyApiProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->singleton(SpotifyWebAPI::class, function ($app) {

            $cache = $app->make(Repository::class);

            // figure out of access token has expired
            // subtract 10 seconds from now so that we make sure theres no odd overlap miss
            if((time() - 10) > $cache->get('accessTokenExpiration')) {
                $spotifySession = $app->make(Session::class);
                $spotifySession->refreshAccessToken($cache->get('refreshToken'));

                $cache->put('accessToken', $spotifySession->getAccessToken(), 9999999);
                $cache->put('accessTokenExpiration', $spotifySession->getTokenExpiration(), 9999999);
            }

            $api = new SpotifyWebAPI();
            $api->setAccessToken($cache->get('accessToken'));

            return $api;
        });
    }
}


