const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "outreach-drafts");
const sentFrom = "Starlight Electronics LLC <starlight.rfq@outlook.com>";

const prospects = [
  {
    company: "Scaletron Industries",
    website: "https://www.scaletronscales.com/",
    subject: "Custom overlays and keypad parts for industrial scale equipment",
    landing:
      "https://lijingzhu1.github.io/starlight-electronics/membrane-switches.html?utm_source=email&utm_medium=outreach&utm_campaign=scaletron",
    rfq:
      "https://lijingzhu1.github.io/starlight-electronics/request-quote.html?utm_source=email&utm_medium=outreach&utm_campaign=scaletron",
    body: [
      "Hi,",
      "",
      "I noticed Scaletron works with industrial scales, feeders, and related control equipment. We support custom graphic overlays, membrane keypad overlays, display windows, labels, and adhesive-backed faceplate parts for OEM equipment.",
      "",
      "Here is a quick capability page:",
      "{{landing}}",
      "",
      "If replacement overlays, controller faceplates, or custom keypad parts are ever relevant, we can review a drawing, photo, or existing sample and advise on material/structure options.",
      "",
      "RFQ page:",
      "{{rfq}}",
      "",
      "Best regards,",
      "Starlight Electronics LLC",
      "North America project support",
      "Custom overlays | Membrane switches | Labels | Protective films",
      "starlight.rfq@outlook.com",
    ],
  },
  {
    company: "APEC",
    website: "https://www.apecusa.com/",
    subject: "Custom overlays and nameplates for automation equipment",
    landing:
      "https://lijingzhu1.github.io/starlight-electronics/graphic-overlays.html?utm_source=email&utm_medium=outreach&utm_campaign=apec_controls",
    rfq:
      "https://lijingzhu1.github.io/starlight-electronics/request-quote.html?utm_source=email&utm_medium=outreach&utm_campaign=apec_controls",
    body: [
      "Hi,",
      "",
      "I saw that APEC builds ingredient automation and process equipment for weighing, dosing, mixing, blending, and coating applications. We support custom control panel overlays, equipment nameplates, printed labels, adhesive-backed panels, and die-cut film parts.",
      "",
      "Capability page:",
      "{{landing}}",
      "",
      "If your team ever needs custom overlay/nameplate parts from drawings, photos, or existing samples, we can review the application and suggest material, finish, adhesive, and production options.",
      "",
      "RFQ page:",
      "{{rfq}}",
      "",
      "Best regards,",
      "Starlight Electronics LLC",
      "North America project support",
      "Custom overlays | Membrane switches | Labels | Protective films",
      "starlight.rfq@outlook.com",
    ],
  },
  {
    company: "CO2Meter",
    website: "https://www.co2meter.com/",
    subject: "Custom front labels and display window overlays for monitoring devices",
    landing:
      "https://lijingzhu1.github.io/starlight-electronics/graphic-overlays.html?utm_source=email&utm_medium=outreach&utm_campaign=co2meter",
    rfq:
      "https://lijingzhu1.github.io/starlight-electronics/request-quote.html?utm_source=email&utm_medium=outreach&utm_campaign=co2meter",
    body: [
      "Hi,",
      "",
      "I noticed CO2Meter offers gas detectors, monitoring devices, display units, and alarm products. We support custom front labels, display windows, graphic overlays, warning labels, and adhesive-backed interface parts for small and medium device programs.",
      "",
      "Capability page:",
      "{{landing}}",
      "",
      "If your team ever reviews alternate overlay, label, or display-window suppliers, we can quote from drawings, product photos, or existing sample details.",
      "",
      "RFQ page:",
      "{{rfq}}",
      "",
      "Best regards,",
      "Starlight Electronics LLC",
      "North America project support",
      "Custom overlays | Membrane switches | Labels | Protective films",
      "starlight.rfq@outlook.com",
    ],
  },
  {
    company: "Senix",
    website: "https://senix.com/",
    subject: "Durable labels and overlay parts for industrial sensors",
    landing:
      "https://lijingzhu1.github.io/starlight-electronics/graphic-overlays.html?utm_source=email&utm_medium=outreach&utm_campaign=senix_sensors",
    rfq:
      "https://lijingzhu1.github.io/starlight-electronics/request-quote.html?utm_source=email&utm_medium=outreach&utm_campaign=senix_sensors",
    body: [
      "Hi,",
      "",
      "I saw that Senix makes industrial ultrasonic sensors and related measurement products. We support durable product labels, adhesive nameplates, display/interface overlays, die-cut films, and protective adhesive parts for OEM devices.",
      "",
      "Capability page:",
      "{{landing}}",
      "",
      "If your team ever needs custom labels, nameplates, or overlay parts for sensor products or accessories, we can review drawings/photos and advise on materials, adhesive, and finish.",
      "",
      "RFQ page:",
      "{{rfq}}",
      "",
      "Best regards,",
      "Starlight Electronics LLC",
      "North America project support",
      "Custom overlays | Membrane switches | Labels | Protective films",
      "starlight.rfq@outlook.com",
    ],
  },
  {
    company: "Spinel Electronics",
    website: "https://www.spinelelectronics.com/",
    subject: "Die-cut protective films for camera modules and optical surfaces",
    landing:
      "https://lijingzhu1.github.io/starlight-electronics/camera-films.html?utm_source=email&utm_medium=outreach&utm_campaign=spinel_camera_films",
    rfq:
      "https://lijingzhu1.github.io/starlight-electronics/request-quote.html?utm_source=email&utm_medium=outreach&utm_campaign=spinel_camera_films",
    body: [
      "Hi,",
      "",
      "I noticed Spinel Electronics works with USB, serial, MIPI, and specialty camera modules. We support custom die-cut protective films, camera/optical surface films, small adhesive film parts, and related precision film converting.",
      "",
      "Capability page:",
      "{{landing}}",
      "",
      "If protective films or small die-cut film components are relevant for camera modules, accessories, or packaging, we can review drawings/photos and quote sample or production needs.",
      "",
      "RFQ page:",
      "{{rfq}}",
      "",
      "Best regards,",
      "Starlight Electronics LLC",
      "North America project support",
      "Custom overlays | Membrane switches | Labels | Protective films",
      "starlight.rfq@outlook.com",
    ],
  },
];

