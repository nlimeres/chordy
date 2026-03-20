<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chordy</title>
</head>
<body>
    <h1>¡Bienvenido a Chordy!</h1>

    <ul>
<?php
$archivos = scandir(".");

foreach ($archivos as $archivo) {
    if ($archivo != "." && $archivo != "..") {

        if ($archivo == "node_modules") continue;

        if (is_dir($archivo)) {
            echo "<li>📁 <strong>$archivo</strong></li>";
        } else {
            echo "<li>📄 <a href='" . htmlspecialchars($archivo) . "'>$archivo</a></li>";
        }
    }
}
?>
    </ul>

</body>
</html>