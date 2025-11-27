/* Theme handling */
(function () {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme");
  let currentTheme = "dark"; // default

  if (savedTheme === "light" || savedTheme === "dark") {
    currentTheme = savedTheme;
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  ) {
    currentTheme = "light";
  }

  // Apply initial theme
  applyTheme(currentTheme);

  function applyTheme(theme) {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
    }

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute(
        "content",
        theme === "dark" ? "#0f172a" : "#ffffff"
      );
    }
  }

  window.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") || "dark";
        const newTheme = current === "dark" ? "light" : "dark";
        applyTheme(newTheme);
      });
    }
  });
})();

/* i18n strings */
const translations = {
  en: {
    appTitle: "Pilot Toolkit",
    appSubtitle: "Quick rules of thumb and conversions for pilots",
    installButton: "Install",
    sectionConverters: "Converters",
    pressureTitle: "Pressure",
    altTitle: "Altitude",
    feetLabel: "Feet",
    metersLabel: "Meters",
    distTitle: "Distance",
    statuteMiles: "SM",
    fuelTitle: "Fuel and weight",
    fuelHint:
      "Uses approx avgas density 6 lb/gal (0.72 kg/L) for volume to weight.",
    tempTitle: "Temperature",
    speedTitle: "Speed",
    timeTitle: "Time",
    timeHm: "HH:MM",
    timeDec: "Decimal hours",
    sectionDescent: "Descent",
    descentTitle: "Descent planning",
    descentHint:
      "Rule of thumb: VS ≈ GS × 5 for about a 3° path, ToD ≈ altitude to lose / 300 (ft to NM).",
    cruiseAlt: "Cruise altitude (ft)",
    targetAlt: "Target altitude (ft)",
    gsLabel: "Groundspeed (kt)",
    altToLose: "Altitude to lose",
    todDistance: "ToD distance",
    reqVs: "Required VS",
    descentTime: "Descent time",
    sectionTurns: "Turns",
    turnTitle: "Standard rate turn",
    turnHint: "Bank for standard rate: bank ≈ TAS / 10 + 5 degrees.",
    tasLabel: "TAS (kt)",
    turnAngleLabel: "Turn angle (deg)",
    stdBankAngle: "Standard rate bank",
    turnTime: "Time to turn",
    sectionWinds: "Winds",
    windCompTitle: "Headwind and crosswind",
    runwayHeading: "Runway heading (deg)",
    windDir: "Wind direction (deg)",
    windSpeed: "Wind speed (kt)",
    headwindComp: "Headwind component",
    crosswindComp: "Crosswind component",
    gsEstimateTitle: "Groundspeed estimate",
    gsEstimateHint: "GS ≈ TAS + headwind (negative for tailwind).",
    headTail: "Headwind (+) / tailwind (−)",
    gsLabel2: "Estimated groundspeed",
    sectionDensity: "Density altitude",
    daTitle: "Density altitude",
    daHint:
      "Approximation: DA ≈ PA + 120 × (OAT − ISA temp). Pressure altitude from field elevation and altimeter.",
    fieldElev: "Field elevation (ft)",
    altSetting: "Altimeter (inHg)",
    oatLabel: "Outside air temp (°C)",
    paLabel: "Pressure altitude",
    isaTempLabel: "ISA temp at field",
    daLabel: "Density altitude",
    perfImpact: "Estimated takeoff distance increase",
    footerNote:
      "For training and quick planning only. Always cross check with certified performance data and avionics.",
  },
  ko: {
    appTitle: "파일럿 도구",
    appSubtitle: "파일럿을 위한 간단한 계산과 단위 변환",
    installButton: "설치",
    sectionConverters: "변환기",
    pressureTitle: "기압",
    altTitle: "고도",
    feetLabel: "피트",
    metersLabel: "미터",
    distTitle: "거리",
    statuteMiles: "마일(SM)",
    fuelTitle: "연료와 중량",
    fuelHint:
      "연료 밀도는 대략 6 lb/gal (0.72 kg/L)로 가정해서 부피와 중량을 변환해.",
    tempTitle: "기온",
    speedTitle: "속도",
    timeTitle: "시간",
    timeHm: "시:분",
    timeDec: "시간(소수)",
    sectionDescent: "하강",
    descentTitle: "하강 계획",
    descentHint:
      "기본 감: VS ≈ GS × 5 정도면 3° 프로파일, ToD ≈ 내려야 할 고도(ft) ÷ 300 (NM).",
    cruiseAlt: "순항 고도 (ft)",
    targetAlt: "목표 고도 (ft)",
    gsLabel: "대지속도 (kt)",
    altToLose: "내려야 할 고도",
    todDistance: "하강 시작 거리",
    reqVs: "필요 침하율",
    descentTime: "하강 시간",
    sectionTurns: "선회",
    turnTitle: "표준 선회율",
    turnHint: "표준 선회율 은행각: 대략 bank ≈ TAS ÷ 10 + 5 (deg).",
    tasLabel: "TAS (kt)",
    turnAngleLabel: "선회 각도 (deg)",
    stdBankAngle: "표준 선회율 은행각",
    turnTime: "선회 시간",
    sectionWinds: "바람",
    windCompTitle: "맞바람·측풍 성분",
    runwayHeading: "활주로 방위 (deg)",
    windDir: "풍향 (deg)",
    windSpeed: "풍속 (kt)",
    headwindComp: "맞바람 성분",
    crosswindComp: "측풍 성분",
    gsEstimateTitle: "대지속도 추정",
    gsEstimateHint: "GS ≈ TAS + 맞바람 (뒷바람은 음수).",
    headTail: "맞바람(+) / 뒷바람(−)",
    gsLabel2: "대지속도 추정값",
    sectionDensity: "밀도고도",
    daTitle: "밀도고도",
    daHint:
      "근사식: DA ≈ PA + 120 × (OAT − ISA 온도). PA는 공항 고도와 기압계 설정으로 계산해.",
    fieldElev: "공항 고도 (ft)",
    altSetting: "기압계 설정 (inHg)",
    oatLabel: "외기온도 (°C)",
    paLabel: "기압고도",
    isaTempLabel: "ISA 기준 온도",
    daLabel: "밀도고도",
    perfImpact: "이륙 거리 증가 추정",
    footerNote:
      "훈련·간단 계획용 참고 도구야. 항상 항공기 성능표와 장비로 교차 확인해.",
  },
};

