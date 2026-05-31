/* ================================================
   PAYNEST app.js  — v3
   Covers: Login · Forgot Password · Dashboard
================================================ */

/* ══════════════════════════════
   UTILITY
══════════════════════════════ */
function $(id) { return document.getElementById(id); }


/* ══════════════════════════════
   PASSWORD TOGGLE  (login page)
══════════════════════════════ */
function togglePassword() {
  const pw = $("password");
  if (!pw) return;
  pw.type = pw.type === "password" ? "text" : "password";
}


/* ══════════════════════════════
   LOGIN FORM
══════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {

  /* ── login ── */
  const loginForm = $("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username      = $("username");
      const password      = $("password");
      const usernameError = $("usernameError");
      const passwordError = $("passwordError");
      const loginBtn      = $("loginBtn");
      const loader        = $("loader");

      usernameError.textContent = "";
      passwordError.textContent = "";

      let valid = true;

      if (!username.value.trim()) {
        usernameError.textContent = "Please enter username";
        valid = false;
      }
      if (!password.value.trim()) {
        passwordError.textContent = "Please enter password";
        valid = false;
      } else if (password.value.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters";
        valid = false;
      }
      if (!valid) return;

      loginBtn.disabled = true;
      loginBtn.innerHTML = `<span class="spinner"></span> Signing In...`;
      if (loader) loader.classList.remove("hidden");

      setTimeout(function () {
        sessionStorage.setItem("paynest_user", username.value);
        window.location.href = "dashboard.html";
      }, 1200);
    });
    return;
  }

  /* ── dashboard init ── */
  if ($("chartsSection")) {
    initDashboard();
  }
});


/* ══════════════════════════════
   FORGOT PASSWORD
══════════════════════════════ */
function sendResetLink() {
  const username = $("forgotUsername");
  const email    = $("forgotEmail");
  if (!username || !email) return;

  if (!username.value.trim()) { alert("Please enter username."); return; }
  if (!email.value.trim())    { alert("Please enter registered email."); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    alert("Please enter a valid email address."); return;
  }
  alert("Password reset link sent successfully.");
  username.value = "";
  email.value = "";
}


/* ══════════════════════════════
   LOGOUT
══════════════════════════════ */
function logout() {
  sessionStorage.clear();
  window.location.replace("index.html");
}


/* ══════════════════════════════
   DASHBOARD INIT
══════════════════════════════ */
function initDashboard() {
  initDarkMode();
  initGreeting();
  initSidebar();
  initTopbar();
  initWelcomeToggles();
  initWidgetManager();
  initCharts();
  initChartScroll();
  initTasks();
  initPhotoUpload();
}


/* ══════════════════════════════
   DARK MODE
══════════════════════════════ */
function initDarkMode() {
  const btn  = $("darkModeBtn");
  if (!btn) return;

  /* restore saved preference */
  const saved = sessionStorage.getItem("paynest_darkmode") === "true";
  if (saved) document.body.classList.add("dark-mode");

  btn.addEventListener("click", function () {
    const isDark = document.body.classList.toggle("dark-mode");
    sessionStorage.setItem("paynest_darkmode", isDark);
    /* Update Chart.js default colours to match mode */
    updateChartDefaults(isDark);
    /* Re-render all charts so they pick up new colors */
    if (window._paynestCharts) {
      window._paynestCharts.forEach(function(c) { c.update(); });
    }
  });
}

function updateChartDefaults(isDark) {
  if (!window.Chart) return;
  Chart.defaults.color = isDark ? "#9CA3AF" : "#6B7280";
  Chart.defaults.borderColor = isDark ? "#2D2B3D" : "rgba(0,0,0,.06)";
}


/* ══════════════════════════════
   GREETING  (time-based)
══════════════════════════════ */
function initGreeting() {
  const user   = sessionStorage.getItem("paynest_user") || "Arindam";
  const hour   = new Date().getHours();
  const period = hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : "Evening";
  const emoji  = hour < 12 ? "👋" : hour < 17 ? "☀️" : "🌙";

  const el = $("welcomeHeading");
  if (el) el.textContent = `Good ${period}, ${user}! ${emoji}`;

  const tbName   = $("tbName");
  const udName   = $("udName");
  const tbAvatar = $("tbAvatar");
  const udAvatar = $("udAvatar");
  const initial  = user.charAt(0).toUpperCase();
  if (tbName)   tbName.textContent   = user;
  if (udName)   udName.textContent   = user;
  if (tbAvatar) tbAvatar.textContent = initial;
  if (udAvatar) udAvatar.textContent = initial;
}


