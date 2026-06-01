/* ================================================
   PAYNEST employees.js — Employees Module
   Overview · Directory · Profile · Org Tree
================================================ */

/* ══════════════════════════════
   DATA STORE  (sessionStorage)
══════════════════════════════ */
const EMP_KEY = "paynest_employees";

const SEED_EMPLOYEES = [
  {
    id:"EMP001",empCode:"EMP001",
    firstName:"Arindam",lastName:"Maity",
    gender:"Male",dob:"1990-04-15",marital:"Married",blood:"B+",
    email:"arindam.maity@abcltd.com",mobile:"9876543210",
    emergency:"Sunita Maity (Wife) - 9876500001",
    currentAddr:"12, Park Street, Kolkata, WB - 700016",
    permAddr:"12, Park Street, Kolkata, WB - 700016",
    dept:"Payroll",desig:"Manager",doj:"2025-04-01",
    empType:"Full-Time",status:"Active",manager:"",location:"Kolkata",ctc:"1200000",
    pan:"ABCDE1234F",aadhaar:"123456789012",uan:"100123456789",esi:"",
    bank:"123456789012",ifsc:"SBIN0001234"
  },
  {
    id:"EMP002",empCode:"EMP002",
    firstName:"Rohit",lastName:"Sharma",
    gender:"Male",dob:"1992-07-22",marital:"Single",blood:"O+",
    email:"rohit.sharma@abcltd.com",mobile:"9123456780",
    emergency:"Ramesh Sharma (Father) - 9123400000",
    currentAddr:"45, MG Road, Bengaluru, KA - 560001",
    permAddr:"45, MG Road, Bengaluru, KA - 560001",
    dept:"HR",desig:"Executive",doj:"2025-04-15",
    empType:"Full-Time",status:"Active",manager:"Arindam Maity",location:"Bengaluru",ctc:"600000",
    pan:"BCDEF2345G",aadhaar:"234567890123",uan:"100234567890",esi:"",
    bank:"234567890123",ifsc:"HDFC0001234"
  },
  {
    id:"EMP003",empCode:"EMP003",
    firstName:"Sneha",lastName:"Das",
    gender:"Female",dob:"1994-11-05",marital:"Single",blood:"A+",
    email:"sneha.das@abcltd.com",mobile:"9234567891",
    emergency:"Biplab Das (Father) - 9234500000",
    currentAddr:"7, Lake View, Kolkata, WB - 700029",
    permAddr:"7, Lake View, Kolkata, WB - 700029",
    dept:"Finance",desig:"Analyst",doj:"2025-04-20",
    empType:"Full-Time",status:"Active",manager:"Arindam Maity",location:"Kolkata",ctc:"700000",
    pan:"CDEFG3456H",aadhaar:"345678901234",uan:"100345678901",esi:"",
    bank:"345678901234",ifsc:"ICIC0001234"
  },
  {
    id:"EMP004",empCode:"EMP004",
    firstName:"Vikram",lastName:"Patel",
    gender:"Male",dob:"1988-03-12",marital:"Married",blood:"AB+",
    email:"vikram.patel@abcltd.com",mobile:"9345678902",
    emergency:"Kavita Patel (Wife) - 9345500000",
    currentAddr:"22, Satellite Road, Ahmedabad, GJ - 380015",
    permAddr:"22, Satellite Road, Ahmedabad, GJ - 380015",
    dept:"IT",desig:"Developer",doj:"2025-05-01",
    empType:"Full-Time",status:"On Probation",manager:"Arindam Maity",location:"Ahmedabad",ctc:"900000",
    pan:"DEFGH4567I",aadhaar:"456789012345",uan:"100456789012",esi:"",
    bank:"456789012345",ifsc:"AXIS0001234"
  },
  {
    id:"EMP005",empCode:"EMP005",
    firstName:"Neha",lastName:"Kumari",
    gender:"Female",dob:"1996-08-30",marital:"Single",blood:"B-",
    email:"neha.kumari@abcltd.com",mobile:"9456789013",
    emergency:"Suresh Kumari (Father) - 9456500000",
    currentAddr:"33, Gomti Nagar, Lucknow, UP - 226010",
    permAddr:"33, Gomti Nagar, Lucknow, UP - 226010",
    dept:"Operations",desig:"Coordinator",doj:"2025-05-05",
    empType:"Full-Time",status:"On Probation",manager:"Rohit Sharma",location:"Lucknow",ctc:"480000",
    pan:"EFGHI5678J",aadhaar:"567890123456",uan:"100567890123",esi:"",
    bank:"567890123456",ifsc:"PNB00012345"
  },
  {
    id:"EMP006",empCode:"EMP006",
    firstName:"Pritam",lastName:"Shaw",
    gender:"Male",dob:"1991-06-10",marital:"Married",blood:"O-",
    email:"pritam.shaw@abcltd.com",mobile:"9567890124",
    emergency:"Ananya Shaw (Wife) - 9567500000",
    currentAddr:"5, New Alipore, Kolkata, WB - 700053",
    permAddr:"5, New Alipore, Kolkata, WB - 700053",
    dept:"Sales",desig:"Sales Executive",doj:"2025-05-10",
    empType:"Full-Time",status:"Active",manager:"Arindam Maity",location:"Kolkata",ctc:"550000",
    pan:"FGHIJ6789K",aadhaar:"678901234567",uan:"100678901234",esi:"",
    bank:"678901234567",ifsc:"SBIN0005678"
  },
  {
    id:"EMP007",empCode:"EMP007",
    firstName:"Ananya",lastName:"Gupta",
    gender:"Female",dob:"1995-06-15",marital:"Single",blood:"O+",
    email:"ananya.gupta@abcltd.com",mobile:"9876543210",
    emergency:"Rakesh Gupta (Father) - 9876500000",
    currentAddr:"123, Green Park, Delhi, India",
    permAddr:"123, Green Park, Delhi, India",
    dept:"Finance",desig:"Analyst",doj:"2025-06-01",
    empType:"Full-Time",status:"Active",manager:"Sneha Das",location:"Delhi",ctc:"650000",
    pan:"GHIJK7890L",aadhaar:"789012345678",uan:"100789012345",esi:"",
    bank:"789012345678",ifsc:"HDFC0005678"
  }
];

