gFrame
=======

gFrame makes a new page and insert current page in the iframe.
This makes you can listen the music without stopping.

gFrame support almost mordern browsers.

![Browsers](http://floras.github.com/gFrame/resource/browser_icons.jpg "Browsers")

*   IE5.5, IE6, IE7, IE8, IE9, IE10
*   FIREFOX 4
*   GOOGLE CHROME 10
*   SAFARI 5
*   OPERA 11

USE
======

Change your page. (Skin or template)

### before

    <html>
        <head>
        .....
        <title> your page </title>
        .....


### after

    <html>
        <head>
        <script src="http://floras.github.com/gFrame/gFrame.js"> </script> <- insert this.
        .....
        <title> your page </title>
         <script> gFrame.title(document.title);</script> <- insert this.