/* Language handling */
function applyLanguage(lang) {
  const dict = translations[lang] || translations.en;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
  localStorage.setItem("lang", lang);
}

function setupLanguageToggle() {
  const savedLang = localStorage.getItem("lang") || "en";
  applyLanguage(savedLang);
  const toggle = document.getElementById("lang-toggle");
  const options = toggle.querySelectorAll(".lang-option");

  options.forEach((opt) => {
    if (opt.dataset.lang === savedLang) {
      opt.classList.add("active");
    } else {
      opt.classList.remove("active");
    }
  });

  toggle.addEventListener("click", (event) => {
    const target = event.target.closest(".lang-option");
    if (!target) return;
    const lang = target.dataset.lang;
    applyLanguage(lang);
    options.forEach((o) => o.classList.toggle("active", o === target));
  });
}

/* Utility helpers */
function toNumber(value) {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : null;
}

function setOutput(id, value, decimals) {
  const el = document.getElementById(id);
  if (!el) return;
  if (value === null || !Number.isFinite(value)) {
    el.textContent = "–";
  } else {
    const v = decimals != null ? value.toFixed(decimals) : value;
    el.textContent = v;
  }
}

/* Converters setup */
function setupConverters() {
  // Pressure: hPa ↔ inHg
  const hpa = document.getElementById("press-hpa");
  const inhg = document.getElementById("press-inhg");
  if (hpa && inhg) {
    hpa.addEventListener("input", () => {
      const v = toNumber(hpa.value);
      if (v == null) {
        inhg.value = "";
        return;
      }
      inhg.value = (v / 33.8638866667).toFixed(3);
    });
    inhg.addEventListener("input", () => {
      const v = toNumber(inhg.value);
      if (v == null) {
        hpa.value = "";
        return;
      }
      hpa.value = (v * 33.8638866667).toFixed(1);
    });
  }

  // Altitude: ft ↔ m
  const altFt = document.getElementById("alt-ft");
  const altM = document.getElementById("alt-m");
  if (altFt && altM) {
    altFt.addEventListener("input", () => {
      const v = toNumber(altFt.value);
      if (v == null) {
        altM.value = "";
        return;
      }
      altM.value = (v * 0.3048).toFixed(1);
    });
    altM.addEventListener("input", () => {
      const v = toNumber(altM.value);
      if (v == null) {
        altFt.value = "";
        return;
      }
      altFt.value = (v / 0.3048).toFixed(0);
    });
  }

  // Distance: NM ↔ km ↔ SM
  const distNm = document.getElementById("dist-nm");
  const distKm = document.getElementById("dist-km");
  const distSm = document.getElementById("dist-sm");

  function fromKm(baseKm) {
    if (baseKm == null) {
      distNm.value = "";
      distSm.value = "";
      return;
    }
    distNm.value = (baseKm / 1.852).toFixed(2);
    distSm.value = (baseKm / 1.609344).toFixed(2);
  }

  if (distNm && distKm && distSm) {
    distNm.addEventListener("input", () => {
      const v = toNumber(distNm.value);
      if (v == null) {
        distKm.value = "";
        distSm.value = "";
        return;
      }
      const km = v * 1.852;
      distKm.value = km.toFixed(2);
      distSm.value = (km / 1.609344).toFixed(2);
    });
    distKm.addEventListener("input", () => {
      const km = toNumber(distKm.value);
      if (km == null) {
        distNm.value = "";
        distSm.value = "";
        return;
      }
      fromKm(km);
    });
    distSm.addEventListener("input", () => {
      const sm = toNumber(distSm.value);
      if (sm == null) {
        distNm.value = "";
        distKm.value = "";
        return;
      }
      const km = sm * 1.609344;
      distKm.value = km.toFixed(2);
      distNm.value = (km / 1.852).toFixed(2);
    });
  }

  // Fuel and weight: gallons, liters, pounds, kilograms
  const gal = document.getElementById("fuel-gal");
  const l = document.getElementById("fuel-l");
  const lb = document.getElementById("fuel-lb");
  const kg = document.getElementById("fuel-kg");

  const DENSITY_KG_PER_L = 0.72;
  const GAL_TO_L = 3.78541;
  const LB_TO_KG = 0.45359237;

  function updateFuelFromLiters(liters) {
    if (liters == null) {
      gal.value = "";
      lb.value = "";
      kg.value = "";
      return;
    }
    const gallons = liters / GAL_TO_L;
    const massKg = liters * DENSITY_KG_PER_L;
    const massLb = massKg / LB_TO_KG;
    gal.value = gallons.toFixed(2);
    kg.value = massKg.toFixed(1);
    lb.value = massLb.toFixed(1);
  }

  if (gal && l && lb && kg) {
    gal.addEventListener("input", () => {
      const v = toNumber(gal.value);
      if (v == null) {
        l.value = "";
        lb.value = "";
        kg.value = "";
        return;
      }
      const liters = v * GAL_TO_L;
      l.value = liters.toFixed(1);
      updateFuelFromLiters(liters);
    });
    l.addEventListener("input", () => {
      const liters = toNumber(l.value);
      if (liters == null) {
        gal.value = "";
        lb.value = "";
        kg.value = "";
        return;
      }
      updateFuelFromLiters(liters);
    });
    kg.addEventListener("input", () => {
      const massKg = toNumber(kg.value);
      if (massKg == null) {
        gal.value = "";
        l.value = "";
        lb.value = "";
        return;
      }
      const liters = massKg / DENSITY_KG_PER_L;
      l.value = liters.toFixed(1);
      updateFuelFromLiters(liters);
    });
    lb.addEventListener("input", () => {
      const massLb = toNumber(lb.value);
      if (massLb == null) {
        gal.value = "";
        l.value = "";
        kg.value = "";
        return;
      }
      const massKg = massLb * LB_TO_KG;
      const liters = massKg / DENSITY_KG_PER_L;
      l.value = liters.toFixed(1);
      updateFuelFromLiters(liters);
    });
  }

  // Temperature
  const tempC = document.getElementById("temp-c");
  const tempF = document.getElementById("temp-f");
  if (tempC && tempF) {
    tempC.addEventListener("input", () => {
      const v = toNumber(tempC.value);
      if (v == null) {
        tempF.value = "";
        return;
      }
      tempF.value = ((v * 9) / 5 + 32).toFixed(1);
    });
    tempF.addEventListener("input", () => {
      const v = toNumber(tempF.value);
      if (v == null) {
        tempC.value = "";
        return;
      }
      tempC.value = (((v - 32) * 5) / 9).toFixed(1);
    });
  }

  // Speed: kt, km/h, mph
  const spKt = document.getElementById("speed-kt");
  const spKmh = document.getElementById("speed-kmh");
  const spMph = document.getElementById("speed-mph");

  if (spKt && spKmh && spMph) {
    spKt.addEventListener("input", () => {
      const v = toNumber(spKt.value);
      if (v == null) {
        spKmh.value = "";
        spMph.value = "";
        return;
      }
      const kmh = v * 1.852;
      spKmh.value = kmh.toFixed(1);
      spMph.value = (kmh / 1.609344).toFixed(1);
    });
    spKmh.addEventListener("input", () => {
      const kmh = toNumber(spKmh.value);
      if (kmh == null) {
        spKt.value = "";
        spMph.value = "";
        return;
      }
      spKt.value = (kmh / 1.852).toFixed(1);
      spMph.value = (kmh / 1.609344).toFixed(1);
    });
    spMph.addEventListener("input", () => {
      const mph = toNumber(spMph.value);
      if (mph == null) {
        spKt.value = "";
        spKmh.value = "";
        return;
      }
      const kmh = mph * 1.609344;
      spKmh.value = kmh.toFixed(1);
      spKt.value = (kmh / 1.852).toFixed(1);
    });
  }

  // Time: HH:MM ↔ decimal hours
  const timeHm = document.getElementById("time-hm");
  const timeDec = document.getElementById("time-dec");

  if (timeHm && timeDec) {
    timeHm.addEventListener("input", () => {
      const v = timeHm.value.trim();
      const parts = v.split(":");
      if (parts.length !== 2) {
        timeDec.value = "";
        return;
      }
      const h = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      if (!Number.isFinite(h) || !Number.isFinite(m)) {
        timeDec.value = "";
        return;
      }
      const dec = h + m / 60;
      timeDec.value = dec.toFixed(2);
    });

    timeDec.addEventListener("input", () => {
      const dec = toNumber(timeDec.value);
      if (dec == null) {
        timeHm.value = "";
        return;
      }
      const h = Math.floor(dec);
      const m = Math.round((dec - h) * 60);
      const mm = m.toString().padStart(2, "0");
      timeHm.value = `${h}:${mm}`;
    });
  }
}

