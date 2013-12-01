require "rubygems"
require "favicon_maker"

options = {
  :versions => [:apple_144, :apple_120, :apple_114, :apple_72, :apple_57, :apple_pre, :apple, :fav_png, :fav_ico],
  :custom_versions => {},
  :root_dir => File.dirname(__FILE__),
  :input_dir => "favicons",
  :base_image => "favicon_base.png",
  :output_dir => "favicons",
  :copy => false
}

FaviconMaker::Generator.create_versions(options)