/* ══════════════════════════════
   SIDEBAR — hover + pin
══════════════════════════════ */
function initSidebar() {
  const sidebar = $("sidebar");
  const pinBtn  = $("sbPinBtn");
  if (!sidebar) return;

  let pinned = JSON.parse(sessionStorage.getItem("sb_pinned") || "false");
  if (pinned) sidebar.classList.add("pinned");

  pinBtn.addEventListener("click", function () {
    pinned = !pinned;
    sessionStorage.setItem("sb_pinned", pinned);
    sidebar.classList.toggle("pinned", pinned);
    pinBtn.querySelector("span").textContent = pinned ? "Pinned ✓" : "Keep Open";
  });

  const items   = sidebar.querySelectorAll(".sb-item");
  const tooltip = $("sbTooltip");
  items.forEach(function (item) {
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


/* ══════════════════════════════
   TOPBAR — dropdowns
══════════════════════════════ */
function initTopbar() {
  const pageBtn  = $("pageSelectBtn");
  const pageDrop = $("pageDropdown");
  if (pageBtn && pageDrop) {
    pageBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      pageDrop.classList.toggle("open");
    });
  }

  const userBtn  = $("userDropdownBtn");
  const userDrop = $("userDropdown");
  if (userBtn && userDrop) {
    userBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      userDrop.classList.toggle("open");
    });
  }

  document.addEventListener("click", function () {
    if (pageDrop) pageDrop.classList.remove("open");
    if (userDrop) userDrop.classList.remove("open");
    const wm = $("widgetManager");
    if (wm) wm.classList.remove("open");
  });

  [pageDrop, userDrop].forEach(function (el) {
    if (el) el.addEventListener("click", function (e) { e.stopPropagation(); });
  });
}


/* ══════════════════════════════
   WELCOME TOGGLES
══════════════════════════════ */
function initWelcomeToggles() {
  const toggleGreeting = $("toggleGreeting");
  const toggleQuote    = $("toggleQuote");
  const toggleBg       = $("toggleBg");
  const welcomeHeading = $("welcomeHeading");
  const welcomeQuote   = $("welcomeQuote");
  const welcomeBg      = $("welcomeBgGraphic");

  if (toggleGreeting && welcomeHeading) {
    toggleGreeting.addEventListener("change", function () {
      welcomeHeading.style.display = this.checked ? "" : "none";
      const sub = welcomeHeading.nextElementSibling;
      if (sub) sub.style.display = this.checked ? "" : "none";
    });
  }
  if (toggleQuote && welcomeQuote) {
    toggleQuote.addEventListener("change", function () {
      welcomeQuote.style.display = this.checked ? "" : "none";
    });
  }
  if (toggleBg && welcomeBg) {
    toggleBg.addEventListener("change", function () {
      welcomeBg.style.display = this.checked ? "" : "none";
    });
  }
}


/* ══════════════════════════════
   WIDGET MANAGER
   — now handles both widgets AND individual charts
══════════════════════════════ */
function initWidgetManager() {
  const manageBtn = $("manageWidgetsBtn");
  const wm        = $("widgetManager");
  if (!manageBtn || !wm) return;

  manageBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    wm.classList.toggle("open");
  });
  wm.addEventListener("click", function (e) { e.stopPropagation(); });

  /* Widget (section) toggles */
  const widgetMap = {
    tasks:        "tasksWidget",
    quickactions: "quickactionsWidget",
    activities:   "activitiesWidget"
  };
  wm.querySelectorAll("input[data-widget]").forEach(function (cb) {
    cb.addEventListener("change", function () {
      const el = $(widgetMap[this.dataset.widget]);
      if (el) el.style.display = this.checked ? "" : "none";
    });
  });

  /* Individual chart toggles */
  wm.querySelectorAll("input[data-chart]").forEach(function (cb) {
    cb.addEventListener("change", function () {
      const cardId = "chartCard-" + this.dataset.chart;
      const card   = $(cardId);
      if (card) card.style.display = this.checked ? "" : "none";
    });
  });
}