function getEmployees() {
  const raw = sessionStorage.getItem(EMP_KEY);
  if (!raw) {
    sessionStorage.setItem(EMP_KEY, JSON.stringify(SEED_EMPLOYEES));
    return SEED_EMPLOYEES;
  }
  return JSON.parse(raw);
}
function saveEmployees(list) {
  sessionStorage.setItem(EMP_KEY, JSON.stringify(list));
}
function nextEmpId(list) {
  const nums = list.map(e => parseInt(e.id.replace("EMP",""), 10)).filter(n => !isNaN(n));
  const max  = nums.length ? Math.max(...nums) : 0;
  return "EMP" + String(max + 1).padStart(3, "0");
}

/* ══════════════════════════════
   STATE
══════════════════════════════ */
let currentTab       = "overview";
let currentProfileId = null;
let drawerMode       = "add";
let drawerStep       = 1;
let deleteTargetId   = null;
let dirPage          = 1;
const DIR_PAGE_SIZE  = 10;
let filteredEmployees = [];

let ovHeadcountChart = null;
let ovGenderChart    = null;
let profSearchResults = [];

/* ══════════════════════════════
   INIT
══════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {

  /* Restore dark mode */
  if (sessionStorage.getItem("paynest_darkmode") === "true") {
    document.body.classList.add("dark-mode");
  }

  initSidebarEmp();
  initTopbarEmp();
  initDarkModeEmp();
  initProfSearch();

  /* Module tab nav */
  document.querySelectorAll(".emp-tab").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.classList.contains("emp-tab-disabled")) return;
      switchTab(btn.dataset.tab);
    });
  });

  /* Profile sub-tabs */
  document.querySelectorAll(".prof-tab").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".prof-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".prof-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      const panel = document.getElementById("ptab-" + btn.dataset.ptab);
      if (panel) panel.classList.add("active");
    });
  });

  /* Drawer step nav */
  document.querySelectorAll(".dstep").forEach(function (btn) {
    btn.addEventListener("click", function () {
      goToDrawerStep(parseInt(btn.dataset.step));
    });
  });

  /* Initial render */
  switchTab("overview");
});

/* ══════════════════════════════
   SIDEBAR
══════════════════════════════ */
function initSidebarEmp() {
  const sidebar = document.getElementById("sidebar");
  const pinBtn  = document.getElementById("sbPinBtn");
  const tooltip = document.getElementById("sbTooltip");
  if (!sidebar) return;

  const pinned = JSON.parse(sessionStorage.getItem("sb_pinned") || "false");
  if (pinned) sidebar.classList.add("pinned");

  if (pinBtn) {
    pinBtn.querySelector("span").textContent = pinned ? "Pinned ✓" : "Keep Open";
    pinBtn.addEventListener("click", function () {
      const p = sidebar.classList.toggle("pinned");
      sessionStorage.setItem("sb_pinned", p);
      pinBtn.querySelector("span").textContent = p ? "Pinned ✓" : "Keep Open";
    });
  }

  if (tooltip) {
    sidebar.querySelectorAll(".sb-item").forEach(function (item) {
      item.addEventListener("mouseenter", function () {
        if (sidebar.classList.contains("pinned")) return;
        const lbl = item.querySelector(".sb-label");
        if (!lbl) return;
        tooltip.textContent = lbl.textContent.trim();
        const rect = item.getBoundingClientRect();
        tooltip.style.top = (rect.top + rect.height / 2 - 12) + "px";
        tooltip.style.opacity = "1";
      });
      item.addEventListener("mouseleave", function () {
        tooltip.style.opacity = "0";
      });
    });
  }
}

/* ══════════════════════════════
   TOPBAR
══════════════════════════════ */
function initTopbarEmp() {
  const user    = sessionStorage.getItem("paynest_user") || "Arindam Maity";
  const initial = user.charAt(0).toUpperCase();
  ["tbName","udName"].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = user; });
  ["tbAvatar","udAvatar"].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = initial; });

  /* Page select dropdown */
  const pageBtn  = document.getElementById("pageSelectBtn");
  const pageDrop = document.getElementById("pageDropdown");
  if (pageBtn && pageDrop) {
    pageBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      pageDrop.classList.toggle("open");
    });
    pageDrop.addEventListener("click", function (e) { e.stopPropagation(); });
  }

  /* User dropdown */
  const userBtn  = document.getElementById("userDropdownBtn");
  const userDrop = document.getElementById("userDropdown");
  if (userBtn && userDrop) {
    userBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      userDrop.classList.toggle("open");
    });
    userDrop.addEventListener("click", function (e) { e.stopPropagation(); });
  }

  document.addEventListener("click", function () {
    if (pageDrop) pageDrop.classList.remove("open");
    if (userDrop) userDrop.classList.remove("open");
  });

  /* Photo upload */
  const photoInput = document.getElementById("photoUpload");
  if (photoInput) {
    photoInput.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        const src = e.target.result;
        ["tbAvatar","udAvatar"].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.innerHTML = '<img src="' + src + '" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />';
        });
      };
      reader.readAsDataURL(file);
    });
  }
}

/* ══════════════════════════════
   DARK MODE
══════════════════════════════ */
function initDarkModeEmp() {
  const btn = document.getElementById("darkModeBtn");
  if (!btn) return;
  btn.addEventListener("click", function () {
    const isDark = document.body.classList.toggle("dark-mode");
    sessionStorage.setItem("paynest_darkmode", isDark);
    /* Re-render charts to update colours */
    if (ovHeadcountChart) { ovHeadcountChart.destroy(); ovHeadcountChart = null; }
    if (ovGenderChart)    { ovGenderChart.destroy();    ovGenderChart    = null; }
    if (currentTab === "overview") renderOverview();
  });
}