/* Descent planner */
function setupDescent() {
  const cruise = document.getElementById("descent-cruise");
  const target = document.getElementById("descent-target");
  const gs = document.getElementById("descent-gs");

  function recalc() {
    const cruiseAlt = toNumber(cruise.value);
    const targetAlt = toNumber(target.value);
    const groundspeed = toNumber(gs.value);

    if (
      cruiseAlt == null ||
      targetAlt == null ||
      groundspeed == null ||
      groundspeed <= 0
    ) {
      setOutput("descent-altlose", null);
      setOutput("descent-tod", null);
      setOutput("descent-vs", null);
      setOutput("descent-time", null);
      return;
    }

    const altToLose = Math.max(0, cruiseAlt - targetAlt);
    const vs = groundspeed * 5; // fpm, rule of thumb
    const timeMin = altToLose > 0 && vs > 0 ? altToLose / vs : 0; // minutes
    const todNm = altToLose / 300; // ft to NM rule

    setOutput("descent-altlose", altToLose, 0);
    setOutput("descent-tod", todNm, 1);
    setOutput("descent-vs", vs, 0);
    setOutput("descent-time", timeMin, 1);
  }

  [cruise, target, gs].forEach(
    (el) => el && el.addEventListener("input", recalc),
  );
}

/* Standard rate turn */
function setupTurns() {
  const tas = document.getElementById("turn-tas");
  const angle = document.getElementById("turn-angle");

  function recalc() {
    const vTas = toNumber(tas.value);
    const vAng = toNumber(angle.value);
    if (vTas == null || vTas <= 0 || vAng == null || vAng <= 0) {
      setOutput("turn-bank", null);
      setOutput("turn-time", null);
      return;
    }

    const bank = vTas / 10 + 5; // degrees
    // Standard rate is 3 deg per second
    const timeSec = vAng / 3;

    setOutput("turn-bank", bank, 1);
    setOutput("turn-time", timeSec, 0);
  }

  [tas, angle].forEach((el) => el && el.addEventListener("input", recalc));
}