/* ══════════════════════════════
   CHART SCROLL — arrow buttons
══════════════════════════════ */
function initChartScroll() {
  const track = $("chartsScrollTrack");
  const left  = $("csArrowLeft");
  const right = $("csArrowRight");
  if (!track || !left || !right) return;

  const STEP = 300;

  left.addEventListener("click", function () {
    track.scrollBy({ left: -STEP, behavior: "smooth" });
  });
  right.addEventListener("click", function () {
    track.scrollBy({ left: STEP, behavior: "smooth" });
  });

  /* Show/hide arrows based on scroll position */
  function updateArrows() {
    left.style.opacity  = track.scrollLeft > 0 ? "1" : "0.35";
    right.style.opacity = track.scrollLeft < track.scrollWidth - track.clientWidth - 2 ? "1" : "0.35";
  }
  track.addEventListener("scroll", updateArrows, { passive: true });
  updateArrows();
}


/* ══════════════════════════════
   CHARTS
══════════════════════════════ */
function initCharts() {
  const isDark = document.body.classList.contains("dark-mode");
  Chart.defaults.font.family = "'Plus Jakarta Sans', 'Segoe UI', sans-serif";
  Chart.defaults.font.size   = 10;
  Chart.defaults.color       = isDark ? "#9CA3AF" : "#6B7280";

  const months = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];

  /* Store refs for dark-mode live updates */
  window._paynestCharts = [];

  /* Grid line color helper */
  function gridColor() {
    return document.body.classList.contains("dark-mode")
      ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)";
  }

  /* ── Chart 1: Employee Addition ── */
  window._paynestCharts.push(new Chart($("chartEmpAdd"), {
    type: "line",
    data: {
      labels: months,
      datasets: [{
        label: "Joined",
        data: [14,18,22,16,24,20,28,18,22,26,30,24],
        borderColor: "#7C3AED",
        backgroundColor: "rgba(124,58,237,.12)",
        borderWidth: 2.5,
        pointBackgroundColor: "#7C3AED",
        pointRadius: 3, pointHoverRadius: 5,
        tension: 0.4, fill: true
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 9 } } },
        y: {
          beginAtZero: true,
          grid: { color: gridColor() },
          ticks: { stepSize: 10, font: { size: 9 } }
        }
      }
    }
  }));


  /* ── Chart 2: Years in Service ── */
  window._paynestCharts.push(new Chart($("chartYearsService"), {
    type: "doughnut",
    data: {
      labels: ["0-2 Years","3-5 Years","6-10 Years","10+ Years"],
      datasets: [{
        data: [87, 69, 50, 42],
        backgroundColor: ["#7C3AED","#EC4899","#F59E0B","#10B981"],
        borderWidth: 2,
        borderColor: "transparent",
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: "68%",
      layout: { padding: { top: 4, bottom: 4 } },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 10, boxHeight: 10,
            padding: 8,
            font: { size: 10 },
            generateLabels: function(chart) {
              const data = chart.data;
              return data.labels.map(function(label, i) {
                const val = data.datasets[0].data[i];
                const pct = Math.round(val / 248 * 100);
                return {
                  text: `${label}  ${pct}% (${val})`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  index: i
                };
              });
            }
          }
        }
      }
    }
  }));


  /* ── Chart 3: Gender ── */
  window._paynestCharts.push(new Chart($("chartGender"), {
    type: "doughnut",
    data: {
      labels: ["Male","Female","Other"],
      datasets: [{
        data: [144, 99, 5],
        backgroundColor: ["#7C3AED","#EC4899","#F59E0B"],
        borderWidth: 2,
        borderColor: "transparent",
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: "68%",
      layout: { padding: { top: 4, bottom: 4 } },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 10, boxHeight: 10,
            padding: 8,
            font: { size: 10 },
            generateLabels: function(chart) {
              const data = chart.data;
              return data.labels.map(function(label, i) {
                const val = data.datasets[0].data[i];
                const pct = Math.round(val / 248 * 100);
                return {
                  text: `${label}  ${pct}% (${val})`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  index: i
                };
              });
            }
          }
        }
      }
    }
  }));


  /* ── Chart 4: Age Distribution ── */
  window._paynestCharts.push(new Chart($("chartAge"), {
    type: "bar",
    data: {
      labels: ["20-30","31-40","41-50","51-60","60+"],
      datasets: [{
        label: "Employees",
        data: [28, 85, 78, 42, 15],
        backgroundColor: "#7C3AED",
        borderRadius: 6,
        hoverBackgroundColor: "#6D28D9"
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 9 } } },
        y: {
          beginAtZero: true,
          grid: { color: gridColor() },
          ticks: { stepSize: 20, font: { size: 9 } },
          max: 100
        }
      }
    }
  }));


  /* ── Chart 5: Employee Count Trend ── */
  window._paynestCharts.push(new Chart($("chartEmpCount"), {
    type: "line",
    data: {
      labels: months,
      datasets: [{
        label: "Headcount",
        data: [205,208,214,218,220,225,228,230,235,240,244,248],
        borderColor: "#7C3AED",
        backgroundColor: "rgba(124,58,237,.1)",
        borderWidth: 2.5,
        pointBackgroundColor: "#7C3AED",
        pointRadius: 3, pointHoverRadius: 5,
        tension: 0.4, fill: true
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 9 } } },
        y: {
          beginAtZero: false, min: 180,
          grid: { color: gridColor() },
          ticks: { stepSize: 50, font: { size: 9 } }
        }
      }
    }
  }));
}


