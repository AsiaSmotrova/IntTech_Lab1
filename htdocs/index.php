<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <title>Text File Editor</title>
</head>
<body>
    <div class="container">
        <div class="file-list">
            <h2>File List</h2>
            <?php
                $files = glob('files/*.txt');
                foreach ($files as $file) {
                    $filename = basename($file);
                    echo "<a href='editor.php?file=$filename'>$filename</a><br>";
                }
            ?>
        </div>
        <div class="editor">
            <h2>Text Editor</h2>
            <form method='post'>
                <textarea name='content'></textarea><br>
                <input type='submit' name='save' value='Save'>
                <input type='submit' name='reverse' value='Reverse Changes'>
            </form>
        </div>
    </div>
</body>
</html>