/* Winds and groundspeed */
function setupWinds() {
  const rwy = document.getElementById("wind-rwy");
  const wdir = document.getElementById("wind-dir");
  const wspd = document.getElementById("wind-speed");

  function recalcWind() {
    const r = toNumber(rwy.value);
    const d = toNumber(wdir.value);
    const s = toNumber(wspd.value);
    if (r == null || d == null || s == null || s < 0) {
      setOutput("wind-head", null, 0);
      setOutput("wind-cross", null, 0);
      const dirEl = document.getElementById("wind-cross-dir");
      if (dirEl) dirEl.textContent = "–";
      return;
    }
    const rel = (((d - r + 360) % 360) * Math.PI) / 180;
    const head = s * Math.cos(rel);
    const cross = s * Math.sin(rel);

    setOutput("wind-head", head, 0);
    setOutput("wind-cross", Math.abs(cross), 0);

    const dirEl = document.getElementById("wind-cross-dir");
    if (dirEl) {
      if (Math.abs(cross) < 0.5) {
        dirEl.textContent = "none";
      } else if (cross > 0) {
        dirEl.textContent = "from right";
      } else {
        dirEl.textContent = "from left";
      }
    }
  }

  [rwy, wdir, wspd].forEach(
    (el) => el && el.addEventListener("input", recalcWind),
  );

  // GS estimate
  const gsTas = document.getElementById("gs-tas");
  const gsHead = document.getElementById("gs-head");

  function recalcGs() {
    const t = toNumber(gsTas.value);
    const h = toNumber(gsHead.value);
    if (t == null || h == null) {
      setOutput("gs-result", null, 0);
      return;
    }
    const gs = t + h;
    setOutput("gs-result", gs, 0);
  }

  [gsTas, gsHead].forEach((el) => el && el.addEventListener("input", recalcGs));
}

