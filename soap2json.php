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


// ------------------------------------------------

parse_str($_SERVER['QUERY_STRING'], $args);

// check if service is given in parameter
if (!isset($args['service'])) 
    die("No service specified.");
// check if this service exists
if(!@include("./soap2json_" . $args['service'] . ".php")) 
    die("Service specified is unknown" . $service_name);
// remove parameter service from arguments
unset($args['service']);


// get SOAP function name to call
if (!isset($args['name'])) {
    die("No name specified.");
}
$function_name = $args['name'];

// remove function name from arguments
unset($args['name']);
$args = array_values($args);

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