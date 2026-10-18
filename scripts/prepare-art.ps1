# Prepare the "是插画" (Poems of the Sea) assets for the web.
# Usage (from web/):  powershell -ExecutionPolicy Bypass -File scripts/prepare-art.ps1 -Src "C:\path\to\illustration-folder"
param([Parameter(Mandatory = $true)][string]$Src)
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$out = Join-Path $root 'public\art'
New-Item -ItemType Directory -Force $out | Out-Null

$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$q = New-Object System.Drawing.Imaging.EncoderParameters(1)
$q.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]86)

function Save-Resized($file, $dest, $width, $kind) {
  $img = [System.Drawing.Image]::FromFile((Join-Path $Src $file))
  $scale = [Math]::Min(1.0, $width / $img.Width)
  $w = [int]($img.Width * $scale); $h = [int]($img.Height * $scale)
  $bmp = New-Object System.Drawing.Bitmap -ArgumentList $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  if ($kind -eq 'jpg') { $g.Clear([System.Drawing.Color]::White) } else { $g.Clear([System.Drawing.Color]::Transparent) }
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.DrawImage($img, 0, 0, $w, $h)
  $target = Join-Path $out $dest
  if ($kind -eq 'png') { $bmp.Save($target, [System.Drawing.Imaging.ImageFormat]::Png) } else { $bmp.Save($target, $jpeg, $q) }
  '{0} -> {1} ({2}x{3}, {4} KB)' -f $file, $dest, $w, $h, [int]((Get-Item $target).Length / 1KB)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
}

# title.png is generated separately (ink-only, transparent background) - do not overwrite it here.
Save-Resized '1.png'                                'hainan.jpg'    1700 'jpg'   # wide coast print
Save-Resized '132c9f77a6dd5fe7a12b1c0b77deee8c.png' 'quote-cat.png' 1100 'png'
Save-Resized '2.png'                                'strip1.jpg'     980 'jpg'
Save-Resized '3.png'                                'strip2.jpg'     980 'jpg'
Save-Resized '4.png'                                'strip3.jpg'     980 'jpg'
Save-Resized '5.png'                                'strip4.jpg'     980 'jpg'
Save-Resized '6.png'                                'girl-sleep.png' 1100 'png'
Save-Resized '7.png'                                'girl-green.png' 900  'png'
Save-Resized '8.png'                                'twins.png'      1000 'png'
Save-Resized 'cbfc6ffaf1356e10e0069656221483b4.png' 'quote-moments.png' 900 'png'
Save-Resized '9d6151d862186460a26bf3e0a19b4f73.png' 'quote-heart.png' 800 'png'
Save-Resized 'bbed21caedc9aa0b95dcc2c5f469c34b.png' 'tree.png'       780 'png'
