(function(){
  var THEMES = {
    sunrise: {
      primary: '#ff7a59', primaryDark: '#e8684c',
      accent: '#ffd166', bg: '#f9f9f9', text: '#333333',
      surface: '#ffffff', surfaceText: '#333333', footer: '#333333', footerText: '#ffffff'
    },
    ocean: {
      primary: '#0ea5a4', primaryDark: '#0b857f',
      accent: '#62d6cb', bg: '#f5fbfb', text: '#102a43',
      surface: '#ffffff', surfaceText: '#102a43', footer: '#102a43', footerText: '#ffffff'
    },
    indigo: {
      primary: '#6366f1', primaryDark: '#4f46e5',
      accent: '#22d3ee', bg: '#0f172a', text: '#e5e7eb',
      surface: '#111827', surfaceText: '#e5e7eb', footer: '#0b1220', footerText: '#e5e7eb'
    },
    forest: {
      primary: '#2e7d32', primaryDark: '#1b5e20',
      accent: '#a5d6a7', bg: '#f6fbf7', text: '#1b1f1e',
      surface: '#ffffff', surfaceText: '#1b1f1e', footer: '#1b1f1e', footerText: '#ffffff'
    },
    amber: {
      primary: '#f59e0b', primaryDark: '#d97706',
      accent: '#fcd34d', bg: '#fffaf2', text: '#1f2937',
      surface: '#ffffff', surfaceText: '#1f2937', footer: '#1f2937', footerText: '#ffffff'
    },
    rose: {
      primary: '#d946ef', primaryDark: '#a21caf',
      accent: '#f472b6', bg: '#fcf7ff', text: '#281a2d',
      surface: '#ffffff', surfaceText: '#281a2d', footer: '#281a2d', footerText: '#ffffff'
    },
    slate: {
      primary: '#334155', primaryDark: '#1f2937',
      accent: '#22c55e', bg: '#f6f7f9', text: '#0f172a',
      surface: '#ffffff', surfaceText: '#0f172a', footer: '#0f172a', footerText: '#ffffff'
    }
  };

  function setVars(theme){
    var root = document.documentElement;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--primary-dark', theme.primaryDark);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--bg', theme.bg);
    root.style.setProperty('--text', theme.text);
    root.style.setProperty('--surface', theme.surface);
    root.style.setProperty('--surface-text', theme.surfaceText);
    root.style.setProperty('--footer', theme.footer);
    root.style.setProperty('--footer-text', theme.footerText);
  }

  function injectOverrides(){
    if(document.getElementById('theme-overrides')) return;
    var css = ''+
      'body{background-color:var(--bg) !important;color:var(--text) !important;}'+
      'header{background-color:var(--primary) !important;color:#fff !important;}'+
      /* Header controls: text-only style */
      '.nav-buttons a{background:transparent !important;border:0 !important;color:#fff !important;padding:0 !important;border-radius:0 !important;text-decoration:none !important;}'+
      '.nav-buttons a:hover{background:transparent !important;text-decoration:underline !important;}'+
      '.menu-toggle{background:transparent !important;border:0 !important;}'+
      '.language-switcher{background:transparent !important;border:0 !important;color:#fff !important;}'+
      '.card{background:var(--surface) !important;color:var(--surface-text) !important;}'+
      'footer{background-color:var(--footer) !important;color:var(--footer-text) !important;}'+
      'a{color:var(--primary) !important;}'+
      '.carousel-track{background:var(--surface) !important;}'+
      '.button{background-color:transparent !important;border-color:transparent !important;color:#fff !important;}';
    var style = document.createElement('style');
    style.id = 'theme-overrides';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  function applyTheme(name){
    var key = (name||'').toLowerCase();
    if(!THEMES[key]) key = 'slate';
    setVars(THEMES[key]);
    injectOverrides();
    try{ localStorage.setItem('theme', key); }catch(e){}
    document.documentElement.setAttribute('data-theme', key);
  }

  function init(){
    var params = new URLSearchParams(location.search);
    var qTheme = params.get('theme');
    var saved = null;
    try{ saved = localStorage.getItem('theme'); }catch(e){}
    var name = qTheme || saved || 'slate';
    applyTheme(name);
    // expose for console/manual
    window.setTheme = applyTheme;
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
