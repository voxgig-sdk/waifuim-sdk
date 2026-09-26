<?php
declare(strict_types=1);

// Waifuim SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class WaifuimMakeContext
{
    public static function call(array $ctxmap, ?WaifuimContext $basectx): WaifuimContext
    {
        return new WaifuimContext($ctxmap, $basectx);
    }
}
