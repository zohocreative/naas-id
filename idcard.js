/* Renders the printable ID card — Course and Class students get visibly
 * different themes (green vs blue) and badges, using the same layout, so
 * anyone can tell the two apart at a glance. The QR encodes a link to
 * scan.html?id=<Student ID> on THIS site — scanning asks for the
 * student's own phone (last 4 digits) before showing anything. */
const NAAS_ORG_NAME = 'NAAS CAMPUS';

function scanUrlFor(studentId){
  var base = window.location.origin + window.location.pathname.replace(/[^/]+$/, '');
  return base + 'scan.html?id=' + encodeURIComponent(studentId);
}

function renderIdCard(containerEl, profile){
  var isClass = profile.type === 'class';
  var theme = isClass ? 'theme-class' : 'theme-course';
  var typeLabel = isClass ? 'CLASS STUDENT' : 'COURSE STUDENT';
  var groupLine = isClass
    ? (profile.group + (profile.instance ? ' · ' + profile.instance : ''))
    : (profile.group + (profile.instance ? ' · Batch ' + profile.instance : ''));
  var photo = profile.photoUrl
    ? '<img class="idcard-photo" src="' + escapeHtml(profile.photoUrl) + '" onerror="this.style.display=\'none\'">'
    : '<div class="idcard-photo" style="display:flex;align-items:center;justify-content:center;font-weight:700;color:#0E9257;font-size:22px;">' + escapeHtml(initials(profile.name)) + '</div>';

  containerEl.innerHTML =
    '<div class="idcard ' + theme + '" id="idcard-printable">' +
      '<div class="idcard-top">' +
        '<div class="idcard-type-badge">' + typeLabel + '</div>' +
        '<div class="idcard-org">' + NAAS_ORG_NAME + '</div>' +
        '<div class="idcard-title">Student ID Card</div>' +
      '</div>' +
      '<div class="idcard-body">' +
        photo +
        '<div class="idcard-name">' + escapeHtml(profile.name) + '</div>' +
        '<div class="idcard-id">' + escapeHtml(profile.id) + '</div>' +
        '<div class="idcard-row">' +
          '<div><div class="lbl">' + (isClass ? 'Class' : 'Course') + '</div><div class="val">' + escapeHtml(groupLine) + '</div></div>' +
        '</div>' +
        '<div class="idcard-row">' +
          '<div><div class="lbl">Parent/Guardian</div><div class="val">' + escapeHtml(profile.parent || '—') + '</div></div>' +
          '<div><div class="lbl">Phone</div><div class="val">' + escapeHtml(profile.phone || '—') + '</div></div>' +
        '</div>' +
      '</div>' +
      '<div class="idcard-footer">' +
        '<div class="idcard-qr" id="idcard-qr"></div>' +
        '<div class="idcard-footer-note">Scan to verify identity &amp; check fee status. Requires the student\'s phone number to view.</div>' +
      '</div>' +
    '</div>';

  var qrHost = containerEl.querySelector('#idcard-qr');
  if (window.QRCode && qrHost){
    new QRCode(qrHost, { text: scanUrlFor(profile.id), width: 64, height: 64, correctLevel: QRCode.CorrectLevel.M });
  }
}

function escapeHtml(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
    return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
  });
}

/* Downloads the currently rendered #idcard-printable as a PNG. Uses
 * html2canvas (loaded via CDN) — works fully client-side, no server
 * round-trip needed. */
async function downloadIdCardPng(filenameBase){
  var el = document.getElementById('idcard-printable');
  if (!el || !window.html2canvas) return;
  var canvas = await html2canvas(el, { scale: 3, backgroundColor: '#ffffff' });
  var link = document.createElement('a');
  link.download = (filenameBase || 'id-card') + '.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}
