<?php
declare(strict_types=1);

// Waifuim SDK utility: result_body

class WaifuimResultBody
{
    public static function call(WaifuimContext $ctx): ?WaifuimResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
