<?php
// CVALTIS - Single entry point: serve the combined setup & admin UI
header('Content-Type: text/html; charset=UTF-8');
$html = __DIR__ . '/index.html';
if (is_file($html)) {
  readfile($html);
} else {
  http_response_code(404);
  echo '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Not Found</title></head><body><h1>404 - index.html not found</h1></body></html>';
}
