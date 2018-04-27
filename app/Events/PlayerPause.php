<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class PlayerPause implements ShouldBroadcastNow
{
    public function broadcastOn()
    {
        return new Channel('music-app');
    }

    public function broadCastAs()
    {
        return 'player.pause';
    }
}