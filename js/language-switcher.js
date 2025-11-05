(function(){
    function applyLang(lang){
     if(typeof pageTranslations === 'undefined') return;
        var trans = pageTranslations[lang];
        if(!trans) return;
        document.querySelectorAll('[data-i18n]').forEach(function(el){
            var key = el.getAttribute('data-i18n');
            if(trans[key]) el.innerHTML = trans[key];
        });
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('lang', lang);
    }

    document.addEventListener('DOMContentLoaded', function(){
        var selectors = document.querySelectorAll('.language-switcher');
        if(!selectors.length) return;
        var saved = localStorage.getItem('lang') || document.documentElement.lang || 'zh-Hant';
        if(!pageTranslations[saved]) saved = 'zh-Hant';
        selectors.forEach(function(sel){ sel.value = saved; });
        applyLang(saved);
        selectors.forEach(function(sel){
            sel.addEventListener('change', function(){
                var value = this.value;
                selectors.forEach(function(other){ other.value = value; });
                applyLang(value);
            });
        });
    });
})();
