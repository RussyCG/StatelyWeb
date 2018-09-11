<?php
    
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = strip_tags(trim($_POST["FullName"]));
		$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $phone = strip_tags(trim($_POST["Phone"]));
        $email = filter_var(trim($_POST["Email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["Message"]);
        if ( empty($name)  OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";/*--------- Contact submission erroe Message ---------------*/
            exit;
        }
        $recipient = "michel@statelygroup.co"; /*----- Add your email address here------*/
        $subject = "Your Subject $name";/*------ Add your email subject here------*/
        $email_content = "Name: $name";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Phone: $phone\n\n";
        $email_content .= "Message:\n$message\n";
        $email_headers = "From: $name <$email>";
        if (mail($recipient, $subject, $email_content, $email_headers)) {

            http_response_code(200);
            echo "Thank You! Your message has been sent."; /*---------  Success Message ---------------*/
        } else {

            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message."; /*--------- Contact Error Message ---------------*/
        }
    } else {
        http_response_code(403);
        echo "There was a problem with your submission, please try again."; /*--------- Contact submission erroe Message ---------------*/
    }
?>
