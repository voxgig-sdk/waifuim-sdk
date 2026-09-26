# Waifuim SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Waifuim",
            "slug": "waifuim",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.waifu.im",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "artist": {},
                "image": {},
            },
        },
        "entity": {
      "artist": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the artist",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "Name of the artist",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "short": "URL to the artist's profile or portfolio",
            "format": "uri",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "artist",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/artists",
                "segments": [
                  {
                    "lit": "artists",
                  },
                ],
                "parts": [
                  "artists",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.artists`",
                },
                "args": {
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "page_size",
                      "orig": "page_size",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 100,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "page",
                    "page_size",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "image": {
        "fields": [
          {
            "name": "artist",
            "title": "Artist",
            "type": "`$OBJECT`",
          },
          {
            "name": "category",
            "title": "Category",
            "type": "`$STRING`",
            "short": "Category of the image",
          },
          {
            "name": "height",
            "title": "Height",
            "type": "`$INTEGER`",
            "short": "Image height in pixels",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the image",
          },
          {
            "name": "thumbnail",
            "title": "Thumbnail",
            "type": "`$STRING`",
            "short": "URL to the thumbnail version of the image",
            "format": "uri",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "short": "URL to the image",
            "format": "uri",
          },
          {
            "name": "width",
            "title": "Width",
            "type": "`$INTEGER`",
            "short": "Image width in pixels",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "image",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/images",
                "segments": [
                  {
                    "lit": "images",
                  },
                ],
                "parts": [
                  "images",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.images`",
                },
                "args": {
                  "query": [
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "page_size",
                      "orig": "page_size",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 30,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "category",
                    "page",
                    "page_size",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
