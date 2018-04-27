<?php

Route::get('/player/devices', 'Api\PlayerController@devices');
Route::get('/player/getPlaylist', 'Api\PlayerController@getPlaylist');
Route::get('/player/activeSong', 'Api\PlayerController@activeSong');
Route::get('/player/addTrack', 'Api\PlayerController@addTrack');
Route::get('/player/getState', 'Api\PlayerController@getState');
Route::get('/player/play', 'Api\PlayerController@play');
Route::get('/player/pause', 'Api\PlayerController@pause');
Route::get('/player/playTrack', 'Api\PlayerController@playTrack');

Route::get('/spotifyAuth', 'Api\SpotifyAuthController@index');
Route::get('/spotifyAuth/processAuthCallback', 'Api\SpotifyAuthController@processAuthCallback');
Route::get('/spotifyAuth/refreshAccessToken', 'Api\SpotifyAuthController@refreshAccessToken');