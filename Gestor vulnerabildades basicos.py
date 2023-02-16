import requests

# Solicitar al usuario el dominio que se va a comprobar
dominio = input("Ingrese el dominio a verificar (sin https://): ")

# Agregar el prefijo https:// al dominio
url = f"https://{dominio}"

# Enviar una solicitud GET a la URL y obtener los encabezados de respuesta
response = requests.get(url)
headers = response.headers

# Verificar los encabezados de seguridad
if "strict-transport-security" in headers:
    print("El sitio web utiliza encabezados de seguridad HSTS.")
else:
    print("El sitio web no utiliza encabezados de seguridad HSTS.")

if "x-xss-protection" in headers:
    print("El sitio web utiliza encabezados de seguridad XSS.")
else:
    print("El sitio web no utiliza encabezados de seguridad XSS.")

if "x-content-type-options" in headers:
    print("El sitio web utiliza encabezados de seguridad X-Content-Type-Options.")
else:
    print("El sitio web no utiliza encabezados de seguridad X-Content-Type-Options.")

# Verificar si el sitio web tiene un certificado SSL válido
if response.ok:
    if response.url.startswith("https"):
        print("El sitio web tiene un certificado SSL válido.")
    else:
        print("El sitio web no tiene un certificado SSL válido.")
else:
    print("No se puede acceder al sitio web.")

# Verificar si el sitio web es vulnerable a Cross-site scripting
xss_payload = "<script>alert('XSS Vulnerability Detected')</script>"
xss_test_url = f"{url}/?q={xss_payload}"
xss_test_response = requests.get(xss_test_url)

if xss_payload in xss_test_response.text:
    print("El sitio web es vulnerable a Cross-site scripting.")
else:
    print("El sitio web no es vulnerable a Cross-site scripting.")

# Verificar si el sitio web es vulnerable a SQL Injection
sql_injection_payload = "' or 1=1--"
sql_injection_test_url = f"{url}/search?query={sql_injection_payload}"
sql_injection_test_response = requests.get(sql_injection_test_url)

if "error in your SQL syntax" in sql_injection_test_response.text:
    print("El sitio web es vulnerable a SQL Injection.")
else:
    print("El sitio web no es vulnerable a SQL Injection.")