/* ══════════════════════════════
   TAB SWITCHING
══════════════════════════════ */
function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll(".emp-tab").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

  const activeBtn = document.querySelector('.emp-tab[data-tab="' + tab + '"]');
  if (activeBtn) activeBtn.classList.add("active");

  const activeContent = document.getElementById("tab-" + tab);
  if (activeContent) activeContent.classList.add("active");

  if (tab === "overview")  renderOverview();
  if (tab === "directory") renderDirectory();
  if (tab === "profile")   renderProfile();
  if (tab === "org")       renderOrgTree();
}

/* ══════════════════════════════
   OVERVIEW
══════════════════════════════ */
function renderOverview() {
  const emps  = getEmployees();
  const today = new Date();

  const total     = emps.length;
  const active    = emps.filter(e => e.status === "Active").length;
  const thisMonth = emps.filter(e => {
    const d = new Date(e.doj);
    return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  }).length;
  const probation = emps.filter(e => e.status === "On Probation").length;
  const depts     = [...new Set(emps.map(e => e.dept).filter(Boolean))].length;

  const confirmDue = emps.filter(e => {
    if (e.status !== "On Probation") return false;
    const conf = new Date(e.doj);
    conf.setDate(conf.getDate() + 90);
    const diff = Math.round((conf - today) / (1000*60*60*24));
    return diff >= 0 && diff <= 30;
  }).length;

  setText("statTotal",     total);
  setText("statActive",    active);
  setText("statJoiners",   thisMonth);
  setText("statConfirm",   confirmDue);
  setText("statProbation", probation);
  setText("statResigned",  0);
  setText("statDepts",     depts);

  renderHeadcountChart(emps);
  renderGenderChart(emps);
  renderBirthdays(emps);
  renderAnniversaries(emps);
  renderConfirmationDue(emps, today);
  renderRecentJoiners(emps, today);
}

function renderHeadcountChart(emps) {
  const ctx = document.getElementById("ovHeadcountChart");
  if (!ctx) return;
  if (ovHeadcountChart) { ovHeadcountChart.destroy(); ovHeadcountChart = null; }

  const months  = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];
  const fyStart = new Date("2025-04-01");
  const counts  = months.map((_, i) => {
    const cutoff = new Date(fyStart);
    cutoff.setMonth(cutoff.getMonth() + i + 1);
    return emps.filter(e => e.doj && new Date(e.doj) < cutoff).length;
  });

  const isDark = document.body.classList.contains("dark-mode");
  ovHeadcountChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: months,
      datasets: [{
        label: "Headcount",
        data: counts,
        borderColor: "#7C3AED",
        backgroundColor: "rgba(124,58,237,.12)",
        borderWidth: 2.5,
        pointBackgroundColor: "#7C3AED",
        pointRadius: 4, pointHoverRadius: 6,
        tension: 0.4, fill: true
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 10 }, color: isDark ? "#9CA3AF" : "#6B7280" } },
        y: {
          beginAtZero: false,
          grid: { color: isDark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)" },
          ticks: { font: { size: 10 }, color: isDark ? "#9CA3AF" : "#6B7280" }
        }
      }
    }
  });
}

function renderGenderChart(emps) {
  const male   = emps.filter(e => e.gender === "Male").length;
  const female = emps.filter(e => e.gender === "Female").length;
  const other  = emps.filter(e => e.gender !== "Male" && e.gender !== "Female").length;
  const total  = emps.length;

  setText("ovGenderTotal", total);

  const legendEl = document.getElementById("ovGenderLegend");
  if (legendEl) {
    legendEl.innerHTML = [
      { label:"Male",   val:male,   color:"#7C3AED" },
      { label:"Female", val:female, color:"#EC4899" },
      { label:"Others", val:other,  color:"#F59E0B" }
    ].map(g => `
      <div class="ov-gender-legend-item">
        <div class="ov-gender-dot" style="background:${g.color}"></div>
        <span style="font-weight:600">${g.label}</span>
        <span style="margin-left:auto;color:var(--muted);">${total ? Math.round(g.val/total*100) : 0}% (${g.val})</span>
      </div>
    `).join("");
  }

  const ctx = document.getElementById("ovGenderChart");
  if (!ctx) return;
  if (ovGenderChart) { ovGenderChart.destroy(); ovGenderChart = null; }

  ovGenderChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Male","Female","Other"],
      datasets: [{
        data: [male, female, other],
        backgroundColor: ["#7C3AED","#EC4899","#F59E0B"],
        borderWidth: 2, borderColor: "transparent", hoverOffset: 6
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: "68%",
      plugins: { legend: { display: false } }
    }
  });
}

function renderBirthdays(emps) {
  const el = document.getElementById("birthdayList");
  if (!el) return;
  const today = new Date();
  const upcoming = emps
    .filter(e => e.dob)
    .map(e => {
      const dob = new Date(e.dob);
      let next  = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
      if (next < today) next.setFullYear(today.getFullYear() + 1);
      const diff = Math.round((next - today) / (1000*60*60*24));
      return { ...e, diff, bdLabel: diff === 0 ? "Today 🎂" : formatShortDate(next) };
    })
    .sort((a,b) => a.diff - b.diff)
    .slice(0, 4);

  el.innerHTML = upcoming.map(e => `
    <div class="ov-widget-item">
      <div class="ov-widget-avatar">${e.firstName[0]}${e.lastName[0]}</div>
      <div>
        <div class="ov-widget-name">${e.firstName} ${e.lastName}</div>
        <div class="ov-widget-meta">${e.dept}</div>
      </div>
      <span class="ov-widget-date">${e.bdLabel}</span>
    </div>
  `).join("") || '<div style="font-size:12px;color:var(--muted);padding:8px 0">No upcoming birthdays</div>';
}

