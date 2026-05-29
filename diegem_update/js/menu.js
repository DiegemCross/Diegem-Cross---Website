/* ═══════════════════════════════════════
   DIEGEM CROSS — MOBIEL MENU
   Werkt op alle pagina's
═══════════════════════════════════════ */
(function() {
  var BASE = '';

  var ITEMS = [
    { type: 'link', label: 'Home', href: BASE + '/index.html' },
    { type: 'link', label: 'Programma', href: BASE + '/programma.html' },
    { type: 'group', label: 'Info', sub: [
      { label: 'Overzicht info', href: BASE + '/info.html' },
      { label: 'Deelnemers', href: BASE + '/deelnemers.html' },
      { label: 'Inschrijvingen', href: BASE + '/inschrijvingen.html' },
      { label: 'Parcours', href: BASE + '/parcours.html' },
      { label: 'Pers', href: BASE + '/pers.html' },
      { label: 'Reglement', href: BASE + '/reglement.html' },
      { label: 'Erelijst', href: BASE + '/erelijst.html' },
    ]},
    { type: 'link', label: 'Bereikbaarheid', href: BASE + '/bereikbaarheid.html' },
    { type: 'group', label: 'VIP & Hospitality', sub: [
      { label: 'VIP', href: BASE + '/vip.html' },
      { label: 'Word sponsor', href: BASE + '/sponsor.html' },
    ]},
    { type: 'link', label: 'Media', href: BASE + '/media.html' },
    { type: 'group', label: 'Contact', sub: [
      { label: 'Contact', href: BASE + '/contact.html' },
      { label: 'Bestuur', href: BASE + '/bestuur.html' },
    ]},
    { type: 'ticket', label: '🎫 Koop tickets', href: BASE + '/tickets.html' },
  ];

  // Maak menu container aan als die nog niet bestaat
  function ensureMenu() {
    var existing = document.getElementById('dcMenu');
    if (existing) return existing;
    var div = document.createElement('div');
    div.id = 'dcMenu';
    div.style.cssText = 'display:none;position:fixed;top:56px;left:0;right:0;bottom:0;background:#000;z-index:9999;overflow-y:auto;flex-direction:column;-webkit-overflow-scrolling:touch;';
    document.body.appendChild(div);
    return div;
  }

  function buildMenu(menu) {
    var html = '';
    ITEMS.forEach(function(item) {
      if (item.type === 'link') {
        html += '<a href="' + item.href + '" style="display:block;font-family:\'Bebas Neue\',sans-serif;font-size:30px;letter-spacing:0.06em;color:#fff;padding:14px 24px;border-bottom:1px solid rgba(255,255,255,0.07);text-decoration:none;">' + item.label + '</a>';
      } else if (item.type === 'group') {
        var id = 'dc-group-' + item.label.replace(/\W/g, '');
        html += '<div style="border-bottom:1px solid rgba(255,255,255,0.07);">';
        // Header — klikbaar om uit te klappen
        html += '<div onclick="dcToggle(\'' + id + '\')" style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;padding:14px 24px;font-family:\'Bebas Neue\',sans-serif;font-size:30px;letter-spacing:0.06em;color:#fff;">';
        html += '<span>' + item.label + '</span>';
        html += '<span id="' + id + '-arrow" style="font-size:18px;color:#00aa13;transition:transform 0.3s;display:inline-block;">▾</span>';
        html += '</div>';
        // Sub-items — verborgen
        html += '<div id="' + id + '" style="display:none;background:rgba(0,170,19,0.05);border-top:1px solid rgba(0,170,19,0.15);">';
        item.sub.forEach(function(sub) {
          html += '<a href="' + sub.href + '" style="display:block;font-family:\'Barlow Condensed\',sans-serif;font-size:17px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.6);padding:11px 24px 11px 40px;border-bottom:1px solid rgba(255,255,255,0.04);text-decoration:none;">' + sub.label + '</a>';
        });
        html += '</div>';
        html += '</div>';
      } else if (item.type === 'ticket') {
        html += '<a href="' + item.href + '" style="display:block;background:#00aa13;color:#000;font-family:\'Bebas Neue\',sans-serif;font-size:24px;letter-spacing:0.12em;text-transform:uppercase;padding:18px 24px;margin:20px 20px 40px;text-align:center;text-decoration:none;border-radius:3px;">' + item.label + '</a>';
      }
    });
    menu.innerHTML = html;
  }

  // Toggle een groep open/dicht
  window.dcToggle = function(id) {
    var el = document.getElementById(id);
    var arrow = document.getElementById(id + '-arrow');
    if (!el) return;
    var isOpen = el.style.display !== 'none';
    el.style.display = isOpen ? 'none' : 'block';
    if (arrow) arrow.style.transform = isOpen ? '' : 'rotate(180deg)';
  };

  // Toggle het menu open/dicht
  window.toggleMenu = function() {
    var menu = ensureMenu();
    var ham = document.getElementById('hamburger');
    var isOpen = menu.style.display === 'flex';

    if (isOpen) {
      menu.style.display = 'none';
      document.body.style.overflow = '';
      if (ham) {
        ham.classList.remove('open');
      }
    } else {
      if (!menu.innerHTML) buildMenu(menu);
      menu.style.display = 'flex';
      menu.style.flexDirection = 'column';
      document.body.style.overflow = 'hidden';
      if (ham) {
        ham.classList.add('open');
      }
    }
  };

  // Initialiseer bij laden
  document.addEventListener('DOMContentLoaded', function() {
    var menu = ensureMenu();
    buildMenu(menu);
  });

})();
