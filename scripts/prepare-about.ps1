# Prepare the About-page hand-drawn assets.
# Usage (from web/):  powershell -ExecutionPolicy Bypass -File scripts/prepare-about.ps1 -Src "C:\path\to\about-folder"
param([Parameter(Mandatory = $true)][string]$Src)
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$out = Join-Path $root 'public\about'
New-Item -ItemType Directory -Force $out | Out-Null

# Files are matched by pixel size so the script stays ASCII-only.
$by = @{}
Get-ChildItem $Src -File -Filter '*.png' | ForEach-Object { $i = [System.Drawing.Image]::FromFile($_.FullName); $by["$($i.Width)x$($i.Height)"] = $_.FullName; $i.Dispose() }

# Turn a flat-background drawing into transparent artwork. mode 'ink': dark strokes on a light/red field.
# mode 'red': red strokes on a dark field.
function Convert-Art($path, $dest, $mode, [int]$maxW) {
  $src = [System.Drawing.Bitmap]::FromFile($path)
  $w = $src.Width; $h = $src.Height
  $out32 = New-Object System.Drawing.Bitmap -ArgumentList $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $bg = $src.GetPixel(2, 2); $bgL = ($bg.R + $bg.G + $bg.B) / 3
  for ($y = 0; $y -lt $h; $y++) { for ($x = 0; $x -lt $w; $x++) {
    $c = $src.GetPixel($x, $y)
    if ($mode -eq 'ink') {
      $l = ($c.R + $c.G + $c.B) / 3
      $a = [Math]::Max(0, [Math]::Min(255, [int](($bgL - $l) / $bgL * 255 * 1.12)))
      $out32.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($a, 14, 14, 18))
    } else {
      $a = [Math]::Max(0, [Math]::Min(255, [int](($c.R - $bg.R) / (215 - $bg.R) * 255)))
      $out32.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($a, 224, 34, 45))
    }
  } }
  $src.Dispose()
  $scale = [Math]::Min(1.0, $maxW / $w)
  $nw = [int]($w * $scale); $nh = [int]($h * $scale)
  $fin = New-Object System.Drawing.Bitmap -ArgumentList $nw, $nh, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($fin); $g.InterpolationMode = 'HighQualityBicubic'; $g.DrawImage($out32, 0, 0, $nw, $nh)
  $fin.Save((Join-Path $out $dest), [System.Drawing.Imaging.ImageFormat]::Png)
  '{0} ({1}x{2})' -f $dest, $nw, $nh
  $g.Dispose(); $fin.Dispose(); $out32.Dispose()
}

Convert-Art $by['809x714'] 'doodle.png'    'ink' 560   # character doodle
Convert-Art $by['770x104'] 'introduction.png' 'ink' 640   # INTRODUCTION lettering (on red)
Convert-Art $by['902x133'] 'tagline.png'   'ink' 720   # Technical Artist X UXUI (on red)
Convert-Art $by['453x231'] 'contact-me.png' 'ink' 360  # <- contact me
Convert-Art $by['524x143'] 'scribble.png'  'red' 420   # red swirl on dark panel
Copy-Item $by['496x713'] (Join-Path $out 'wechat-qr.png') -Force
'wechat-qr.png copied'
