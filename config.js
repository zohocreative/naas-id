/* ===================== NAAS ID PORTAL — CONFIG =====================
 * PASTE YOUR APPS SCRIPT WEB APP URL BELOW.
 *
 * How to get it:
 * 1. Open the NAAS Campus Google Sheet → Extensions → Apps Script.
 * 2. Deploy → New deployment → type: "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 3. Click Deploy, copy the URL it gives you (ends in /exec), paste below.
 * 4. In the Sheet, run NAAS ▸ "Set ID Portal Admin Password" once — that's
 *    the password the Admin Panel below will ask for.
 *
 * Every time naas_engine.gs changes, use "Manage deployments ▸ Edit ▸
 * New version" (not a brand-new deployment) so this URL keeps working.
 * ==================================================================== */
const API_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnQOz_sZVE7SLrVOd_gRo0_30ohF7RUxL2I-l6l3yp3-maQRRISmmd_l5zFQj602oV9BI17RMS390B9zskFEWZ6U4RhuBtyMPcvGPKIpob3Tytd91kptJsfi2eLwrsnVkpnFP-l0rhjXOLNB02ZAFHFfTrbc6lKnT3zVgSa1azaQtZushacinpiQCmWPnuaM3iZc7frbAz_ctJFZDaKq1YfFVTVK2fpR03FR5Nxrlhe2fGCDLZ2veIrgDuT0aio54dXMaE5fYDVjMtJjmzlFj-cDR04IMQ&lib=MO9kDQaEZ2sZSPgydZRppHdd27P5RNkdl";
