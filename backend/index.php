<?php
//Loading of Backend Files
require_once __DIR__ . '/backend/essentials/utility.php';
require_once __DIR__ . '/backend/handlers/db.php';

// Class Initialization
$utility = new Utility();
$db_handler = new db_handler($utility);

//---DB Initialization
if (!$db_handler->checkDBConnection()) {
    $db_handler->dbConnect();
}

// Loading of Frontend Files
$utility->defineFile('frontend/html/core/head.html');
if ($utility->checkSiteInitialization()) {
    $utility->defineFile('frontend/html/parts/header.html');
    $utility->defineFile('frontend/html/main.html');
    $utility->defineFile('frontend/html/parts/footer.html');
} else {
    $utility->defineFile('frontend/html/pages/setup.html');
}
$utility->defineFile('frontend/html/core/foot.html');