window.onload = function() {

    'use strict';

    document.querySelectorAll('img[src="copy.png"]').forEach(function(el) {
        var cell = el.parentElement,
            scriptTag = getScriptTagInputEl(cell).value,
            matches = scriptTag.match(/\/(\d+\.\d+\.\d+)\/build\/(.+\.js)/),
            version = matches[1],
            module = matches[2];

        el.title = 'Copy <script> tag for ' + module + '@' + version + ' to clipboard.';

        cell.addEventListener('click', handleClick);
    });

    function getScriptTagInputEl(cell) {
        return cell.parentElement.firstElementChild.firstElementChild;
    }

    function handleClick(e) {
        var cell = e.currentTarget;

        getScriptTagInputEl(cell).select();
        document.execCommand('copy');

        feedback(cell);
    }

    function feedback(cell, text) {
        var fb = document.querySelector('div.feedback');
        var parentRect = cell.getBoundingClientRect();
        var fbRect = fb.getBoundingClientRect();
        var margin = (parentRect.height - fbRect.height) / 2;

        if (text) { fb.innerText = text; }

        fb.style.left = parentRect.left - margin - fbRect.width + 'px';
        fb.style.top = parentRect.top + margin + 'px';
        fb.style.opacity = .75;
        setTimeout(function() { fb.style.opacity = 0; }, 1700);
    }

};