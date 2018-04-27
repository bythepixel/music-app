<?php

Route::get('/player/devices', 'Api\PlayerController@devices');
Route::get('/player/playlist', 'Api\PlayerController@playlist');
Route::get('/player/activeSong', 'Api\PlayerController@activeSong');
Route::get('/player/addTrack', 'Api\PlayerController@addTrack');

Route::get('/player/play', 'Api\PlayerController@play');
Route::get('/player/pause', 'Api\PlayerController@pause');

Route::get('/spotifyAuth', 'Api\SpotifyAuthController@index');
Route::get('/spotifyAuth/processAuthCallback', 'Api\SpotifyAuthController@processAuthCallback');
Route::get('/spotifyAuth/refreshAccessToken', 'Api\SpotifyAuthController@refreshAccessToken');