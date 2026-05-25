const workshopCarousel = document.querySelector(".workshop-carousel");

if (workshopCarousel) {
  let direction = 1;
  let paused = false;

  const pause = () => {
    paused = true;
    window.setTimeout(() => {
      paused = false;
    }, 3200);
  };

  workshopCarousel.addEventListener("pointerdown", pause);
  workshopCarousel.addEventListener("wheel", pause, { passive: true });

  window.setInterval(() => {
    if (paused) return;

    const maxScroll = workshopCarousel.scrollWidth - workshopCarousel.clientWidth;
    if (maxScroll <= 0) return;

    if (workshopCarousel.scrollLeft >= maxScroll - 2) direction = -1;
    if (workshopCarousel.scrollLeft <= 2) direction = 1;

    workshopCarousel.scrollBy({ left: direction * 1.4, behavior: "auto" });
  }, 28);
}

const params = new URLSearchParams(window.location.search);
const trackedKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
const currentTracking = trackedKeys
  .map((key) => [key, params.get(key)])
  .filter(([, value]) => value);

if (currentTracking.length) {
  window.localStorage.setItem("starlightLeadSource", currentTracking.map(([key, value]) => `${key}=${value}`).join("; "));
}

document.querySelectorAll('a[href="request-quote.html"]').forEach((link) => {
  if (!currentTracking.length) return;
  link.href = `request-quote.html?${currentTracking.map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join("&")}`;
});

const rfqForm = document.querySelector("#rfq-form");

if (rfqForm) {
  const leadSourceInput = rfqForm.querySelector("#lead-source");
  const fileInput = rfqForm.querySelector("#rfq-files");
  const fileList = rfqForm.querySelector("#file-list");
  const warning = rfqForm.querySelector("#rfq-warning");
  const storedSource = window.localStorage.getItem("starlightLeadSource");
  const directSource = currentTracking.length ? currentTracking.map(([key, value]) => `${key}=${value}`).join("; ") : "";
  const leadSource = directSource || storedSource || "direct / unknown";
  const recipient = rfqForm.dataset.recipient || "";

  leadSourceInput.value = leadSource;

  if (!recipient || recipient === "sales@example.com") {
    warning.hidden = false;
  }

  const selectedFileNames = () => {
    if (!fileInput || !fileInput.files.length) return [];
    return Array.from(fileInput.files).map((file) => `${file.name} (${Math.round(file.size / 1024)} KB)`);
  };

  if (fileInput && fileList) {
    fileInput.addEventListener("change", () => {
      const names = selectedFileNames();
      fileList.textContent = names.length ? names.join(", ") : "No files selected yet.";
    });
  }

  rfqForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!rfqForm.reportValidity()) return;

    const formData = new FormData(rfqForm);
    const files = selectedFileNames();
    const subject = `RFQ - ${formData.get("product_type") || "Custom part"} - ${formData.get("company") || formData.get("name")}`;
    const body = [
      "Hello Starlight Electronics,",
      "",
      "I would like to request a quote for a custom part.",
      "",
      `Name: ${formData.get("name") || ""}`,
      `Company: ${formData.get("company") || ""}`,
      `Email: ${formData.get("email") || ""}`,
      `Country: ${formData.get("country") || ""}`,
      `Product type: ${formData.get("product_type") || ""}`,
      `Estimated quantity: ${formData.get("quantity") || ""}`,
      `Application industry: ${formData.get("industry") || ""}`,
      `Target lead time: ${formData.get("lead_time") || ""}`,
      `Lead source: ${formData.get("lead_source") || ""}`,
      `Files selected on website: ${files.length ? files.join(", ") : "None"}`,
      "",
      "Project details:",
      formData.get("message") || "",
      "",
      files.length
        ? "Please remember to attach the selected files before sending this email."
        : "I will attach drawings/photos/files to this email if available.",
    ].join("\n");

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
