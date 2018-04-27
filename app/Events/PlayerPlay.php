<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class PlayerPlay implements ShouldBroadcastNow
{
    public function broadcastOn()
    {
        return new Channel('music-app');
    }

    public function broadCastAs()
    {
        return 'player.play';
    }
}