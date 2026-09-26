# Waifuim SDK exists test

require "minitest/autorun"
require_relative "../Waifuim_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = WaifuimSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
