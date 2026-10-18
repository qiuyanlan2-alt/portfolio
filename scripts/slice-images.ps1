# Slice the long portfolio strips into web-sized chunks.
# Usage (from web/):  powershell -ExecutionPolicy Bypass -File scripts/slice-images.ps1
# Source strips live in ../assets/work; output goes to public/work/<id>/NN.jpg
Add-Type -AssemblyName System.Drawing

$root   = Split-Path -Parent $PSScriptRoot
$src    = Join-Path (Split-Path -Parent $root) 'assets\work'
$out    = Join-Path $root 'public\work'
$width  = 1200
$chunk  = 1200
$map = @{
  'rose'   = 'mp4-02.jpg'
  'ui'     = 'frame.jpg'
  'beauty' = 'beauty.jpg'
  'kora'   = 'game-05.jpg'
  'light'  = 'game-06.jpg'
  'sea'    = 'game-07.jpg'
}

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters(1)
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]82)

foreach ($id in $map.Keys) {
  $dir = Join-Path $out $id
  New-Item -ItemType Directory -Force $dir | Out-Null
  $img = [System.Drawing.Image]::FromFile((Join-Path $src $map[$id]))
  $scale = $width / $img.Width
  $srcChunk = [int]($chunk / $scale)
  $n = 0
  for ($y = 0; $y -lt $img.Height; $y += $srcChunk) {
    $h = [Math]::Min($srcChunk, $img.Height - $y)
    $bmp = New-Object System.Drawing.Bitmap($width, [int]($h * $scale))
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = 'HighQualityBicubic'
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $bmp.Width, $bmp.Height)), 0, $y, $img.Width, $h, 'Pixel')
    $n++
    $bmp.Save((Join-Path $dir ('{0:D2}.jpg' -f $n)), $codec, $params)
    $g.Dispose(); $bmp.Dispose()
  }
  $img.Dispose()
  "$id -> $n chunks"
}
