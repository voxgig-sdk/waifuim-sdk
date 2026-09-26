<?php
declare(strict_types=1);

// Waifuim SDK utility: result_headers

class WaifuimResultHeaders
{
    public static function call(WaifuimContext $ctx): ?WaifuimResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
