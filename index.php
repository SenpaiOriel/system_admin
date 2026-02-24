<?php
/**
 * CVALTIS – Vue CDN base entry.
 * Templates in frontend/html/template/, JS in frontend/js/template/.
 */
?><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CVALTIS - System Setup &amp; Admin</title>
  <link rel="stylesheet" href="frontend/style/system-setup.css">
  <link rel="stylesheet" href="frontend/style/system-admin.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="frontend/js/theme.js"></script>
</head>
<body>
  <div id="app"></div>
  <script>window.CVALTIS_BASE = '';</script>
  <script src="https://cdn.jsdelivr.net/npm/qrcode@1/build/qrcode.min.js"></script>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="frontend/js/dependencies/system-setup-auth.js"></script>
  <script src="frontend/js/template/system-setup.js"></script>
  <script src="frontend/js/main.js"></script>
</body>
</html>
