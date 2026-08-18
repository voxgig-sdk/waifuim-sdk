package voxgiggithubapi2sdk

import (
	"github.com/voxgig-sdk/github-api2-sdk/go/core"
	"github.com/voxgig-sdk/github-api2-sdk/go/entity"
	"github.com/voxgig-sdk/github-api2-sdk/go/feature"
	_ "github.com/voxgig-sdk/github-api2-sdk/go/utility"
)

// Type aliases preserve external API.
type GithubApi2SDK = core.GithubApi2SDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type GithubApi2Entity = core.GithubApi2Entity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type GithubApi2Error = core.GithubApi2Error

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewArtistEntityFunc = func(client *core.GithubApi2SDK, entopts map[string]any) core.GithubApi2Entity {
		return entity.NewArtistEntity(client, entopts)
	}
	core.NewImageEntityFunc = func(client *core.GithubApi2SDK, entopts map[string]any) core.GithubApi2Entity {
		return entity.NewImageEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewGithubApi2SDK = core.NewGithubApi2SDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewGithubApi2SDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *GithubApi2SDK  { return NewGithubApi2SDK(nil) }
func Test() *GithubApi2SDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
