# Waifuim SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

WaifuimUtility.registrar = ->(u) {
  u.clean = WaifuimUtilities::Clean
  u.done = WaifuimUtilities::Done
  u.make_error = WaifuimUtilities::MakeError
  u.feature_add = WaifuimUtilities::FeatureAdd
  u.feature_hook = WaifuimUtilities::FeatureHook
  u.feature_init = WaifuimUtilities::FeatureInit
  u.fetcher = WaifuimUtilities::Fetcher
  u.make_fetch_def = WaifuimUtilities::MakeFetchDef
  u.make_context = WaifuimUtilities::MakeContext
  u.make_options = WaifuimUtilities::MakeOptions
  u.make_request = WaifuimUtilities::MakeRequest
  u.make_response = WaifuimUtilities::MakeResponse
  u.make_result = WaifuimUtilities::MakeResult
  u.make_point = WaifuimUtilities::MakePoint
  u.make_spec = WaifuimUtilities::MakeSpec
  u.make_url = WaifuimUtilities::MakeUrl
  u.param = WaifuimUtilities::Param
  u.prepare_auth = WaifuimUtilities::PrepareAuth
  u.prepare_body = WaifuimUtilities::PrepareBody
  u.prepare_headers = WaifuimUtilities::PrepareHeaders
  u.prepare_method = WaifuimUtilities::PrepareMethod
  u.prepare_params = WaifuimUtilities::PrepareParams
  u.prepare_path = WaifuimUtilities::PreparePath
  u.prepare_query = WaifuimUtilities::PrepareQuery
  u.graphql_body = WaifuimUtilities::GraphqlBody
  u.graphql_errors = WaifuimUtilities::GraphqlErrors
  u.result_basic = WaifuimUtilities::ResultBasic
  u.result_body = WaifuimUtilities::ResultBody
  u.result_headers = WaifuimUtilities::ResultHeaders
  u.transform_request = WaifuimUtilities::TransformRequest
  u.transform_response = WaifuimUtilities::TransformResponse
}
