<?php

namespace App\Models;


use MongoDB\Laravel\Eloquent\Model;
class MongoLog extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'activity_logs';

    protected $fillable = [
        'action',
        'entity_type', 
        'entity_id',
        'old_data',
        'new_data',
        'user_id',
        'ip_address',
        'user_agent'
    ];

    protected $casts = [
        'old_data' => 'array',
        'new_data' => 'array'
    ];
}