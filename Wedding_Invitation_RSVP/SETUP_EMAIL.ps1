$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Write-Host ''
Write-Host 'Wedding RSVP - Connect Email Notifications' -ForegroundColor Cyan
Write-Host '1. Create a form at https://formspree.io and verify the email that should receive the RSVPs.'
Write-Host '2. Copy the FORM ID from the Formspree Integration tab (example: xabcdxyz).'
Write-Host ''
$formId = (Read-Host 'Paste your Formspree FORM ID').Trim()
if ($formId -notmatch '^[a-zA-Z0-9]{6,20}$') {
  Write-Host 'Invalid form ID. Copy only the last part of your Formspree endpoint (no URL).' -ForegroundColor Red
  exit 1
}

$paths = @(
  'src\App.jsx',
  'OPEN_WEBSITE.html',
  'DEPLOY_THIS_FOLDER\index.html'
)
$pattern = "(?m)^const RSVP_FORM_ID = '[^']+';"
$replacement = "const RSVP_FORM_ID = '$formId';"
foreach ($relative in $paths) {
  $fullPath = Join-Path $root $relative
  $content = [System.IO.File]::ReadAllText($fullPath)
  if (-not [regex]::IsMatch($content, $pattern)) {
    throw "Could not find the form setting in $relative"
  }
  $updated = [regex]::Replace($content, $pattern, $replacement)
  [System.IO.File]::WriteAllText($fullPath, $updated, (New-Object System.Text.UTF8Encoding($false)))
  Write-Host "Updated $relative" -ForegroundColor Green
}
Write-Host ''
Write-Host 'All done. React App.jsx and both ready-to-host HTML files now use your form ID.' -ForegroundColor Green
Write-Host 'Test from a hosted website or npm run dev, and confirm you get an email.'