/* Density altitude */
function setupDensityAltitude() {
  const elev = document.getElementById("da-elev");
  const altset = document.getElementById("da-altset");
  const oat = document.getElementById("da-oat");

  function recalc() {
    const fieldElev = toNumber(elev.value);
    const oatC = toNumber(oat.value);
    const altSetting = toNumber(altset.value);

    if (fieldElev == null || oatC == null) {
      setOutput("da-pa", null, 0);
      setOutput("da-isa", null, 1);
      setOutput("da-result", null, 0);
      const impactEl = document.getElementById("da-impact");
      if (impactEl) impactEl.textContent = "–";
      return;
    }

    let pa = fieldElev;
    if (altSetting != null && Number.isFinite(altSetting)) {
      pa = fieldElev + (29.92 - altSetting) * 1000;
    }

    const isaTemp = 15 - 2 * (pa / 1000); // simple lapse rate
    const da = pa + 120 * (oatC - isaTemp);
    const increaseFraction = Math.max(0, (da / 1000) * 0.1); // 10% per 1000 ft

    setOutput("da-pa", pa, 0);
    setOutput("da-isa", isaTemp, 1);
    setOutput("da-result", da, 0);

    const impactEl = document.getElementById("da-impact");
    if (impactEl) {
      const pct = (increaseFraction * 100).toFixed(0);
      impactEl.textContent = `≈ ${pct}%`;
    }
  }

  [elev, altset, oat].forEach(
    (el) => el && el.addEventListener("input", recalc),
  );
}

/* PWA install prompt */
let deferredPrompt = null;
function setupInstallPrompt() {
  const installBtn = document.getElementById("install-btn");

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installBtn.classList.remove("hidden");
  });

  installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      // user accepted
    }
    deferredPrompt = null;
    installBtn.classList.add("hidden");
  });
}

/* Service worker registration */
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch((err) => {
      console.error("SW registration failed", err);
    });
  }
}

/* Init */
window.addEventListener("DOMContentLoaded", () => {
  setupLanguageToggle();
  setupConverters();
  setupDescent();
  setupTurns();
  setupWinds();
  setupDensityAltitude();
  setupInstallPrompt();
  registerServiceWorker();
});
