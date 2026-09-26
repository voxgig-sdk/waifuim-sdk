# Waifuim SDK utility: make_context
require_relative '../core/context'
module WaifuimUtilities
  MakeContext = ->(ctxmap, basectx) {
    WaifuimContext.new(ctxmap, basectx)
  }
end
