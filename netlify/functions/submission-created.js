// Netlify Function — draait automatisch bij elke Netlify-formulierinzending.
// Stuurt een Diegem Cross-gebrande bevestigingsmail naar de besteller via Resend.
// Vereist env-var: RESEND_API_KEY  (optioneel: MAIL_FROM)

const FROM = process.env.MAIL_FROM || "Diegem Cross <info@diegemcross.be>";
const REPLY_TO = "info@diegemcross.be";
const LOGO = "https://diegemcross.be/images/uploads/logo-diegem-cross.png";

function esc(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function row(label, value) {
  if (!value) return "";
  return (
    '<tr>' +
    '<td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#8a8a8a;width:45%;">' +
    esc(label) + '</td>' +
    '<td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;color:#ffffff;text-align:right;">' +
    esc(value) + '</td></tr>'
  );
}

function buildHtml(d) {
  const naam = (d.naam || "").trim();
  const groet = naam ? "Beste " + esc(naam) : "Beste";
  const summary =
    row("Bedrijf / organisatie", d.bedrijf) +
    row("Aantal VIP-tickets", d.aantal_tickets) +
    row("Exclusieve tafel (10 pers.)", d.exclusieve_tafel && d.exclusieve_tafel !== "Geen voorkeur" ? d.exclusieve_tafel : "") +
    row("Overnachting", d.overnachting) +
    row("Telefoon", d.telefoon);

  return (
'<!DOCTYPE html><html><body style="margin:0;padding:0;background:#000000;">' +
'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:24px 0;">' +
'<tr><td align="center">' +
'<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#0d0d0d;border-top:4px solid #00aa13;">' +

// header
'<tr><td align="center" style="padding:34px 32px 24px;background:#000000;">' +
'<img src="' + LOGO + '" alt="Diegem Cross" width="150" style="width:150px;height:auto;display:block;">' +
'</td></tr>' +

// green strip
'<tr><td style="height:3px;background:#00aa13;font-size:0;line-height:0;">&nbsp;</td></tr>' +

// body
'<tr><td style="padding:34px 36px 12px;">' +
'<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:0.22em;text-transform:uppercase;color:#00aa13;margin-bottom:10px;">Bevestiging van je bestelling</div>' +
'<div style="font-family:Georgia,\'Times New Roman\',serif;font-size:30px;line-height:1.15;color:#ffffff;margin-bottom:18px;">Bedankt voor je VIP-bestelling!</div>' +
'<p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#c8c8c8;margin:0 0 20px;">' +
groet + ',<br><br>We hebben je aanvraag voor de <strong style="color:#ffffff;">VIP-Gold Experience</strong> op Diegem Cross (30 december 2026) goed ontvangen. ' +
'We nemen zo snel mogelijk contact met je op om je reservatie te bevestigen.</p>' +
'</td></tr>' +

// summary box
(summary ?
'<tr><td style="padding:0 36px 8px;">' +
'<div style="background:rgba(0,170,19,0.06);border:1px solid rgba(0,170,19,0.28);padding:8px 20px 14px;">' +
'<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:0.16em;text-transform:uppercase;color:#00aa13;padding:12px 0 4px;">Jouw aanvraag</div>' +
'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;">' +
summary +
'</table></div></td></tr>' : "") +

// price note
'<tr><td style="padding:16px 36px 8px;">' +
'<p style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.7;color:#8a8a8a;margin:0;">Prijs: &euro;300 per persoon (excl. btw). Dit was een reservatieaanvraag &mdash; er is nog geen betaling gebeurd.</p>' +
'</td></tr>' +

// contact
'<tr><td style="padding:14px 36px 30px;">' +
'<p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#c8c8c8;margin:0;">Vragen? Antwoord gerust op deze mail of contacteer ons via ' +
'<a href="mailto:info@diegemcross.be" style="color:#00aa13;text-decoration:none;">info@diegemcross.be</a>.</p>' +
'</td></tr>' +

// footer
'<tr><td style="padding:22px 36px;background:#000000;border-top:1px solid rgba(255,255,255,0.08);">' +
'<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#666666;">&copy; 2026 Diegem Cross &middot; De unieke avondcross met kunstlicht in het dorpscentrum van Diegem.</div>' +
'<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;margin-top:8px;">' +
'<a href="https://www.diegemcross.be" style="color:#00aa13;text-decoration:none;">www.diegemcross.be</a></div>' +
'</td></tr>' +

'</table></td></tr></table></body></html>'
  );
}

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const payload = body.payload || {};
    // Enkel voor het VIP-bestelformulier
    if (payload.form_name && payload.form_name !== "vip-bestelling") {
      return { statusCode: 200, body: "andere form, overgeslagen" };
    }
    const d = payload.data || {};
    const to = (d.email || "").trim();
    if (!to) return { statusCode: 200, body: "geen e-mailadres" };
    if (!process.env.RESEND_API_KEY) {
      return { statusCode: 200, body: "RESEND_API_KEY ontbreekt — mail niet verstuurd" };
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.RESEND_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [to],
        reply_to: REPLY_TO,
        subject: "Bevestiging van je VIP-bestelling — Diegem Cross",
        html: buildHtml(d),
      }),
    });

    const txt = await res.text();
    return { statusCode: 200, body: res.ok ? "verstuurd" : "resend-fout: " + txt };
  } catch (e) {
    // Nooit de inzending laten falen door een mailfout
    return { statusCode: 200, body: "fout: " + e.message };
  }
};
