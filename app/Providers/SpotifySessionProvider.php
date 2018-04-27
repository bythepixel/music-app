<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use SpotifyWebAPI\Session;
use SpotifyWebAPI\SpotifyWebAPI;

class SpotifySessionProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->singleton(Session::class, function ($app) {
            return new Session(
                env('SPOTIFY_CLIENT_ID'),
                env('SPOTIFY_CLIENT_SECRET'),
                env('APP_URL') . '/api/spotifyAuth/processAuthCallback'
            );
        });
    }
}
