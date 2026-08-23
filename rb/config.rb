# GithubApi2 SDK configuration

module GithubApi2Config
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "GithubApi2",
        "slug" => "github-api2",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.waifu.im",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "artist" => {},
          "image" => {},
        },
      },
      "entity" => {
        "artist" => {
          "fields" => [
            {
              "name" => "id",
              "short" => "Unique identifier for the artist",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Name of the artist",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "short" => "URL to the artist's profile or portfolio",
              "type" => "`$STRING`",
            },
          ],
          "name" => "artist",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 100,
                        "kind" => "query",
                        "name" => "page_size",
                        "orig" => "page_size",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/artists",
                  "parts" => [
                    "artists",
                  ],
                  "select" => {
                    "exist" => [
                      "page",
                      "page_size",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.artists`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "image" => {
          "fields" => [
            {
              "name" => "artist",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "category",
              "short" => "Category of the image",
              "type" => "`$STRING`",
            },
            {
              "name" => "height",
              "short" => "Image height in pixels",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the image",
              "type" => "`$STRING`",
            },
            {
              "name" => "thumbnail",
              "short" => "URL to the thumbnail version of the image",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "short" => "URL to the image",
              "type" => "`$STRING`",
            },
            {
              "name" => "width",
              "short" => "Image width in pixels",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "image",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "category",
                        "orig" => "category",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 30,
                        "kind" => "query",
                        "name" => "page_size",
                        "orig" => "page_size",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/images",
                  "parts" => [
                    "images",
                  ],
                  "select" => {
                    "exist" => [
                      "category",
                      "page",
                      "page_size",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.images`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    GithubApi2Features.make_feature(name)
  end
end
