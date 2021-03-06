<?php

require_once("get_ip_address.php");


if (isset($_POST["calcdata"])) {
    $calculationsData = json_decode($_POST["calcdata"]);
    $calculationsDataFlat = array_merge(...$calculationsData);
    $calculationsComma = implode(", ", $calculationsDataFlat);
    
    $userIpAdr = get_ip_address();
    $userAgent = $_SERVER['HTTP_USER_AGENT'];
    
    // The data of the CSV.
    $data   = "\"$userIpAdr\",\"$userAgent\",\"$calculationsComma\"\n";
    
    $fileName = "formdata.csv";
    
    /*
     * Create or prepend to CSV file.
     */

    if (file_exists($fileName)) {
        // Add only data. The header is already added in the existing file.
        $fileContents = file_get_contents($fileName);
        file_put_contents($fileName, $data . $fileContents);
    } else {
        // Add CSV header and data.
        file_put_contents($fileName, $data);
    }
}