

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { WaifuimSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ImageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WAIFUIM_TEST_LIVE=TRUE.
  afterEach(liveDelay('WAIFUIM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WaifuimSDK.test()
    const ent = testsdk.Image()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WAIFUIM_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'image.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"artist":{"a":true,"h":"Artist","n":"artist","r":false,"t":"`$OBJECT`","key$":"artist","index$":0},"category":{"a":true,"h":"Category","n":"category","r":false,"sh":"Category of the image","t":"`$STRING`","key$":"category","index$":1},"height":{"a":true,"h":"Height","n":"height","r":false,"sh":"Image height in pixels","t":"`$INTEGER`","key$":"height","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the image","t":"`$STRING`","key$":"id","index$":3},"thumbnail":{"a":true,"fo":"uri","h":"Thumbnail","n":"thumbnail","r":false,"sh":"URL to the thumbnail version of the image","t":"`$STRING`","key$":"thumbnail","index$":4},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"sh":"URL to the image","t":"`$STRING`","key$":"url","index$":5},"width":{"a":true,"h":"Width","n":"width","r":false,"sh":"Image width in pixels","t":"`$INTEGER`","key$":"width","index$":6}},"id":{"field":"id","name":"id"},"name":"image","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /images","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"category","or":"category","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":30,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/images","q":{"exist":["category","page","page_size"]},"r":{},"s":[{"lit":"images"}],"t":{"req":"`reqdata`","res":"`body.images`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"image","name__orig":"image","Name":"Image","name_":"image","name-":"image","NAME":"IMAGE","index$":1}, {"active":true,"entity":"image","key$":"BasicImageFlow","kind":"basic","name":"BasicImageFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"image_ref01"}}],"index$":0}]}, 'Image', {"GET /images":{"protocol":"http","operationId":"getImagesList","responses":{"200":{"description":"Successful response with list of images","content":{"application/json":{"schema":{"type":"object","properties":{"images":{"items":{"properties":{"artist":{"properties":{"id":{"description":"Artist identifier","type":"string"},"name":{"description":"Artist name","type":"string"}},"type":"object","key$":"artist"},"category":{"description":"Category of the image","type":"string","key$":"category"},"height":{"description":"Image height in pixels","type":"integer","key$":"height"},"id":{"description":"Unique identifier for the image","type":"string","key$":"id"},"thumbnail":{"description":"URL to the thumbnail version of the image","format":"uri","type":"string","key$":"thumbnail"},"url":{"description":"URL to the image","format":"uri","type":"string","key$":"url"},"width":{"description":"Image width in pixels","type":"integer","key$":"width"}},"type":"object","index$":0},"key$":"images","type":"array"},"total":{"description":"Total number of images available","key$":"total","type":"integer"},"page":{"description":"Current page number","key$":"page","type":"integer"},"pageSize":{"description":"Number of items per page","key$":"pageSize","type":"integer"}}}}}},"400":{"description":"Bad request - invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}}}}}},"parameters":[{"name":"pageSize","in":"query","description":"Number of images to return per page","required":false,"schema":{"type":"integer","default":30,"minimum":1,"maximum":100},"index$":0},{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","default":1,"minimum":1},"index$":1},{"name":"category","in":"query","description":"Filter images by category","required":false,"schema":{"type":"string"},"index$":2}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let image_ref01_data = Object.values(setup.data.existing.image)[0] as any

    // LIST
    const image_ref01_ent = client.Image()
    const image_ref01_match: any = {}

    const image_ref01_list = (await image_ref01_ent.list(image_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/image/ImageTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = WaifuimSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['image01','image02','image03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WAIFUIM_TEST_IMAGE_ENTID': idmap,
    'WAIFUIM_TEST_LIVE': 'FALSE',
    'WAIFUIM_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WAIFUIM_TEST_IMAGE_ENTID']

  const live = 'TRUE' === env.WAIFUIM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WAIFUIM_TEST_IMAGE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new WaifuimSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.WAIFUIM_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
