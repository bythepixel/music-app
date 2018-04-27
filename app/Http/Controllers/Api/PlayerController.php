<?php

namespace App\Http\Controllers\Api;

use Illuminate\Cache\Repository;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use SpotifyWebAPI\SpotifyWebAPI;

class PlayerController extends BaseController
{
    const PLAYLIST_NAME = 'music-app-playlist';

    // roeland macbook d728d80cedc1399cdffbe3a56ca729ed85f7201e
    // stereo f57307345802771da1880738d5e81396173c627e
    const DEVICE_ID = 'd728d80cedc1399cdffbe3a56ca729ed85f7201e';

    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function devices(SpotifyWebAPI $spotifyApi)
    {
        return response()->json($spotifyApi->getMyDevices());
    }

    public function playlist(SpotifyWebAPI $spotifyApi, Repository $cache)
    {
        $playlistId = $this->getPlaylistId($spotifyApi, $cache);

        $tracks = $spotifyApi->getUserPlaylistTracks($spotifyApi->me()->id, $playlistId);

        dump($tracks);
    }

    public function activeSong(SpotifyWebAPI $spotifyApi)
    {

    }

    public function addTrack(SpotifyWebAPI $spotifyWebAPI, Repository $cache, Request $request)
    {
        $spotifyWebAPI->addUserPlaylistTracks(
            $spotifyWebAPI->me()->id,
            $this->getPlaylistId($spotifyWebAPI, $cache),
            $request->get('id')
        );

        return response()->json(['success' => true]);
    }

    public function play(SpotifyWebAPI $spotifyWebAPI, Repository $cache)
    {
        $spotifyWebAPI->play(self::DEVICE_ID, [
            'context_uri' => 'spotify:user:' . $spotifyWebAPI->me()->id . ':playlist:' . $this->getPlaylistId($spotifyWebAPI, $cache)
        ]);
    }

    public function pause(SpotifyWebAPI $spotifyWebAPI, Repository $cache)
    {
        $spotifyWebAPI->pause(self::DEVICE_ID);
    }

    private function getPlaylistId(SpotifyWebAPI $spotifyApi, Repository $cache)
    {
        // check our cache first
        if($cache->get('playlist_id')) {
            return $cache->get('playlist_id');
        }

        // get all playlists
        $playlists = $spotifyApi->getUserPlaylists($spotifyApi->me()->id);

        // look for our system playlist and find its ID
        foreach($playlists->items as $playlist) {
            if(self::PLAYLIST_NAME === $playlist->name) {
                $cache->put('playlist_id', $playlist->id);
                return $playlist->id;
            }
        }

        // the system playlist has not been created so lets do that
        $result = $spotifyApi->createUserPlaylist($spotifyApi->me()->id, ['name' => self::PLAYLIST_NAME]);

        return $result->id;
    }
}
