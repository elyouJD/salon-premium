<?php

use App\Kernel;
// زيد هاد السطر باش تعطي PHP وقت أكثر (300 ثواني = 5 دقائق)
ini_set('max_execution_time', 300);

require_once dirname(__DIR__) . '/vendor/autoload_runtime.php';

return static function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};
