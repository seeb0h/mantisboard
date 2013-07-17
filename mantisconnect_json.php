<?php
//ini_set("default_socket_timeout", 10);

// URL to your Mantis SOAP API (the mantisconnect.php file)
define('MANTISCONNECT_URL', 'http://www.whereyouhaveyourmantis.com/api/soap/mantisconnect.php');
 
// the username/password of the user account to use for calls
define('USERNAME', 'yourmantislogin');
define('PASSWORD', 'yourmantisloginpassword');

// ------------------------------------------------

parse_str($_SERVER['QUERY_STRING'], $args);

// get SOAP function name to call
if (!isset($args['name'])) {
    die("No name specified.");
}
$function_name = $args['name'];

// remove function name from arguments
unset($args['name']);

// prepend username/passwords to arguments
$args = array_merge(
    array(
        'username' => USERNAME,
        'password' => PASSWORD//,
//        'connection_timeout'=> 10
    ),
    $args
);

// connect and do the SOAP call
try {
    $client = new SoapClient(MANTISCONNECT_URL . '?wsdl');

    $result = $client->__soapCall($function_name, $args);
} catch (SoapFault $e) {
    $result = array(
        'error' => $e->faultstring
    );
}
print $e->faultstring;
print json_encode($result);

?>