function renderAnniversaries(emps) {
  const el = document.getElementById("anniversaryList");
  if (!el) return;
  const today = new Date();
  const upcoming = emps
    .filter(e => e.doj)
    .map(e => {
      const doj  = new Date(e.doj);
      let next   = new Date(today.getFullYear(), doj.getMonth(), doj.getDate());
      if (next < today) next.setFullYear(today.getFullYear() + 1);
      const diff  = Math.round((next - today) / (1000*60*60*24));
      const years = today.getFullYear() - doj.getFullYear() + (next.getFullYear() !== today.getFullYear() ? 1 : 0);
      return { ...e, diff, annLabel: formatShortDate(next), years };
    })
    .sort((a,b) => a.diff - b.diff)
    .slice(0, 3);

  el.innerHTML = upcoming.map(e => `
    <div class="ov-widget-item">
      <div class="ov-widget-avatar">${e.firstName[0]}${e.lastName[0]}</div>
      <div>
        <div class="ov-widget-name">${e.firstName} ${e.lastName}</div>
        <div class="ov-widget-meta">${e.years} Year${e.years!==1?"s":""} on ${e.annLabel}</div>
      </div>
    </div>
  `).join("") || '<div style="font-size:12px;color:var(--muted);padding:8px 0">No upcoming anniversaries</div>';
}

function renderConfirmationDue(emps, today) {
  const el = document.getElementById("confirmList");
  if (!el) return;
  const list = emps
    .filter(e => e.status === "On Probation" && e.doj)
    .map(e => {
      const conf = new Date(e.doj);
      conf.setDate(conf.getDate() + 90);
      const diff = Math.round((conf - today) / (1000*60*60*24));
      return { ...e, conf, diff };
    })
    .sort((a,b) => a.diff - b.diff)
    .slice(0, 4);

  if (!list.length) {
    el.innerHTML = '<div style="font-size:12px;color:var(--muted);padding:8px 0">No confirmations due</div>';
    return;
  }
  el.innerHTML = list.map(e => {
    const cls = e.diff <= 7 ? "urgent" : e.diff <= 15 ? "soon" : "ok";
    const lbl = e.diff < 0 ? Math.abs(e.diff) + " Days Ago" : e.diff + " Days";
    return `<div class="ov-confirm-row">
      <span class="ov-confirm-name">${e.firstName} ${e.lastName}</span>
      <span class="ov-confirm-date">${formatShortDate(e.conf)}</span>
      <span class="ov-days-badge ${cls}">${lbl}</span>
    </div>`;
  }).join("");
}

function renderRecentJoiners(emps, today) {
  const el = document.getElementById("recentJoinersList");
  if (!el) return;
  const cutoff = new Date(today); cutoff.setDate(cutoff.getDate() - 30);
  const list = emps
    .filter(e => e.doj && new Date(e.doj) >= cutoff)
    .sort((a,b) => new Date(b.doj) - new Date(a.doj))
    .slice(0, 4);

  el.innerHTML = list.map(e => `
    <div class="ov-widget-item">
      <div class="ov-widget-avatar">${e.firstName[0]}${e.lastName[0]}</div>
      <div>
        <div class="ov-widget-name">${e.firstName} ${e.lastName}</div>
        <div class="ov-widget-meta">${e.desig}, ${e.dept}</div>
      </div>
      <span class="ov-widget-date">${formatShortDate(new Date(e.doj))}</span>
    </div>
  `).join("") || '<div style="font-size:12px;color:var(--muted);padding:8px 0">No recent joiners</div>';
}

/* ══════════════════════════════
   DIRECTORY
══════════════════════════════ */
function renderDirectory() {
  populateFilterDropdowns();
  filteredEmployees = getEmployees();
  dirPage = 1;
  renderDirTable();
}

function populateFilterDropdowns() {
  const emps   = getEmployees();
  const depts  = [...new Set(emps.map(e => e.dept).filter(Boolean))].sort();
  const desigs = [...new Set(emps.map(e => e.desig).filter(Boolean))].sort();

  const dEl  = document.getElementById("filterDept");
  const dgEl = document.getElementById("filterDesig");
  if (dEl)  dEl.innerHTML  = '<option value="">Department: All</option>'  + depts.map(d  => '<option value="' + d  + '">' + d  + '</option>').join("");
  if (dgEl) dgEl.innerHTML = '<option value="">Designation: All</option>' + desigs.map(d => '<option value="' + d  + '">' + d  + '</option>').join("");
}

function filterDirectory() {
  const q      = (document.getElementById("dirSearch")?.value || "").toLowerCase();
  const dept   = document.getElementById("filterDept")?.value   || "";
  const desig  = document.getElementById("filterDesig")?.value  || "";
  const status = document.getElementById("filterStatus")?.value || "";
  const emps   = getEmployees();

  filteredEmployees = emps.filter(e => {
    const name   = (e.firstName + " " + e.lastName).toLowerCase();
    const code   = (e.empCode || "").toLowerCase();
    const email  = (e.email   || "").toLowerCase();
    const matchQ = !q      || name.includes(q) || code.includes(q) || email.includes(q);
    const matchD = !dept   || e.dept   === dept;
    const matchG = !desig  || e.desig  === desig;
    const matchS = !status || e.status === status;
    return matchQ && matchD && matchG && matchS;
  });
  dirPage = 1;
  renderDirTable();
}

