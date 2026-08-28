-- Typed models for the GithubApi2 SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Artist
---@field id? string
---@field name? string
---@field url? string

---@class ArtistListMatch
---@field page? number
---@field page_size? number

---@class Image
---@field artist? table
---@field category? string
---@field height? number
---@field id? string
---@field thumbnail? string
---@field url? string
---@field width? number

---@class ImageListMatch
---@field category? string
---@field page? number
---@field page_size? number

local M = {}

return M
