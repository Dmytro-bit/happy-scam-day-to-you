function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value ?? "-";
}

function detectBrowser(ua) {
    if (/edg/i.test(ua)) return "Microsoft Edge";
    if (/opr|opera/i.test(ua)) return "Opera";
    if (/chrome|crios/i.test(ua)) return "Google Chrome";
    if (/firefox|fxios/i.test(ua)) return "Mozilla Firefox";
    if (/safari/i.test(ua) && !/chrome|crios|android/i.test(ua)) return "Safari";
    return "Unknown";
}

function detectOS(ua, platform) {
    if (/windows nt/i.test(ua)) return "Windows";
    if (/android/i.test(ua)) return "Android";
    if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
    if (/mac os x/i.test(ua)) return "macOS";
    if (/linux/i.test(ua) || /linux/i.test(platform || "")) return "Linux";
    return "Unknown";
}

async function loadIpAddress() {
    try {
        const res = await fetch("https://api.ipify.org?format=json", { cache: "no-store" });
        const data = await res.json();
        setText("ipAddress", data.ip || "Unavailable");
    } catch (_err) {
        setText("ipAddress", "Unavailable");
    }
}

(function init() {
    const nav = navigator;
    const ua = nav.userAgent || "";

    setText("browser", detectBrowser(ua));
    setText("os", detectOS(ua, nav.platform));
    setText("language", nav.language || "Unknown");
    setText("timezone", Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown");
    setText("screen", `${window.screen.width} x ${window.screen.height}`);
    setText("viewport", `${window.innerWidth} x ${window.innerHeight}`);
    setText("memory", nav.deviceMemory ? `${nav.deviceMemory} GB` : "Unavailable");
    setText("cores", nav.hardwareConcurrency ? String(nav.hardwareConcurrency) : "Unavailable");
    setText("touch", typeof nav.maxTouchPoints === "number" ? String(nav.maxTouchPoints) : "0");
    setText("online", nav.onLine ? "Online" : "Offline");
    setText("cookies", nav.cookieEnabled ? "Enabled" : "Disabled");
    setText("referrer", document.referrer || "Direct visit");

    loadIpAddress();

    window.addEventListener("resize", () => {
        setText("viewport", `${window.innerWidth} x ${window.innerHeight}`);
    });
})();
