# Prepare the KORA 404 assets for the web.
# Usage (from web/):  powershell -ExecutionPolicy Bypass -File scripts/prepare-kora.ps1 -Src "C:\path\to\kora"
param([Parameter(Mandatory = $true)][string]$Src)
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$out = Join-Path $root 'public\kora'
New-Item -ItemType Directory -Force $out | Out-Null

$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$q = New-Object System.Drawing.Imaging.EncoderParameters(1)
$q.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]84)

# Resize a source file (optionally cropped to a fractional x-range and trimmed to its visible pixels).
function Save-Resized($path, $dest, $width, $kind, $x0 = 0.0, $x1 = 1.0, $trim = $false) {
  $img = [System.Drawing.Image]::FromFile($path)
  $sx = [int]($img.Width * $x0); $sw = [int]($img.Width * ($x1 - $x0)); $sy = 0; $sh = $img.Height
  if ($trim) {
    $bm = New-Object System.Drawing.Bitmap $img
    $minX = $sw; $minY = $sh; $maxX = 0; $maxY = 0
    for ($y = 0; $y -lt $sh; $y += 3) { for ($x = 0; $x -lt $sw; $x += 3) {
      if ($bm.GetPixel($sx + $x, $y).A -gt 24) { if ($x -lt $minX) { $minX = $x }; if ($x -gt $maxX) { $maxX = $x }; if ($y -lt $minY) { $minY = $y }; if ($y -gt $maxY) { $maxY = $y } } } }
    $bm.Dispose()
    $pad = 6; $sx += [Math]::Max(0, $minX - $pad); $sw = [Math]::Min($sw, $maxX - $minX + 2 * $pad); $sy = [Math]::Max(0, $minY - $pad); $sh = [Math]::Min($sh - $sy, $maxY - $minY + 2 * $pad)
  }
  $scale = [Math]::Min(1.0, $width / $sw)
  $w = [int]($sw * $scale); $h = [int]($sh * $scale)
  $bmp = New-Object System.Drawing.Bitmap -ArgumentList $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  if ($kind -eq 'jpg') { $g.Clear([System.Drawing.Color]::FromArgb(10, 10, 10)) } else { $g.Clear([System.Drawing.Color]::Transparent) }
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), $sx, $sy, $sw, $sh, 'Pixel')
  $target = Join-Path $out $dest
  if ($kind -eq 'png') { $bmp.Save($target, [System.Drawing.Imaging.ImageFormat]::Png) } else { $bmp.Save($target, $jpeg, $q) }
  '{0} -> {1} ({2}x{3}, {4} KB)' -f (Split-Path -Leaf $path), $dest, $w, $h, [int]((Get-Item $target).Length / 1KB)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
}
function P($n) { Join-Path $Src $n }
# Files with Chinese names are located by pattern so this script stays ASCII-only.
function Find($pattern) { (Get-ChildItem $Src -Filter '*.png' | Where-Object { $_.Name -like $pattern } | Select-Object -First 1).FullName }

Save-Resized (P '0.png')        'k-hero.jpg'       2000 'jpg'
Save-Resized (P 'main.png')     'k-plate.jpg'      2000 'jpg'
Save-Resized (P 'worldwview.png') 'k-title-world.png' 700 'png'
Save-Resized (P 'front.png')    'k-title-font.png' 700 'png'
Save-Resized (P 'logo.png')     'k-logo-sketch.png' 500 'png' 0.0 0.3 $true

# The Chinese-named files are matched by pixel size so this script stays ASCII-only.
$bySize = @{}
Get-ChildItem $Src -Filter '*.png' | ForEach-Object { $i = [System.Drawing.Image]::FromFile($_.FullName); $bySize["$($i.Width)x$($i.Height)"] = $_.FullName; $i.Dispose() }
Save-Resized $bySize['526x645']   'k-logo-vector.png' 600 'png'    # vector refinement
Save-Resized $bySize['815x816']   'k-logo-final.png'  700 'png'    # AI render
Save-Resized (P 'logo3.png')      'k-symbols.png'    1500 'png'
Save-Resized $bySize['1710x920']  'k-letters.png'    1500 'png'
Save-Resized $bySize['1703x978']  'k-role1.png'      1500 'png'
Save-Resized $bySize['1490x1055'] 'k-role2.png'      1500 'png'
Save-Resized $bySize['1340x858']  'k-role3.png'      1500 'png'
Save-Resized $bySize['1429x1100'] 'k-frame.png'      1300 'png'    # framed trailer still
Save-Resized $bySize['3104x6380'] 'k-skeleton.png'    900 'png'    # faint backdrop figure
Save-Resized $bySize['814x2610']  'k-swirl.png'       400 'png'

Copy-Item (Get-ChildItem $Src -Filter '*.mp4' | Select-Object -First 1).FullName (Join-Path $out 'k-trailer.mp4') -Force
'video copied'