/* ══════════════════════════════
   TASKS  (per-user in sessionStorage)
══════════════════════════════ */
function initTasks() {
  const addBtn    = $("addTaskBtn");
  const form      = $("addTaskForm");
  const saveBtn   = $("saveTaskBtn");
  const cancelBtn = $("cancelTaskBtn");
  const taskText  = $("newTaskText");
  const taskDate  = $("newTaskDate");
  if (!addBtn) return;

  const user = sessionStorage.getItem("paynest_user") || "default";
  const key  = "tasks_" + user;
  let tasks  = JSON.parse(sessionStorage.getItem(key) || "null");
  if (!tasks) {
    tasks = [
      { id: 1, text: "Review payroll for April 2026", date: "2026-04-30", done: false },
      { id: 2, text: "Approve leave requests",        date: "2026-05-02", done: false },
      { id: 3, text: "Update employee documents",     date: "2026-05-05", done: false },
      { id: 4, text: "Team meeting with HR",          date: "2026-05-07", done: false }
    ];
    saveTasks(tasks, key);
  }
  renderTasks(tasks, key);

  addBtn.addEventListener("click", function () {
    form.classList.toggle("open");
    if (form.classList.contains("open")) taskText.focus();
  });
  cancelBtn.addEventListener("click", function () {
    form.classList.remove("open");
    taskText.value = "";
    taskDate.value = "";
  });
  saveBtn.addEventListener("click", function () {
    const txt = taskText.value.trim();
    if (!txt) { taskText.focus(); return; }
    tasks.push({ id: Date.now(), text: txt, date: taskDate.value, done: false });
    saveTasks(tasks, key);
    renderTasks(tasks, key);
    form.classList.remove("open");
    taskText.value = "";
    taskDate.value = "";
  });
}

function saveTasks(tasks, key) {
  sessionStorage.setItem(key, JSON.stringify(tasks));
}

function renderTasks(tasks, key) {
  const list = $("tasksList");
  if (!list) return;
  list.innerHTML = "";
  const today = new Date().toISOString().slice(0, 10);

  tasks.forEach(function (t) {
    const row     = document.createElement("div");
    row.className = "task-row";
    const overdue  = t.date && t.date < today && !t.done;
    const dateDisp = t.date ? formatDate(t.date) : "";
    row.innerHTML = `
      <div class="task-checkbox ${t.done ? "checked" : ""}" data-id="${t.id}"></div>
      <span class="task-row-text ${t.done ? "done" : ""}">${escHtml(t.text)}</span>
      <span class="task-row-date ${overdue ? "overdue" : ""}">${dateDisp}</span>
    `;
    row.querySelector(".task-checkbox").addEventListener("click", function () {
      t.done = !t.done;
      saveTasks(tasks, key);
      renderTasks(tasks, key);
    });
    list.appendChild(row);
  });
}

function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${d} ${months[parseInt(m,10)-1]} ${y}`;
}

function escHtml(str) {
  return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}


/* ══════════════════════════════
   PHOTO UPLOAD
══════════════════════════════ */
function initPhotoUpload() {
  const input = $("photoUpload");
  if (!input) return;
  input.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const src = e.target.result;
      [$("tbAvatar"), $("udAvatar")].forEach(function (el) {
        if (!el) return;
        el.innerHTML = `<img src="${src}" alt="Avatar" />`;
      });
    };
    reader.readAsDataURL(file);
  });
}
