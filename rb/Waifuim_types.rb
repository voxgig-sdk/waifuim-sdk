# frozen_string_literal: true

# Typed models for the Waifuim SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Artist entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Artist = Struct.new(
  :id,
  :name,
  :url,
  keyword_init: true
)

# Request payload for Artist#list.
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
ArtistListMatch = Struct.new(
  :page,
  :page_size,
  keyword_init: true
)

# Image entity data model.
#
# @!attribute [rw] artist
#   @return [Hash, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] height
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] thumbnail
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] width
#   @return [Integer, nil]
Image = Struct.new(
  :artist,
  :category,
  :height,
  :id,
  :thumbnail,
  :url,
  :width,
  keyword_init: true
)

# Request payload for Image#list.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
ImageListMatch = Struct.new(
  :category,
  :page,
  :page_size,
  keyword_init: true
)

