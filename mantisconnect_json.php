<?php
/**
 * Example usage (using jQuery):
 *  var url = "/path/mantisconnect_json.php?name=mc_project_get_issues&project_id=0&page_number=1&per_page=10";
 *  $.getJSON(url, function(data) {
 *      $.each(data, function() {
 *          console.log(data.id + ': ' data.summary);
 *      });
 *  });
 */

//ini_set("default_socket_timeout", 10);

// URL to your Mantis SOAP API (the mantisconnect.php file)
define('MANTISCONNECT_URL', 'http://www.mantisbt.org/bugs/api/soap/mantisconnect.php');
//define('MANTISCONNECT_URL', 'https://web.magellium.fr/mantis/api/soap/mantisconnect.php');

// the username/password of the user account to use for calls
// define('USERNAME', 'sbh');
// define('PASSWORD', 'sh1r0w123M!');
define('USERNAME', 'statusboard.mantis');
define('PASSWORD', 'statusboard.mantis2013!');

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