# Prepare the Light Within (心灯计划) assets for the web.
# Usage (from web/):  powershell -ExecutionPolicy Bypass -File scripts/prepare-light.ps1 -Src "C:\path\to\心灯计划"
param([Parameter(Mandatory = $true)][string]$Src)
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$out = Join-Path $root 'public\light'
New-Item -ItemType Directory -Force $out | Out-Null

$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$q = New-Object System.Drawing.Imaging.EncoderParameters(1)
$q.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]86)

function Save-Resized($path, $dest, $width, $kind) {
  $img = [System.Drawing.Image]::FromFile($path)
  $scale = [Math]::Min(1.0, $width / $img.Width)
  $w = [int]($img.Width * $scale)
  $h = [int]($img.Height * $scale)
  $bmp = New-Object System.Drawing.Bitmap -ArgumentList $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  if ($kind -eq 'jpg') { $g.Clear([System.Drawing.Color]::FromArgb(14, 26, 60)) } else { $g.Clear([System.Drawing.Color]::Transparent) }
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.DrawImage($img, 0, 0, $w, $h)
  $target = Join-Path $out $dest
  if ($kind -eq 'png') { $bmp.Save($target, [System.Drawing.Imaging.ImageFormat]::Png) } else { $bmp.Save($target, $jpeg, $q) }
  '{0} -> {1} ({2}x{3}, {4} KB)' -f (Split-Path -Leaf $path), $dest, $w, $h, [int]((Get-Item $target).Length / 1KB)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
}
function P($n) { Join-Path $Src $n }

# Research + structure diagrams (transparent PNGs, sit on the navy page)
Save-Resized (P '1.png')  'mind-youth.png'    1300 'png'
Save-Resized (P '2.png')  'research.png'      1300 'png'
Save-Resized (P '3.png')  'journey.png'       2000 'png'
Save-Resized (P '4.png')  'ia.png'            1300 'png'
Save-Resized (P '5.png')  'brand.png'         1100 'png'
Save-Resized (P '6.png')  'input-map.png'     1300 'png'
# 3D / AI lantern
Save-Resized (P '7.png')  'lantern-3d.png'     900 'png'
Save-Resized (P '12.png') 'lantern-ai.png'     900 'png'
Save-Resized (P '8.png')  'lantern-derive.png' 900 'png'
# Interface screens (opaque) + flow
Save-Resized (P '17.png') 'page1.jpg'          640 'jpg'
Save-Resized (P '15.png') 'page2.jpg'          640 'jpg'
Save-Resized (P '14.png') 'page3.jpg'          640 'jpg'
Save-Resized (P '18.png') 'page4.jpg'          640 'jpg'
Save-Resized (P '16.png') 'page6.jpg'          640 'jpg'
Save-Resized (P '13.png') 'flow.png'          2000 'png'
Save-Resized (P '10.png') 'posters.png'       1400 'png'
Save-Resized (P '11.png') 'mockups.jpg'       1800 'jpg'
# Decorative scribble star (name contains Chinese, so find it by pattern)
$deco = Get-ChildItem $Src -Filter '*.png' | Where-Object { $_.Name -notmatch '^\d' } | Select-Object -First 1
Save-Resized $deco.FullName 'star.png' 700 'png'

# Palette: sample the colour circles from the swatch sheet
$sw = New-Object System.Drawing.Bitmap (P '20.png')
$y = [int]($sw.Height * 0.20)
$prev = ''
for ($x = 0; $x -lt $sw.Width; $x += [int]($sw.Width / 40)) {
  $c = $sw.GetPixel($x, $y)
  if ($c.A -gt 200) { $hex = '#{0:x2}{1:x2}{2:x2}' -f $c.R, $c.G, $c.B; if ($hex -ne $prev) { "swatch x=$x $hex"; $prev = $hex } }
}
$sw.Dispose()