function sanitizeFilename(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function encodeHeader(value) {
  return value.replace(/\r?\n/g, " ").trim();
}

function renderBody(prospect) {
  return prospect.body
    .join("\n")
    .replaceAll("{{landing}}", prospect.landing)
    .replaceAll("{{rfq}}", prospect.rfq);
}

function renderEml(prospect) {
  const body = renderBody(prospect).replace(/\n/g, "\r\n");
  return [
    `From: ${sentFrom}`,
    "To: ",
    `Subject: ${encodeHeader(prospect.subject)}`,
    "X-Unsent: 1",
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    body,
  ].join("\r\n");
}

fs.mkdirSync(outDir, { recursive: true });

const indexRows = [
  "# Outreach Draft Index",
  "",
  "These drafts are not sent automatically. Open each `.eml`, add the recipient email address, review the content, then send manually from Outlook.",
  "",
  "| Company | Website | Draft | Subject |",
  "| --- | --- | --- | --- |",
];

for (const [idx, prospect] of prospects.entries()) {
  const filename = `${String(idx + 1).padStart(2, "0")}-${sanitizeFilename(prospect.company)}.eml`;
  const filePath = path.join(outDir, filename);
  fs.writeFileSync(filePath, renderEml(prospect));
  indexRows.push(`| ${prospect.company} | ${prospect.website} | ${filename} | ${prospect.subject} |`);
}

fs.writeFileSync(path.join(outDir, "README.md"), `${indexRows.join("\n")}\n`);
console.log(`Generated ${prospects.length} drafts in ${outDir}`);
