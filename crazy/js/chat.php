<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $message = htmlspecialchars($_POST['message']);
    file_put_contents('messages/messages.txt', $message . PHP_EOL, FILE_APPEND);
}
?>
