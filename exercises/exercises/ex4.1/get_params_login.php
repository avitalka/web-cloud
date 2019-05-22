<!DOCTYPE html>
<html>

<head>
<title>forms</title>
    
</head>

<body>
   <section>
       <h1>Welcome!</h1>
       <?php
       $fn = $_GET["reg_fn"];
       $ln = $_GET["reg_ln"];

       if($fn == "")
           echo "<h2>Opps you did enter your first name<h2>";
       else if($ln == "")
            echo "<h2>Opps you did not enter your last name<h2>";
        else{
            echo "<h2>Hello " . $fn . " Good To See You!<h2>";
        }
        ?>
   </section>
</body>

</html>