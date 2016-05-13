(function loaded() {
    'use strict';

    if (document.body === null || document.body === void 0) {
        window.onload = loaded.bind(window);
        return;
    }

    setupViewportWithMetaTag();
    setupStyles();
    setupToggleElement();
    setupConsoleElement();

    var LOG_LEVELS = {
        LOG: 1,
        DEBUG: 2,
        WARN: 4,
        ERROR: 8
    };

    var oldConsoleLog = window.console.log;
    var oldConsoleDebug = window.console.debug;
    var oldConsoleWarn = window.console.warn;
    var oldConsoleError = window.console.error;

    window.console.log = logToConsole.bind(window, LOG_LEVELS.LOG);
    window.console.debug = logToConsole.bind(window, LOG_LEVELS.DEBUG);
    window.console.warn = logToConsole.bind(window, LOG_LEVELS.WARN);
    window.console.error = logToConsole.bind(window, LOG_LEVELS.ERROR);

    function logToConsole (logLevel, messages) {
        var consoleElement = document.querySelector('.p-inline-console');
        var concatenatedString;
        var argumentsToLog;
        var htmlElement;

        if (arguments.length > 1) {
            argumentsToLog = Array.prototype.slice.call(arguments, 1);
            concatenatedString = Array.prototype.join.call(argumentsToLog, ' ');
        } else {
            concatenatedString = arguments[0];
        }

        htmlElement = document.createElement('div');
        htmlElement.className = "p-inline-message";
        htmlElement.innerHTML = "<p>" + concatenatedString + "</p>";

        consoleElement.appendChild(htmlElement);
        consoleElement.scrollTop = consoleElement.scrollHeight - consoleElement.clientHeight;

        switch(logLevel) {
            case LOG_LEVELS.LOG:
                oldConsoleLog.apply(window.console, argumentsToLog);
                break;
            case LOG_LEVELS.DEBUG:
                oldConsoleDebug.apply(window.console, argumentsToLog);
                break;
            case LOG_LEVELS.WARN:
                oldConsoleWarn.apply(window.console, argumentsToLog);
                break;
            case LOG_LEVELS.ERROR:
                oldConsoleError.apply(window.console, argumentsToLog);
                break;
            default:
                oldConsoleError.apply(window.console, ['UNKNOWN LOG LEVEL']);
                break;
        }
    }

    function toggleConsole() {
        var consoleElement = document.querySelector('.p-inline-console');

        if (Array.prototype.indexOf.call(consoleElement.classList, 'p-inline-visible') > -1) {
            consoleElement.className = consoleElement.className.replace('p-inline-visible', '');
        } else {
            consoleElement.className += " p-inline-visible";
        }
    }

    function setupViewportWithMetaTag() {
        var meta = document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, minimal-ui');
        document.head.appendChild(meta);
    }

    function setupStyles() {
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', 'http://rawgit.com/jamiemcl001/inline-console/master/css/inline-console.css');
        document.head.appendChild(link);
    }

    function setupToggleElement() {
        var toggleElement = document.createElement('div');
        toggleElement.className = "p-inline-console-toggle";
        toggleElement.style.zIndex = 9999;
        toggleElement.onclick = toggleConsole;

        document.body.appendChild(toggleElement);
    }

    function setupConsoleElement() {
        var consoleElement = document.createElement('div');
        consoleElement.className = "p-inline-console";

        document.body.appendChild(consoleElement);
    }

    window.toggleConsole = toggleConsole;
})();