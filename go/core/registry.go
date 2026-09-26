package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewArtistEntityFunc func(client *WaifuimSDK, entopts map[string]any) WaifuimEntity

var NewImageEntityFunc func(client *WaifuimSDK, entopts map[string]any) WaifuimEntity

