<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class PlayerPlayTrack implements ShouldBroadcastNow
{
    private $trackId;

    public function __construct($trackId)
    {
        $this->trackId = $trackId;
    }

    public function broadcastOn()
    {
        return new Channel('music-app');
    }

    public function broadCastAs()
    {
        return 'player.play';
    }

    public function broadCastWith()
    {
        return ['trackId' => $this->trackId];
    }
}