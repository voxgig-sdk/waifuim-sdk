<?php
declare(strict_types=1);

// Waifuim SDK configuration

class WaifuimConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Waifuim",
                "slug" => "waifuim",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://api.waifu.im",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "artist" => [],
                    "image" => [],
                ],
            ],
            "entity" => [
        'artist' => [
          'fields' => [
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'short' => 'Unique identifier for the artist',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'short' => 'Name of the artist',
            ],
            [
              'name' => 'url',
              'title' => 'Url',
              'type' => '`$STRING`',
              'short' => 'URL to the artist\'s profile or portfolio',
              'format' => 'uri',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'artist',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/artists',
                  'segments' => [
                    [
                      'lit' => 'artists',
                    ],
                  ],
                  'parts' => [
                    'artists',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.artists`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 1,
                      ],
                      [
                        'name' => 'page_size',
                        'orig' => 'page_size',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 100,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'page',
                      'page_size',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'image' => [
          'fields' => [
            [
              'name' => 'artist',
              'title' => 'Artist',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'category',
              'title' => 'Category',
              'type' => '`$STRING`',
              'short' => 'Category of the image',
            ],
            [
              'name' => 'height',
              'title' => 'Height',
              'type' => '`$INTEGER`',
              'short' => 'Image height in pixels',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'short' => 'Unique identifier for the image',
            ],
            [
              'name' => 'thumbnail',
              'title' => 'Thumbnail',
              'type' => '`$STRING`',
              'short' => 'URL to the thumbnail version of the image',
              'format' => 'uri',
            ],
            [
              'name' => 'url',
              'title' => 'Url',
              'type' => '`$STRING`',
              'short' => 'URL to the image',
              'format' => 'uri',
            ],
            [
              'name' => 'width',
              'title' => 'Width',
              'type' => '`$INTEGER`',
              'short' => 'Image width in pixels',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'image',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/images',
                  'segments' => [
                    [
                      'lit' => 'images',
                    ],
                  ],
                  'parts' => [
                    'images',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.images`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'category',
                        'orig' => 'category',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 1,
                      ],
                      [
                        'name' => 'page_size',
                        'orig' => 'page_size',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 30,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'category',
                      'page',
                      'page_size',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return WaifuimFeatures::make_feature($name);
    }
}
