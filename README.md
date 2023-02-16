# Gestor-de-vulnerabilidades-basicos
Este código realiza una serie de verificaciones de seguridad en un sitio web, incluyendo:

Verificar si el sitio web utiliza encabezados de seguridad HSTS, XSS y X-Content-Type-Options.
Verificar si el sitio web tiene un certificado SSL válido.
Verificar si el sitio web es vulnerable a Cross-site scripting.
Verificar si el sitio web es vulnerable a SQL Injection.
El código utiliza la biblioteca requests para enviar solicitudes HTTP y analizar las respuestas. 
Se le solicita al usuario que ingrese el dominio que se va a comprobar 
y se agrega el prefijo https:// al dominio. 
Luego, se envía una solicitud GET a la URL y se analizan los encabezados de respuesta para verificar los encabezados de seguridad. 
Si el sitio web tiene un certificado SSL válido, se informa que el sitio tiene un certificado SSL válido. 
Si el sitio web es vulnerable a Cross-site scripting o SQL Injection, se informa que el sitio es vulnerable a dicha vulnerabilidad.
