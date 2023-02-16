import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://${domain}`)
      .then(response => {
        let results = [];
        const headers = response.headers;

        // Verificar los encabezados de seguridad
        if ("strict-transport-security" in headers) {
          results.push("El sitio web utiliza encabezados de seguridad HSTS.");
        } else {
          results.push("El sitio web no utiliza encabezados de seguridad HSTS.");
        }

        if ("x-xss-protection" in headers) {
          results.push("El sitio web utiliza encabezados de seguridad XSS.");
        } else {
          results.push("El sitio web no utiliza encabezados de seguridad XSS.");
        }

        if ("x-content-type-options" in headers) {
          results.push("El sitio web utiliza encabezados de seguridad X-Content-Type-Options.");
        } else {
          results.push("El sitio web no utiliza encabezados de seguridad X-Content-Type-Options.");
        }

        // Verificar si el sitio web tiene un certificado SSL válido
        if (response.ok) {
          if (response.url.startsWith("https")) {
            results.push("El sitio web tiene un certificado SSL válido.");
          } else {
            results.push("El sitio web no tiene un certificado SSL válido.");
          }
        } else {
          results.push("No se puede acceder al sitio web.");
        }

        // Verificar si el sitio web es vulnerable a Cross-site scripting
        const xss_payload = "<script>alert('XSS Vulnerability Detected')</script>";
        const xss_test_url = `${response.url}/?q=${xss_payload}`;
        axios.get(xss_test_url)
          .then(response => {
            if (xss_payload in response.data) {
              results.push("El sitio web es vulnerable a Cross-site scripting.");
            } else {
              results.push("El sitio web no es vulnerable a Cross-site scripting.");
            }
          })
          .catch(error => {
            results.push("No se pudo realizar la prueba de Cross-site scripting.");
          });

        // Verificar si el sitio web es vulnerable a SQL Injection
        const sql_injection_payload = "' or 1=1--";
        const sql_injection_test_url = `${response.url}/search?query=${sql_injection_payload}`;
        axios.get(sql_injection_test_url)
          .then(response => {
            if ("error in your SQL syntax" in response.data) {
              results.push("El sitio web es vulnerable a SQL Injection.");
            } else {
              results.push("El sitio web no es vulnerable a SQL Injection.");
            }
          })
          .catch(error => {
            results.push("No se pudo realizar la prueba de SQL Injection.");
          });

        setResults(results);
      })
      .catch(error => {
        setResults(["No se pudo acceder al sitio web."]);
      });
  }

  const handleChange = (
