// Threadline brand portfolio: mobile menu, launch countdown, contact form
(function () {
  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.sr-only').textContent = open ? 'Close menu' : 'Open menu';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Launch countdown to 11 Nov 2026, 00:00 Karachi time (UTC+5)
  var launch = new Date('2026-11-11T00:00:00+05:00').getTime();
  var out = document.getElementById('countdown-text');
  function tick() {
    if (!out) return;
    var diff = launch - Date.now();
    if (diff <= 0) {
      out.textContent = 'We are open. Message us on WhatsApp to order.';
      return;
    }
    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff % 86400000) / 3600000);
    out.textContent = d + ' days and ' + h + ' hours until launch on 11.11.2026.';
  }
  tick();
  setInterval(tick, 60000);

  // Contact form: opens the visitor's email app with the message filled in
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var msg = form.message.value.trim();
      status.classList.remove('error');
      if (!name || !email || !msg) {
        status.textContent = 'Add your name, email and a message so we can reply.';
        status.classList.add('error');
        return;
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        status.textContent = 'Check the email address; it should look like name@example.com.';
        status.classList.add('error');
        return;
      }
      var subject = 'Website enquiry: ' + form.topic.value;
      var body = msg + '\n\nFrom: ' + name + ' (' + email + ')';
      window.location.href = 'mailto:hello@threadline.pk?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      status.textContent = 'Your email app is opening with the message ready to send.';
    });
  }

  // Collection filters
  var chips = document.querySelectorAll('.chip');
  var products = document.querySelectorAll('.product');
  var notes = document.querySelectorAll('.cat-note');
  function show(cat) {
    chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.filter === cat)); });
    products.forEach(function (p) { p.hidden = !(cat === 'all' || p.dataset.cat === cat); });
    notes.forEach(function (n) { n.hidden = n.dataset.cat !== cat; });
  }
  chips.forEach(function (c) {
    c.addEventListener('click', function () { show(c.dataset.filter); });
  });
  // Links such as #collections-men open the shop already filtered
  function fromHash() {
    var m = location.hash.match(/^#collections-(\w+)$/);
    if (m) { show(m[1]); document.getElementById('collections').scrollIntoView(); }
  }
  window.addEventListener('hashchange', fromHash);
  fromHash();

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
