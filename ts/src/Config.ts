
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'GithubApi2',
        slug: "github-api2",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.waifu.im",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      artist: {
      },

      image: {
      },

    }
  }


  entity = {
    "artist": {
      "fields": [
        {
          "name": "id",
          "short": "Unique identifier for the artist",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "Name of the artist",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "short": "URL to the artist's profile or portfolio",
          "type": "`$STRING`"
        }
      ],
      "name": "artist",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 100,
                    "kind": "query",
                    "name": "page_size",
                    "orig": "page_size",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/artists",
              "parts": [
                "artists"
              ],
              "select": {
                "exist": [
                  "page",
                  "page_size"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.artists`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "image": {
      "fields": [
        {
          "name": "artist",
          "type": "`$OBJECT`"
        },
        {
          "name": "category",
          "short": "Category of the image",
          "type": "`$STRING`"
        },
        {
          "name": "height",
          "short": "Image height in pixels",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the image",
          "type": "`$STRING`"
        },
        {
          "name": "thumbnail",
          "short": "URL to the thumbnail version of the image",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "short": "URL to the image",
          "type": "`$STRING`"
        },
        {
          "name": "width",
          "short": "Image width in pixels",
          "type": "`$INTEGER`"
        }
      ],
      "name": "image",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "category",
                    "orig": "category",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 30,
                    "kind": "query",
                    "name": "page_size",
                    "orig": "page_size",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/images",
              "parts": [
                "images"
              ],
              "select": {
                "exist": [
                  "category",
                  "page",
                  "page_size"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.images`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

