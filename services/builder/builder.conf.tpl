{
    "name": "Chico-UI",
    "version": "0.6.5",
    "build": 12,
    "packages": [
        {
            "name": "chico",
            "input": "../../src/js/",
            "type": "js",
            "min": true
        },
        {
            "name": "chico",
            "input": "../../src/js/",
            "type": "js",
            "output": "../../download/",
            "min": false
        },
        {
            "name": "chico",
            "input": "../../src/css/",
            "type": "css",
            "output": "../../download/",
            "min": true
        },
        {
            "name": "chico",
            "input": "../../src/css/",
            "type": "css",
            "min": false
        }
    ],
    
    "output": {
        "uri": "../../build/"
    },
    
    "templates": {
        "js": "/*!\n * Chico UI <version> MIT Licence\n * @autor <chico@mercadolibre.com>\n * @link http://www.chico-ui.com.ar\n * @team Natan Santolo, Leandro Linares, Guillermo Paz, Natalia Devalle\n */\n;(function($){<code>;ch.init();})($);",
        "css": "/*!\n * Chico UI <version> MIT Licence\n * @autor <chico@mercadolibre.com>\n * @link http://www.chico-ui.com.ar\n * @team Natan Santolo, Leandro Linares, Guillermo Paz, Natalia Devalle\n */\n<code>"
  
    },
    
    "locations": {
        "A3": {
            "key": "-i ~/chicoui.pem",
            "host": "ubuntu@chico-ui.com.ar",
            "uri": "/chico/downloads/lastest/"
        }
    }
}
