# Prepare the Rose Upgrade assets for the web.
# Usage (from web/):  powershell -ExecutionPolicy Bypass -File scripts/prepare-rose.ps1 -Src "C:\path\to\玫瑰升级"
param([Parameter(Mandatory = $true)][string]$Src)
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$out = Join-Path $root 'public\rose'
New-Item -ItemType Directory -Force $out | Out-Null
New-Item -ItemType Directory -Force (Join-Path $root 'public\videos') | Out-Null

$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$q = New-Object System.Drawing.Imaging.EncoderParameters(1)
$q.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]84)

function Save-Resized($file, $dest, $width, $kind, $cropTop = 0, $cropBottom = 0) {
  $img = [System.Drawing.Image]::FromFile((Join-Path $Src $file))
  $srcH = $img.Height - $cropTop - $cropBottom
  $scale = [Math]::Min(1.0, $width / $img.Width)
  $w = [int]($img.Width * $scale)
  $h = [int]($srcH * $scale)
  $bmp = New-Object System.Drawing.Bitmap -ArgumentList $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.Clear([System.Drawing.Color]::Transparent)
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), 0, $cropTop, $img.Width, $srcH, 'Pixel')
  $path = Join-Path $out $dest
  if ($kind -eq 'png') { $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png) } else { $bmp.Save($path, $jpeg, $q) }
  '{0} -> {1} ({2}x{3}, {4} KB)' -f $file, $dest, $w, $h, [int]((Get-Item $path).Length / 1KB)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
}

Save-Resized '1.png'     'moon-city.jpg'     1200 'jpg'   # hero + scene 5
Save-Resized '2.png'     's1-castle.jpg'      900 'jpg'
Save-Resized '3.png'     's2-orb.jpg'         900 'jpg'
Save-Resized '4.png'     's3-core.jpg'        900 'jpg'
Save-Resized '6.png'     's4-burst.jpg'       900 'jpg'
Save-Resized 'image.png' 'type-congrats.png' 1000 'png'
Save-Resized '8.png'     'type-thanks.png'   1400 'png'
# The two final frames are screenshots: trim the capture toolbar (top) and player bar (bottom).
Save-Resized '10.png'    'final-congrats.jpg' 760 'jpg' 70 130
Save-Resized '9.png'     'final-thanks.jpg'   760 'jpg' 70 130

Copy-Item (Join-Path $Src 'Rose.mp4') (Join-Path $root 'public\videos\rose-upgrade.mp4') -Force
'video copied'
