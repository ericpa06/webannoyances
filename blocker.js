
// The lines below are skipped by the resource parser. Purpose is clean
// jshinting.
(function() {
// >>>> start of private namespace
'use strict';

/// blocker.js
(function() {
    'use strict';
    
    function setupBlocker(minW, maxW, minH, maxH, tag, keyword) {
        const ruleId = 'blk_' + Math.random().toString(36).slice(2);
        keyword = keyword.toLowerCase();

        const check = el => {
            if (!el || !(el instanceof HTMLElement) || el[ruleId]) return;
            const r = el.getBoundingClientRect();
            if (r.width >= minW && r.width <= maxW && r.height >= minH && r.height <= maxH && r.top > 0) {
                const matches = el.querySelectorAll(tag);
                for (const m of matches) {
                    if (m.textContent.toLowerCase().includes(keyword) || 
                        m.getAttribute?.('aria-label')?.toLowerCase().includes(keyword)) {
                        el.style.setProperty('display', 'none', 'important');
                        el[ruleId] = true;
                        return;
                    }
                }
                // Also check the element itself
                if (el.textContent.toLowerCase().includes(keyword) ||
                    el.getAttribute?.('aria-label')?.toLowerCase().includes(keyword)) {
                    el.style.setProperty('display', 'none', 'important');
                    el[ruleId] = true;
                }
            }
        };

        const scan = () => document.querySelectorAll('div, section, article, span, li, a[aria-label]').forEach(check);

        scan();
        new MutationObserver(muts => {
            for (const mut of muts) {
                for (const node of mut.addedNodes) {
                    if (node.nodeType === 1) {
                        check(node);
                        node.querySelectorAll && node.querySelectorAll('*').forEach(check);
                    }
                }
            }
        }).observe(document.documentElement, { childList: true, subtree: true });

        setInterval(scan, 1500);
    }

    setupBlocker({{1}}, {{2}}, {{3}}, {{4}}, "{{5}}", "{{6}}");
})();

/// abort-current-script.js
/// alias acs.js
(function() {
    alert("abort-current-script.js!");   // optional, very loud proof
    const target = '{{1}}';
    if ( target === '' || target === '{{1}}' ) { return; }
    const reRegexEscape = /[.*+?^${}()|[\]\\]/g;
    const needle = '{{2}}';
    const reNeedle = (( ) => {
        if ( needle === '' || needle === '{{2}}' ) { return /^/; }
        if ( /^\/.+\/$/.test(needle) ) {
            return new RegExp(needle.slice(1,-1));
        }
        return new RegExp(needle.replace(reRegexEscape, '\\$&'));
    })();
    const context = '{{3}}';
    const reContext = (( ) => {
        if ( context === '' || context === '{{3}}' ) { return; }
        if ( /^\/.+\/$/.test(context) ) {
            return new RegExp(context.slice(1,-1));
        }
        return new RegExp(context.replace(reRegexEscape, '\\$&'));
    })();
    const thisScript = document.currentScript;
    const chain = target.split('.');
    let owner = window;
    let prop;
    for (;;) {
        prop = chain.shift();
        if ( chain.length === 0 ) { break; }
        owner = owner[prop];
        if ( owner instanceof Object === false ) { return; }
    }
    let value;
    let desc = Object.getOwnPropertyDescriptor(owner, prop);
    if (
        desc instanceof Object === false ||
        desc.get instanceof Function === false
    ) {
        value = owner[prop];
        desc = undefined;
    }
    const magic = String.fromCharCode(Date.now() % 26 + 97) +
                  Math.floor(Math.random() * 982451653 + 982451653).toString(36);
    const scriptTexts = new WeakMap();
    const getScriptText = elem => {
        let text = elem.textContent;
        if ( text.trim() !== '' ) { return text; }
        if ( scriptTexts.has(elem) ) { return scriptTexts.get(elem); }
        const [ , mime, content ] =
            /^data:([^,]*),(.+)$/.exec(elem.src.trim()) ||
            [ '', '', '' ];
        try {
            switch ( true ) {
            case mime.endsWith(';base64'):
                text = self.atob(content);
                break;
            default:
                text = self.decodeURIComponent(content);
                break;
            }
        } catch(ex) {
        }
        scriptTexts.set(elem, text);
        return text;
    };
    const validate = ( ) => {
        const e = document.currentScript;
        if ( e instanceof HTMLScriptElement === false ) { return; }
        if ( e === thisScript ) { return; }
        if ( reContext !== undefined && reContext.test(e.src) === false ) {
            return;
        }
        if ( reNeedle.test(getScriptText(e)) === false ) { return; }
        throw new ReferenceError(magic);
    };
    Object.defineProperty(owner, prop, {
        get: function() {
            validate();
            return desc instanceof Object
                ? desc.get.call(owner)
                : value;
        },
        set: function(a) {
            validate();
            if ( desc instanceof Object ) {
                desc.set.call(owner, a);
            } else {
                value = a;
            }
        }
    });
    const oe = window.onerror;
    window.onerror = function(msg) {
        if ( typeof msg === 'string' && msg.includes(magic) ) {
            return true;
        }
        if ( oe instanceof Function ) {
            return oe.apply(this, arguments);
        }
    }.bind();
})();



// These lines below are skipped by the resource parser.
// <<<< end of private namespace
})();
