<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['content'])) {
        $content = $_POST['content'];
        $file = 'files/' . $_GET['file'];
        $restorePointFile = $file . '.original';

        // Save changes
        if (isset($_POST['save'])) {
            file_put_contents($file, $content);

            // Create a new restore point
            copy($file, $restorePointFile);
        }

        // Reverse changes
        if (isset($_POST['reverse'])) {
            $originalContent = file_get_contents($restorePointFile);
            file_put_contents($file, $originalContent);
            $content = $originalContent;
        }
    }
}

if (isset($_GET['file'])) {
    $selectedFile = 'files/' . $_GET['file'];

    if (file_exists($selectedFile)) {
        if (!file_exists($selectedFile . '.original')) {
            // Create a backup of the original content if it doesn't exist
            copy($selectedFile, $selectedFile . '.original');
        }

        $content = file_get_contents($selectedFile);
    } else {
        $content = "File not found.";
    }
} else {
    $content = "Select a file from the left side to edit.";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
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
                <textarea name='content'><?php echo htmlspecialchars($content); ?></textarea><br>
                <input type='submit' name='save' value='Save'>
                <input type='submit' name='reverse' value='Reverse Changes'>
            </form>
        </div>
    </div>
</body>
</html>