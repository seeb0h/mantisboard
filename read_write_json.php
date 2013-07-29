<?php

parse_str($_SERVER['QUERY_STRING'], $args);


// get action to do
if (!isset($_REQUEST['action'])) {
    die("No action specified.");
}

// get file to save
if (!isset($_REQUEST['file'])) {
    die("No file specified.");
}


switch ($_REQUEST['action']) {
    case 'write':
        file_put_contents($_REQUEST['file'] .'.json', json_encode($_POST['json']));
        break;
    case 'read':
        header('Content-Type: application/json;charset=utf-8');
        $s = file_get_contents($_REQUEST['file'] .'.json');
        echo (json_encode($s));
        break;
}

?>