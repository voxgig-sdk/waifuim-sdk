# Waifuim SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module WaifuimFeatures
  def self.make_feature(name)
    case name
    when "base"
      WaifuimBaseFeature.new
    when "ratelimit"
      WaifuimRatelimitFeature.new
    when "retry"
      WaifuimRetryFeature.new
    when "test"
      WaifuimTestFeature.new
    when "timeout"
      WaifuimTimeoutFeature.new
    else
      WaifuimBaseFeature.new
    end
  end
end
