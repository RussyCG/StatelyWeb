<html>
<head>
<title>Mail Sent</title>
</head>
<body>
<?php
require_once("PHPMailer/Exception.php");
require_once("PHPMailer/PHPMailer.php");
require_once("PHPMailer/SMTP.php");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    $adminName = 'Stacey';
    $adminAddress = "doubledlocksmiths@gmail.com";
    $clientMessage             = $_POST['message'];
    $clientMessage             = eregi_replace("[\]",'',$clientMessage);
    $clientAddress = $_POST['email'];
    $clientName = $_POST['name'];
    $clientCellPhoneNumber = $_POST['cellPhoneNumber'];    

    //Server settings                               // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'doubledlocksmiths@gmail.com'; //               // SMTP username
    $mail->Password = 'Tribord27';     //                     // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom($clientAddress, 'Website Contact Form');
    $mail->addAddress($adminAddress, $adminName);     // Add a recipient
    // $mail->addAddress('ellen@example.com');               // Name is optional
    $mail->addReplyTo($clientAddress, $clientName);
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'New Contact Request from Website';
    $mail->Body    = "Name: " . $clientName . "\r\nEmail: " . $clientAddress . "\r\nMobile Phone Number: " . $clientCellPhoneNumber . "\r\n\r\nMessage: " . $clientMessage;
    $mail->AltBody = 'To view the message, please use an HTML compatible email viewer!';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}
?>

</body>
</html>