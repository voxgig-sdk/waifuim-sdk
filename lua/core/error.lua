-- Waifuim SDK error

local WaifuimError = {}
WaifuimError.__index = WaifuimError


function WaifuimError.new(code, msg, ctx)
  local self = setmetatable({}, WaifuimError)
  self.is_sdk_error = true
  self.sdk = "Waifuim"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function WaifuimError:error()
  return self.msg
end


function WaifuimError:__tostring()
  return self.msg
end


return WaifuimError