function clearFilters() {
  ["dirSearch","filterDept","filterDesig","filterStatus"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  filterDirectory();
}

function renderDirTable() {
  const tbody = document.getElementById("dirTableBody");
  if (!tbody) return;

  const total  = filteredEmployees.length;
  const pages  = Math.max(1, Math.ceil(total / DIR_PAGE_SIZE));
  dirPage      = Math.min(dirPage, pages);
  const start  = (dirPage - 1) * DIR_PAGE_SIZE;
  const slice  = filteredEmployees.slice(start, start + DIR_PAGE_SIZE);

  if (!slice.length) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:32px;color:var(--muted);">No employees found</td></tr>';
  } else {
    tbody.innerHTML = slice.map(function(e, i) {
      const cls = e.status === "Active" ? "status-active" :
                  e.status === "On Probation" ? "status-probation" : "status-inactive";
      return '<tr>' +
        '<td>' + (start + i + 1) + '</td>' +
        '<td><div class="dir-emp-avatar">' + (e.photo ? '<img src="'+e.photo+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />' : e.firstName[0]+e.lastName[0]) + '</div></td>' +
        '<td style="font-weight:600;color:var(--primary)">' + (e.empCode || e.id) + '</td>' +
        '<td><span class="dir-emp-name">' + e.firstName + ' ' + e.lastName + '</span></td>' +
        '<td>' + (e.dept  || "—") + '</td>' +
        '<td>' + (e.desig || "—") + '</td>' +
        '<td>' + (e.doj   ? formatDisplayDate(e.doj) : "—") + '</td>' +
        '<td><span class="status-badge ' + cls + '">' + e.status + '</span></td>' +
        '<td><div class="dir-actions">' +
          '<button class="dir-action-btn" title="View Profile" onclick="viewProfile(\'' + e.id + '\')">' +
            '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>' +
          '</button>' +
          '<button class="dir-action-btn" title="Edit" onclick="viewAndEdit(\'' + e.id + '\')">' +
            '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>' +
          '</button>' +
          '<button class="dir-action-btn danger" title="Delete" onclick="openDeleteModal(\'' + e.id + '\')">' +
            '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>' +
          '</button>' +
        '</div></td>' +
      '</tr>';
    }).join("");
  }

  const fromN = total ? start + 1 : 0;
  const toN   = Math.min(start + DIR_PAGE_SIZE, total);
  setText("dirShowing", "Showing " + fromN + " to " + toN + " of " + total + " entries");
  renderPagination(pages);
}

function renderPagination(pages) {
  const el = document.getElementById("dirPageBtns");
  if (!el) return;
  let html = '<button class="dir-page-btn" onclick="changeDirPage(' + (dirPage-1) + ')" ' + (dirPage===1?"disabled":"") + '>‹</button>';
  for (let p = 1; p <= pages; p++) {
    html += '<button class="dir-page-btn ' + (p===dirPage?"active":"") + '" onclick="changeDirPage(' + p + ')">' + p + '</button>';
  }
  html += '<button class="dir-page-btn" onclick="changeDirPage(' + (dirPage+1) + ')" ' + (dirPage===pages?"disabled":"") + '>›</button>';
  el.innerHTML = html;
}

function changeDirPage(p) {
  const pages = Math.ceil(filteredEmployees.length / DIR_PAGE_SIZE);
  if (p < 1 || p > pages) return;
  dirPage = p;
  renderDirTable();
}

/* ══════════════════════════════
   PROFILE
══════════════════════════════ */
function viewProfile(id) {
  currentProfileId = id;
  /* Pre-fill profile search with employee name */
  const emps = getEmployees();
  const emp  = emps.find(e => e.id === id);
  if (emp) {
    const psEl = document.getElementById("profSearch");
    if (psEl) psEl.value = emp.firstName + " " + emp.lastName;
    profSearchResults = [];
    const psDropEl = document.getElementById("profSearchDrop");
    if (psDropEl) psDropEl.style.display = "none";
  }
  switchTab("profile");
}

function viewAndEdit(id) {
  viewProfile(id);
  /* Small delay to let profile render before opening drawer */
  setTimeout(function() { openEditDrawerById(id); }, 80);
}

function renderProfile() {
  const emptyState  = document.getElementById("profEmptyState");
  const profHero    = document.getElementById("profHero");
  const profTabsBar = document.getElementById("profTabsBar");
  const profPanels  = document.querySelectorAll(".prof-panel");
  const profBackRow = document.getElementById("profBackRow");

  if (!currentProfileId) {
    if (emptyState)  emptyState.style.display  = "flex";
    if (profHero)    profHero.style.display     = "none";
    if (profTabsBar) profTabsBar.style.display  = "none";
    profPanels.forEach(p => p.style.display = "none");
    if (profBackRow) profBackRow.style.display  = "none";
    return;
  }

  if (emptyState)  emptyState.style.display  = "none";
  if (profHero)    profHero.style.display     = "flex";
  if (profTabsBar) profTabsBar.style.display  = "flex";
  profPanels.forEach(p => p.style.display = "");
  if (profBackRow) profBackRow.style.display  = "";

  const emps = getEmployees();
  const emp  = emps.find(e => e.id === currentProfileId);
  if (!emp) return;

  setText("profName",   emp.firstName + " " + emp.lastName);

  /* Avatar — photo or initials */
  const avatarEl = document.getElementById("profAvatar");
  if (avatarEl) {
    if (emp.photo) {
      avatarEl.innerHTML = '<img src="' + emp.photo + '" alt="Photo" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />';
    } else {
      avatarEl.textContent = emp.firstName[0] + emp.lastName[0];
    }
  }

  const badgeBg = emp.status === "Active" ? "#10B981" :
                  emp.status === "On Probation" ? "#F59E0B" : "#6B7280";
  const badge = document.getElementById("profStatusBadge");
  if (badge) { badge.textContent = emp.status; badge.style.background = badgeBg; }

  const meta = document.getElementById("profMeta");
  if (meta) {
    const age  = calcAge(emp.dob);
    meta.innerHTML = [
      emp.empCode || emp.id,
      emp.gender,
      emp.dob ? formatDisplayDate(emp.dob) + " (" + age + " Yrs)" : null,
      emp.desig,
      emp.dept,
      emp.doj ? "Joined on " + formatDisplayDate(emp.doj) : null
    ].filter(Boolean).map((t, i, arr) =>
      '<span class="prof-meta-item">' + t + '</span>' +
      (i < arr.length - 1 ? '<span class="prof-meta-dot"></span>' : "")
    ).join("");
  }

  const pf = document.getElementById("profPersonalFields");
  if (pf) pf.innerHTML = profileFields([
    ["Employee Code",  emp.empCode || emp.id],
    ["First Name",     emp.firstName],
    ["Last Name",      emp.lastName],
    ["Gender",         emp.gender],
    ["Date of Birth",  emp.dob ? formatDisplayDate(emp.dob) : "—"],
    ["Marital Status", emp.marital],
    ["Blood Group",    emp.blood],
  ]);

  const cf = document.getElementById("profContactFields");
  if (cf) cf.innerHTML = profileFields([
    ["Email",             emp.email],
    ["Mobile Number",     emp.mobile],
    ["Current Address",   emp.currentAddr],
    ["Permanent Address", emp.permAddr],
    ["Emergency Contact", emp.emergency],
  ]);

  const ef = document.getElementById("profEmploymentFields");
  if (ef) ef.innerHTML = profileFields([
    ["Department",        emp.dept],
    ["Designation",       emp.desig],
    ["Date of Joining",   emp.doj ? formatDisplayDate(emp.doj) : "—"],
    ["Employment Type",   emp.empType],
    ["Status",            emp.status],
    ["Reporting Manager", emp.manager],
    ["Location",          emp.location],
    ["CTC (Annual)",      emp.ctc ? "₹" + parseInt(emp.ctc).toLocaleString("en-IN") : "—"],
  ]);

  setText("pf-pan",     emp.pan     || "—");
  setText("pf-aadhaar", emp.aadhaar || "—");
  setText("pf-uan",     emp.uan     || "—");
  setText("pf-esi",     emp.esi     || "—");
  setText("pf-bank",    emp.bank    || "—");
  setText("pf-ifsc",    emp.ifsc    || "—");

  /* Reset to first sub-tab */
  document.querySelectorAll(".prof-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".prof-panel").forEach(p => p.classList.remove("active"));
  const firstTab   = document.querySelector(".prof-tab[data-ptab='personal']");
  const firstPanel = document.getElementById("ptab-personal");
  if (firstTab)   firstTab.classList.add("active");
  if (firstPanel) firstPanel.classList.add("active");
}

function profileFields(pairs) {
  return pairs.map(function(pair) {
    return '<div class="prof-field">' +
      '<span class="prof-field-label">' + pair[0] + '</span>' +
      '<span class="prof-field-val">'   + (pair[1] || "—") + '</span>' +
    '</div>';
  }).join("");
}

/* ══════════════════════════════
   PROFILE SEARCH
══════════════════════════════ */
function initProfSearch() {
  const input = document.getElementById("profSearch");
  const drop  = document.getElementById("profSearchDrop");
  if (!input || !drop) return;

  input.addEventListener("input", function () {
    const q = this.value.trim().toLowerCase();
    if (!q) { drop.style.display = "none"; profSearchResults = []; return; }
    const emps = getEmployees();
    profSearchResults = emps.filter(e =>
      (e.firstName + " " + e.lastName).toLowerCase().includes(q) ||
      (e.empCode || e.id).toLowerCase().includes(q)
    ).slice(0, 8);

    if (!profSearchResults.length) { drop.style.display = "none"; return; }
    drop.innerHTML = profSearchResults.map(e => `
      <div class="prof-search-item" onclick="selectProfSearch('${e.id}')">
        <div class="prof-search-avatar">${e.photo ? '<img src="'+e.photo+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />' : e.firstName[0]+e.lastName[0]}</div>
        <div>
          <div class="prof-search-name">${e.firstName} ${e.lastName}</div>
          <div class="prof-search-meta">${e.empCode||e.id} · ${e.desig||"—"} · ${e.dept||"—"}</div>
        </div>
        <span class="status-badge ${e.status==='Active'?'status-active':e.status==='On Probation'?'status-probation':'status-inactive'}" style="margin-left:auto;flex-shrink:0">${e.status}</span>
      </div>
    `).join("");
    drop.style.display = "block";
  });

  document.addEventListener("click", function (e) {
    if (!input.contains(e.target) && !drop.contains(e.target)) {
      drop.style.display = "none";
    }
  });
}

function selectProfSearch(id) {
  const emps = getEmployees();
  const emp  = emps.find(e => e.id === id);
  if (!emp) return;
  currentProfileId = id;
  const input = document.getElementById("profSearch");
  const drop  = document.getElementById("profSearchDrop");
  if (input) input.value = emp.firstName + " " + emp.lastName;
  if (drop)  drop.style.display = "none";
  renderProfile();
}

/* ══════════════════════════════
   ORG TREE
══════════════════════════════ */
function renderOrgTree() {
  const wrap = document.getElementById("orgTreeWrap");
  if (!wrap) return;

  const emps = getEmployees();

  /* Colour palette per level */
  const levelColors = [
    { bg:"#7C3AED", light:"rgba(124,58,237,.08)", border:"#7C3AED" },
    { bg:"#EC4899", light:"rgba(236,72,153,.08)",  border:"#EC4899" },
    { bg:"#06B6D4", light:"rgba(6,182,212,.08)",   border:"#06B6D4" },
    { bg:"#10B981", light:"rgba(16,185,129,.08)",  border:"#10B981" },
    { bg:"#F59E0B", light:"rgba(245,158,11,.08)",  border:"#F59E0B" },
  ];

  function lc(depth) { return levelColors[Math.min(depth, levelColors.length - 1)]; }

  const allNames = emps.map(e => (e.firstName + " " + e.lastName).toLowerCase());
  const roots    = emps.filter(e => {
    if (!e.manager || !e.manager.trim()) return true;
    return !allNames.includes(e.manager.toLowerCase());
  });

  function buildNode(emp, depth) {
    const directReports = emps.filter(e =>
      e.manager && e.manager.toLowerCase() === (emp.firstName + " " + emp.lastName).toLowerCase()
    );
    const c = lc(depth);
    const hasChildren = directReports.length > 0;
    const avatarContent = emp.photo
      ? '<img src="' + emp.photo + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />'
      : (emp.firstName[0] + emp.lastName[0]);

    const childNodes = directReports.map(child => buildNode(child, depth + 1)).join("");

    return `
      <div class="org-node-wrap">
        <div class="org-node-card" style="border-top:3px solid ${c.border};background:var(--white);" onclick="viewProfile('${emp.id}')">
          <div class="org-node-avatar" style="background:${c.bg};">${avatarContent}</div>
          <div class="org-node-body">
            <div class="org-node-name">${emp.firstName} ${emp.lastName}</div>
            <div class="org-node-desig" style="color:${c.bg};">${emp.desig || "—"}</div>
            <div class="org-node-dept">${emp.dept || "—"}</div>
            ${hasChildren ? '<div class="org-node-count" style="background:'+c.light+';color:'+c.bg+';">' + directReports.length + ' direct report' + (directReports.length>1?'s':'') + '</div>' : ''}
          </div>
        </div>
        ${hasChildren ? `<div class="org-children-wrap"><div class="org-connector-line"></div><div class="org-children-row">${childNodes}</div></div>` : ''}
      </div>
    `;
  }

  const treeHtml = roots.map(r => buildNode(r, 0)).join("");
  wrap.innerHTML = '<div class="org-tree-root">' + treeHtml + '</div>';
}

/* ══════════════════════════════
   ADD / EDIT DRAWER
══════════════════════════════ */
function openAddDrawer() {
  drawerMode = "add";
  drawerStep = 1;
  clearDrawerForm();
  const nextId = nextEmpId(getEmployees());
  setVal("df-empCode", nextId);
  setText("drawerTitle", "Add New Employee");
  document.getElementById("drawerCancelBtn").textContent = "Cancel";
  document.getElementById("drawerNextBtn").textContent   = "Next";
  updateDrawerStepUI();
  openDrawer();
}

function openEditDrawer() {
  if (!currentProfileId) return;
  openEditDrawerById(currentProfileId);
}

function openEditDrawerById(id) {
  const emp = getEmployees().find(e => e.id === id);
  if (!emp) return;
  drawerMode       = "edit";
  drawerStep       = 1;
  currentProfileId = id;
  setText("drawerTitle", "Edit Employee — " + emp.firstName + " " + emp.lastName);
  fillDrawerForm(emp);
  updateDrawerStepUI();
  openDrawer();
}

function fillDrawerForm(emp) {
  const map = {
    "df-empCode":emp.empCode||emp.id,"df-firstName":emp.firstName,"df-lastName":emp.lastName,
    "df-gender":emp.gender,"df-dob":emp.dob,"df-marital":emp.marital,"df-blood":emp.blood,
    "df-email":emp.email,"df-mobile":emp.mobile,"df-emergency":emp.emergency,
    "df-currentAddr":emp.currentAddr,"df-permAddr":emp.permAddr,
    "df-dept":emp.dept,"df-desig":emp.desig,"df-doj":emp.doj,"df-empType":emp.empType,
    "df-status":emp.status,"df-manager":emp.manager,"df-location":emp.location,"df-ctc":emp.ctc,
    "df-pan":emp.pan,"df-aadhaar":emp.aadhaar,"df-uan":emp.uan,"df-esi":emp.esi,
    "df-bank":emp.bank,"df-ifsc":emp.ifsc
  };
  Object.keys(map).forEach(id => setVal(id, map[id]));
  /* Show existing photo if available */
  const preview = document.getElementById("df-photoPreview");
  const placeholder = document.getElementById("df-photoPlaceholder");
  if (preview && placeholder) {
    if (emp.photo) {
      preview.src = emp.photo;
      preview.style.display = "block";
      placeholder.style.display = "none";
    } else {
      preview.src = "";
      preview.style.display = "none";
      placeholder.style.display = "flex";
    }
  }
}

function clearDrawerForm() {
  ["df-empCode","df-firstName","df-lastName","df-gender","df-dob","df-marital","df-blood",
   "df-email","df-mobile","df-emergency","df-currentAddr","df-permAddr",
   "df-dept","df-desig","df-doj","df-empType","df-status","df-manager","df-location","df-ctc",
   "df-pan","df-aadhaar","df-uan","df-esi","df-bank","df-ifsc"
  ].forEach(id => setVal(id, ""));
  setVal("df-status", "Active");
  /* Reset photo */
  const preview = document.getElementById("df-photoPreview");
  const placeholder = document.getElementById("df-photoPlaceholder");
  const photoInput = document.getElementById("df-photoInput");
  if (preview)     { preview.src = ""; preview.style.display = "none"; }
  if (placeholder) placeholder.style.display = "flex";
  if (photoInput)  photoInput.value = "";
}

function openDrawer() {
  document.getElementById("empDrawer").classList.add("open");
  document.getElementById("drawerOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function handleEmpPhotoUpload(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const src = e.target.result;
    const preview     = document.getElementById("df-photoPreview");
    const placeholder = document.getElementById("df-photoPlaceholder");
    if (preview)     { preview.src = src; preview.style.display = "block"; }
    if (placeholder) placeholder.style.display = "none";
  };
  reader.readAsDataURL(file);
}

function closeDrawer() {
  document.getElementById("empDrawer").classList.remove("open");
  document.getElementById("drawerOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

function handleDrawerBack() {
  if (drawerStep > 1) { goToDrawerStep(drawerStep - 1); }
  else { closeDrawer(); }
}

function handleDrawerNext() {
  if (!validateDrawerStep(drawerStep)) return;
  if (drawerStep < 5) { goToDrawerStep(drawerStep + 1); }
  else { saveDrawerEmployee(); }
}

function validateDrawerStep(step) {
  const required = { 1:["df-empCode","df-firstName","df-lastName","df-gender","df-dob"], 2:["df-email","df-mobile"], 3:["df-dept","df-desig","df-doj"] };
  const fields   = required[step];
  if (!fields) return true;
  let valid = true;
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("error-field");
    if (!el.value.trim()) { el.classList.add("error-field"); valid = false; }
  });
  if (!valid) {
    const first = fields.find(id => !document.getElementById(id)?.value.trim());
    if (first) document.getElementById(first)?.focus();
  }
  return valid;
}

function goToDrawerStep(step) {
  drawerStep = step;
  updateDrawerStepUI();
}

function updateDrawerStepUI() {
  document.querySelectorAll(".dstep").forEach(function (btn) {
    const s = parseInt(btn.dataset.step);
    btn.classList.remove("active","done");
    if (s === drawerStep)    btn.classList.add("active");
    else if (s < drawerStep) btn.classList.add("done");
  });
  document.querySelectorAll(".drawer-step-panel").forEach(p => p.classList.remove("active"));
  const panel = document.getElementById("dstep-" + drawerStep);
  if (panel) panel.classList.add("active");

  const cancelBtn = document.getElementById("drawerCancelBtn");
  const nextBtn   = document.getElementById("drawerNextBtn");
  if (cancelBtn) cancelBtn.textContent = drawerStep > 1 ? "Back" : "Cancel";
  if (nextBtn)   nextBtn.textContent   = drawerStep === 5 ? (drawerMode === "add" ? "Save Employee" : "Update Employee") : "Next";
}

function saveDrawerEmployee() {
  const emps = getEmployees();
  const photoPreview = document.getElementById("df-photoPreview");
  const photoSrc = photoPreview && photoPreview.src && photoPreview.src.startsWith("data:") ? photoPreview.src : null;

  const data = {
    empCode:getVal("df-empCode"),firstName:getVal("df-firstName"),lastName:getVal("df-lastName"),
    gender:getVal("df-gender"),dob:getVal("df-dob"),marital:getVal("df-marital"),blood:getVal("df-blood"),
    email:getVal("df-email"),mobile:getVal("df-mobile"),emergency:getVal("df-emergency"),
    currentAddr:getVal("df-currentAddr"),permAddr:getVal("df-permAddr"),
    dept:getVal("df-dept"),desig:getVal("df-desig"),doj:getVal("df-doj"),
    empType:getVal("df-empType"),status:getVal("df-status")||"Active",
    manager:getVal("df-manager"),location:getVal("df-location"),ctc:getVal("df-ctc"),
    pan:getVal("df-pan"),aadhaar:getVal("df-aadhaar"),uan:getVal("df-uan"),
    esi:getVal("df-esi"),bank:getVal("df-bank"),ifsc:getVal("df-ifsc"),
  };

  if (drawerMode === "add") {
    const newId = nextEmpId(emps);
    data.id = newId;
    if (!data.empCode) data.empCode = newId;
    if (photoSrc) data.photo = photoSrc;
    emps.push(data);
    saveEmployees(emps);
    showToast("Employee added successfully!", "success");
    closeDrawer();
    /* Go directly to new employee's profile */
    viewProfile(newId);
  } else {
    const idx = emps.findIndex(e => e.id === currentProfileId);
    if (idx !== -1) {
      data.id = currentProfileId;
      /* Preserve existing photo if no new one uploaded */
      data.photo = photoSrc || emps[idx].photo || null;
      emps[idx] = data;
    }
    saveEmployees(emps);
    showToast("Employee updated successfully!", "success");
    closeDrawer();
    /* Return to profile view */
    renderProfile();
  }
}

/* ══════════════════════════════
   DELETE
══════════════════════════════ */
function openDeleteModal(id) {
  deleteTargetId = id;
  document.getElementById("deleteModal").style.display = "flex";
}
function closeDeleteModal() {
  deleteTargetId = null;
  document.getElementById("deleteModal").style.display = "none";
}
function confirmDelete() {
  if (!deleteTargetId) return;
  let emps = getEmployees().filter(e => e.id !== deleteTargetId);
  saveEmployees(emps);
  if (currentProfileId === deleteTargetId) currentProfileId = null;
  deleteTargetId = null;
  closeDeleteModal();
  populateFilterDropdowns();
  filterDirectory();
  showToast("Employee deleted.", "info");
}

/* ══════════════════════════════
   EXPORT
══════════════════════════════ */
function exportEmployees() {
  const emps    = getEmployees();
  const headers = ["Emp ID","Name","Department","Designation","DOJ","Status","Email","Mobile"];
  const rows    = emps.map(e => [
    e.empCode||e.id, e.firstName+" "+e.lastName,
    e.dept,e.desig, e.doj?formatDisplayDate(e.doj):"", e.status,e.email,e.mobile
  ]);
  const csv  = [headers,...rows].map(r => r.map(v => '"'+(v||"")+'"').join(",")).join("\n");
  const blob = new Blob([csv], { type:"text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a"); a.href=url; a.download="employees.csv"; a.click();
  URL.revokeObjectURL(url);
  showToast("Exported successfully!", "success");
}

/* ══════════════════════════════
   TOAST
══════════════════════════════ */
function showToast(msg, type) {
  const toast = document.createElement("div");
  const bg    = type==="success"?"#10B981":type==="info"?"#6B7280":"#EF4444";
  toast.style.cssText = "position:fixed;bottom:24px;right:24px;z-index:9999;background:" + bg + ";color:white;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,.2);display:flex;align-items:center;gap:8px;font-family:var(--font);";
  toast.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M9 12l2 2 4-4M22 12A10 10 0 1 1 2 12a10 10 0 0 1 20 0z"/></svg>' + msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/* ══════════════════════════════
   UTILITY
══════════════════════════════ */
function setText(id, val) { const el=document.getElementById(id); if(el) el.textContent=val; }
function getVal(id)       { const el=document.getElementById(id); return el?el.value.trim():""; }
function setVal(id, val)  { const el=document.getElementById(id); if(el) el.value=val||""; }

function formatDisplayDate(iso) {
  if (!iso) return "—";
  const [y,m,d] = iso.split("-");
  const months  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return d + " " + months[parseInt(m,10)-1] + " " + y;
}
function formatShortDate(date) {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return String(date.getDate()).padStart(2,"0") + " " + months[date.getMonth()];
}
function calcAge(dob) {
  if (!dob) return "—";
  const today = new Date(), d = new Date(dob);
  let age = today.getFullYear() - d.getFullYear();
  if (today.getMonth() - d.getMonth() < 0 || (today.getMonth()===d.getMonth() && today.getDate()<d.getDate())) age--;
  return age;
}

/* Logout — works even if app.js not loaded */
if (typeof window.logout === "undefined") {
  window.logout = function () { sessionStorage.clear(); window.location.replace("index.html"); };
}
