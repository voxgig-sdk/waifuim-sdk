

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


describe('ArtistEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WAIFUIM_TEST_LIVE=TRUE.
  afterEach(liveDelay('WAIFUIM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WaifuimSDK.test()
    const ent = testsdk.Artist()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WAIFUIM_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'artist.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the artist","t":"`$STRING`","key$":"id","index$":0},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the artist","t":"`$STRING`","key$":"name","index$":1},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"sh":"URL to the artist's profile or portfolio","t":"`$STRING`","key$":"url","index$":2}},"id":{"field":"id","name":"id"},"name":"artist","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /artists","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":100,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/artists","q":{"exist":["page","page_size"]},"r":{},"s":[{"lit":"artists"}],"t":{"req":"`reqdata`","res":"`body.artists`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"artist","name__orig":"artist","Name":"Artist","name_":"artist","name-":"artist","NAME":"ARTIST","index$":0}, {"active":true,"entity":"artist","key$":"BasicArtistFlow","kind":"basic","name":"BasicArtistFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"artist_ref01"}}],"index$":0}]}, 'Artist', {"GET /artists":{"protocol":"http","operationId":"getArtistsList","responses":{"200":{"description":"Successful response with list of artists","content":{"application/json":{"schema":{"type":"object","properties":{"artists":{"items":{"properties":{"id":{"description":"Unique identifier for the artist","type":"string","key$":"id"},"name":{"description":"Name of the artist","type":"string","key$":"name"},"url":{"description":"URL to the artist's profile or portfolio","format":"uri","type":"string","key$":"url"}},"type":"object","index$":0},"key$":"artists","type":"array"},"total":{"description":"Total number of artists available","key$":"total","type":"integer"},"page":{"description":"Current page number","key$":"page","type":"integer"},"pageSize":{"description":"Number of items per page","key$":"pageSize","type":"integer"}}}}}},"400":{"description":"Bad request - invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}}}}}},"parameters":[{"name":"pageSize","in":"query","description":"Number of artists to return per page","required":false,"schema":{"type":"integer","default":100,"minimum":1,"maximum":100},"index$":0},{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","default":1,"minimum":1},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let artist_ref01_data = Object.values(setup.data.existing.artist)[0] as any

    // LIST
    const artist_ref01_ent = client.Artist()
    const artist_ref01_match: any = {}

    const artist_ref01_list = (await artist_ref01_ent.list(artist_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/artist/ArtistTestData.json')

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
    ['artist01','artist02','artist03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WAIFUIM_TEST_ARTIST_ENTID': idmap,
    'WAIFUIM_TEST_LIVE': 'FALSE',
    'WAIFUIM_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WAIFUIM_TEST_ARTIST_ENTID']

  const live = 'TRUE' === env.WAIFUIM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WAIFUIM_TEST_ARTIST_ENTID']
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
  
