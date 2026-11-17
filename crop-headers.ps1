Add-Type -AssemblyName System.Drawing
$img1 = [System.Drawing.Bitmap]::FromFile("C:\Users\albin\.gemini\antigravity\brain\67b81dd0-baa1-46ea-a69a-840f7498113c\.user_uploaded\media_1794822551889_594b019c.jpg")
$img2 = [System.Drawing.Bitmap]::FromFile("C:\Users\albin\.gemini\antigravity\brain\67b81dd0-baa1-46ea-a69a-840f7498113c\.user_uploaded\media_1794822577797_56ab8a80.jpg")

# In Img1, navbar is around y=75 to 110
$r1 = New-Object System.Drawing.Rectangle(0, 0, $img1.Width, 115)
$c1 = $img1.Clone($r1, $img1.PixelFormat)
$c1.Save((Join-Path (Get-Location) "public\header-img1.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$c1.Dispose()

# In Img2, navbar is around y=95 to 140
$r2 = New-Object System.Drawing.Rectangle(0, 0, $img2.Width, 145)
$c2 = $img2.Clone($r2, $img2.PixelFormat)
$c2.Save((Join-Path (Get-Location) "public\header-img2.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$c2.Dispose()

$img1.Dispose()
$img2.Dispose()
Write-Output "Saved public/header-img1.png and public/header-img2.png"
