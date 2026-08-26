<?php
declare(strict_types=1);

// GithubApi2 SDK configuration

class GithubApi2Config
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
                "name" => "GithubApi2",
                "slug" => "github-api2",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
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
              'short' => 'Unique identifier for the artist',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the artist',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'short' => 'URL to the artist\'s profile or portfolio',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'artist',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 100,
                        'kind' => 'query',
                        'name' => 'page_size',
                        'orig' => 'page_size',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/artists',
                  'parts' => [
                    'artists',
                  ],
                  'select' => [
                    'exist' => [
                      'page',
                      'page_size',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.artists`',
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
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'category',
              'short' => 'Category of the image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'height',
              'short' => 'Image height in pixels',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'thumbnail',
              'short' => 'URL to the thumbnail version of the image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'short' => 'URL to the image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'width',
              'short' => 'Image width in pixels',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'image',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'category',
                        'orig' => 'category',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 30,
                        'kind' => 'query',
                        'name' => 'page_size',
                        'orig' => 'page_size',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/images',
                  'parts' => [
                    'images',
                  ],
                  'select' => [
                    'exist' => [
                      'category',
                      'page',
                      'page_size',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.images`',
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
        return GithubApi2Features::make_feature($name);
    }
}
