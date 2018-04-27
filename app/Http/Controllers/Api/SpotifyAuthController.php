<?php

namespace App\Http\Controllers\Api;

use Illuminate\Cache\Repository;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use SpotifyWebAPI\Session;

class SpotifyAuthController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function index(Session $spotifySession)
    {
        // Get ALL the permissions
        $options = [
            'scope' => [
                // Playlists
                'playlist-read-collaborative',
                'playlist-modify-private',
                'playlist-read-private',
                'playlist-modify-public',

                // Users
                'user-read-email',
                'user-read-private',
                'user-read-birthdate',

                // Spotify Connect
                'user-read-playback-state',
                'user-read-currently-playing',
                'user-modify-playback-state',

                // Listening History
                'user-read-recently-played',
                'user-top-read',

                // Follow
                'user-follow-read',
                'user-follow-modify',

                // Playback
                'streaming',

                // Library
                'user-library-read',
                'user-library-modify'
            ]
        ];

        return redirect($spotifySession->getAuthorizeUrl($options));
    }

    public function processAuthCallback(Session $spotifySession, Request $request, Repository $cache)
    {
        $spotifySession->requestAccessToken($request->get('code'));

        $cache->put('accessToken', $spotifySession->getAccessToken(), 9999999);
        $cache->put('accessTokenExpiration', $spotifySession->getTokenExpiration(), 9999999);
        $cache->put('refreshToken', $spotifySession->getRefreshToken(), 9999999);
    }
}
