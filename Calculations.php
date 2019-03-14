<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#29363b">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#29363b">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="index.css" />
    <title>iTech CalcApp Log</title>
</head>

<body class="logs">
    <header>
        Calculation logs
    </header>

    <main id="itech-calcapp-logs" class="log-container">
        <small>
            <table>
            <?php 

            $file = fopen("formdata.csv", "r");
            while (($csv = fgetcsv($file)) !== false) {
                    echo "<tr>";
                    foreach ($csv as $cell) {
                            echo "<td>" . htmlspecialchars($cell) . "</td>";
                    }
                    echo "</tr>\n";
            }
            fclose($file);
            ?>
            </table>
        </small>
    </main>
    <footer></footer>
</body>

</html>