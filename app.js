/* ================================================
   PAYNEST app.js v3
   dashboard · employees · dark mode · charts
================================================ */

/* ── UTILS ── */
function $(id){ return document.getElementById(id); }
function qs(sel,ctx){ return (ctx||document).querySelector(sel); }
function qsa(sel,ctx){ return [...(ctx||document).querySelectorAll(sel)]; }
function escHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function fmtDate(iso){
  if(!iso) return '';
  const [y,m,d]=iso.split('-');
  const mn=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${d} ${mn[+m-1]} ${y}`;
}
function genEmpCode(){
  const emps = getEmployees();
  const max = emps.reduce((a,e)=>{ const n=parseInt((e.empCode||'EMP000').replace(/\D/g,''),10); return n>a?n:a; },0);
  return 'EMP' + String(max+1).padStart(3,'0');
}

/* ── STORAGE ── */
const STORE_KEY = 'paynest_employees';
const TASK_KEY  = 'paynest_tasks';

function getEmployees(){
  try{ return JSON.parse(localStorage.getItem(STORE_KEY)||'[]'); }catch(e){ return []; }
}
function saveEmployees(arr){ localStorage.setItem(STORE_KEY,JSON.stringify(arr)); }

function getTasks(user){
  try{ return JSON.parse(sessionStorage.getItem(TASK_KEY+'_'+user)||'null'); }catch(e){ return null; }
}
function saveTasks(arr,user){ sessionStorage.setItem(TASK_KEY+'_'+user,JSON.stringify(arr)); }

/* ── SEED DEFAULT EMPLOYEES ── */
function seedEmployees(){
  if(getEmployees().length) return;
  const defaults=[
    {id:1,empCode:'EMP001',firstName:'Arindam',lastName:'Maity',gender:'Male',dob:'1990-03-15',marital:'Married',blood:'B+',mobile:'9876543210',email:'arindam@abcltd.com',address:'123, Green Park, Delhi',permAddress:'123, Green Park, Delhi',emergency:'Sunita Maity - Wife - 9876543211',dept:'Payroll',desig:'Manager',doj:'2025-04-01',empType:'Full-Time',location:'Delhi',manager:'',ctc:1200000,status:'Active',pan:'ABCDE1234F',aadhar:'1234 5678 9012',pf:'PF/001/001',uan:'100123456789',bank:'HDFC Bank',accNo:'1234567890',ifsc:'HDFC0001234'},
    {id:2,empCode:'EMP002',firstName:'Rohit',lastName:'Sharma',gender:'Male',dob:'1995-07-22',marital:'Single',blood:'O+',mobile:'9876543220',email:'rohit@abcltd.com',address:'45, Lajpat Nagar, Delhi',permAddress:'45, Lajpat Nagar, Delhi',emergency:'',dept:'HR',desig:'Executive',doj:'2025-04-15',empType:'Full-Time',location:'Delhi',manager:'Arindam Maity',ctc:600000,status:'Active',pan:'',aadhar:'',pf:'',uan:'',bank:'',accNo:'',ifsc:''},
    {id:3,empCode:'EMP003',firstName:'Sneha',lastName:'Das',gender:'Female',dob:'1993-11-10',marital:'Married',blood:'A+',mobile:'9876543230',email:'sneha@abcltd.com',address:'78, Salt Lake, Kolkata',permAddress:'78, Salt Lake, Kolkata',emergency:'',dept:'Finance',desig:'Analyst',doj:'2025-04-20',empType:'Full-Time',location:'Kolkata',manager:'Arindam Maity',ctc:700000,status:'Active',pan:'',aadhar:'',pf:'',uan:'',bank:'',accNo:'',ifsc:''},
    {id:4,empCode:'EMP004',firstName:'Vikram',lastName:'Patel',gender:'Male',dob:'1992-05-05',marital:'Married',blood:'AB+',mobile:'9876543240',email:'vikram@abcltd.com',address:'22, Andheri, Mumbai',permAddress:'22, Andheri, Mumbai',emergency:'',dept:'IT',desig:'Developer',doj:'2025-05-01',empType:'Full-Time',location:'Mumbai',manager:'Arindam Maity',ctc:900000,status:'On Probation',pan:'',aadhar:'',pf:'',uan:'',bank:'',accNo:'',ifsc:''},
    {id:5,empCode:'EMP005',firstName:'Neha',lastName:'Kumari',gender:'Female',dob:'1997-09-18',marital:'Single',blood:'B-',mobile:'9876543250',email:'neha@abcltd.com',address:'12, Koramangala, Bangalore',permAddress:'12, Koramangala, Bangalore',emergency:'',dept:'Operations',desig:'Coordinator',doj:'2025-05-05',empType:'Full-Time',location:'Bangalore',manager:'Rohit Sharma',ctc:550000,status:'Active',pan:'',aadhar:'',pf:'',uan:'',bank:'',accNo:'',ifsc:''},
    {id:6,empCode:'EMP006',firstName:'Pritam',lastName:'Shaw',gender:'Male',dob:'1988-01-30',marital:'Married',blood:'O-',mobile:'9876543260',email:'pritam@abcltd.com',address:'5, Park Street, Kolkata',permAddress:'5, Park Street, Kolkata',emergency:'',dept:'Sales',desig:'Sales Executive',doj:'2025-05-10',empType:'Full-Time',location:'Kolkata',manager:'Arindam Maity',ctc:480000,status:'Active',pan:'',aadhar:'',pf:'',uan:'',bank:'',accNo:'',ifsc:''},
  ];
  saveEmployees(defaults);
}

/* ════════════════════════════════
   DARK MODE
════════════════════════════════ */
function initDarkMode(){
  const btn    = $('darkModeBtn');
  const html   = document.documentElement;
  const stored = localStorage.getItem('paynest_theme') || 'light';
  applyTheme(stored);

  if(btn) btn.addEventListener('click', function(){
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('paynest_theme', next);
  });
}
function applyTheme(theme){
  document.documentElement.dataset.theme = theme;
  const btn = $('darkModeBtn');
  if(!btn) return;
  const sun  = btn.querySelector('.icon-sun');
  const moon = btn.querySelector('.icon-moon');
  if(theme === 'dark'){
    if(sun)  sun.style.display  = 'none';
    if(moon) moon.style.display = '';
  } else {
    if(sun)  sun.style.display  = '';
    if(moon) moon.style.display = 'none';
  }
}

/* ════════════════════════════════
   SIDEBAR
════════════════════════════════ */
function initSidebar(){
  const sidebar = $('sidebar');
  const pinBtn  = $('sbPinBtn');
  const tooltip = $('sbTooltip');
  if(!sidebar) return;

  const pinned = localStorage.getItem('paynest_sb_pinned') === 'true';
  if(pinned) sidebar.classList.add('pinned');

  if(pinBtn){
    pinBtn.addEventListener('click', function(){
      const nowPinned = sidebar.classList.toggle('pinned');
      localStorage.setItem('paynest_sb_pinned', nowPinned);
      pinBtn.querySelector('span').textContent = nowPinned ? 'Pinned ✓' : 'Keep Open';
    });
  }

  /* Tooltips on collapsed hover */
  qsa('.sb-item', sidebar).forEach(function(item){
    item.addEventListener('mouseenter', function(e){
      if(sidebar.classList.contains('pinned')) return;
      const lbl = item.querySelector('.sb-label');
      if(!lbl || !tooltip) return;
      tooltip.textContent = lbl.textContent.trim();
      const r = item.getBoundingClientRect();
      tooltip.style.top  = (r.top + r.height/2 - 12) + 'px';
      tooltip.style.opacity = '1';
    });
    item.addEventListener('mouseleave', function(){
      if(tooltip) tooltip.style.opacity = '0';
    });
  });
}

/* ════════════════════════════════
   TOPBAR DROPDOWNS
════════════════════════════════ */
function initTopbar(){
  const userBtn  = $('userDropdownBtn');
  const userDrop = $('userDropdown');

  if(userBtn && userDrop){
    userBtn.addEventListener('click', function(e){
      e.stopPropagation();
      userDrop.classList.toggle('open');
    });
    userDrop.addEventListener('click', function(e){ e.stopPropagation(); });
  }

  document.addEventListener('click', function(){
    if(userDrop) userDrop.classList.remove('open');
    const wm = $('widgetManager');
    if(wm) wm.classList.remove('open');
  });

  /* Photo upload */
  const photoInput = $('photoUpload');
  if(photoInput){
    photoInput.addEventListener('change', function(){
      const file = this.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = function(ev){
        [$('tbAvatar'), $('udAvatar')].forEach(function(el){
          if(el) el.innerHTML = '<img src="'+ev.target.result+'" alt="avatar"/>';
        });
      };
      reader.readAsDataURL(file);
    });
  }

  /* Populate user name from session */
  const user = sessionStorage.getItem('paynest_user') || 'Arindam';
  [$('tbName'),$('udName')].forEach(function(el){ if(el) el.textContent = user; });
  [$('tbAvatar'),$('udAvatar')].forEach(function(el){ if(el && !el.querySelector('img')) el.textContent = user.charAt(0).toUpperCase(); });
}

/* ════════════════════════════════
   PASSWORD TOGGLE  (login)
════════════════════════════════ */
function togglePassword(){
  const pw = $('password');
  if(!pw) return;
  pw.type = pw.type === 'password' ? 'text' : 'password';
}

/* ════════════════════════════════
   LOGIN
════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function(){
  /* Login form */
  const loginForm = $('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', function(e){
      e.preventDefault();
      const username = $('username'), password = $('password');
      const usernameError = $('usernameError'), passwordError = $('passwordError');
      const loginBtn = $('loginBtn'), loader = $('loader');
      usernameError.textContent = '';
      passwordError.textContent = '';
      let valid = true;
      if(!username.value.trim()){ usernameError.textContent='Please enter username'; valid=false; }
      if(!password.value.trim()){ passwordError.textContent='Please enter password'; valid=false; }
      else if(password.value.length < 8){ passwordError.textContent='Password must be at least 8 characters'; valid=false; }
      if(!valid) return;
      loginBtn.disabled = true;
      loginBtn.innerHTML = '<span class="spinner"></span> Signing In...';
      if(loader) loader.classList.remove('hidden');
      setTimeout(function(){
        sessionStorage.setItem('paynest_user', username.value);
        window.location.href = 'dashboard.html';
      }, 1200);
    });
    return;
  }

  /* Init dark mode & sidebar on all pages */
  initDarkMode();
  initSidebar();
  initTopbar();

  /* Route to page-specific init */
  if($('chartsSection'))  initDashboard();
  if($('empTableBody'))   { seedEmployees(); initEmployees(); }
  if($('tab-overview') && !$('chartsSection')) { seedEmployees(); initEmployees(); }
});

/* ════════════════════════════════
   FORGOT PASSWORD
════════════════════════════════ */
function sendResetLink(){
  const u = $('forgotUsername'), e = $('forgotEmail');
  if(!u||!e) return;
  if(!u.value.trim()){ alert('Please enter username.'); return; }
  if(!e.value.trim()){ alert('Please enter registered email.'); return; }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.value.trim())){ alert('Please enter a valid email.'); return; }
  alert('Password reset link sent successfully.');
  u.value=''; e.value='';
}

function logout(){
  sessionStorage.clear();
  window.location.replace('index.html');
}

/* ════════════════════════════════
   DASHBOARD
════════════════════════════════ */
function initDashboard(){
  initGreeting();
  initWelcomeToggles();
  initWidgetManager();
  initChartScroll();
  initDashboardCharts();
  initTasks();
}

function initGreeting(){
  const user   = sessionStorage.getItem('paynest_user') || 'Arindam';
  const hour   = new Date().getHours();
  const period = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening';
  const emoji  = hour < 12 ? '👋' : hour < 17 ? '☀️' : '🌙';
  const el = $('welcomeHeading');
  if(el) el.textContent = 'Good '+period+', '+user+'! '+emoji;
}

function initWelcomeToggles(){
  const map = {
    toggleGreeting: ['welcomeHeading','welcomeSub'],
    toggleQuote:    ['welcomeQuote'],
    toggleBg:       ['welcomeBgGraphic']
  };
  Object.entries(map).forEach(function([cbId, targetIds]){
    const cb = $(cbId);
    if(!cb) return;
    cb.addEventListener('change', function(){
      targetIds.forEach(function(id){
        const el = $(id);
        if(el) el.style.display = cb.checked ? '' : 'none';
      });
    });
  });
}

function initWidgetManager(){
  const btn = $('manageWidgetsBtn');
  const wm  = $('widgetManager');
  if(!btn||!wm) return;
  btn.addEventListener('click', function(e){
    e.stopPropagation();
    wm.classList.toggle('open');
  });
  wm.addEventListener('click', function(e){ e.stopPropagation(); });

  /* chart checkboxes */
  qsa('[data-chart]', wm).forEach(function(cb){
    cb.addEventListener('change', function(){
      const wrap = $('wrap-'+cb.dataset.chart);
      if(wrap) wrap.style.display = cb.checked ? '' : 'none';
    });
  });
  /* widget checkboxes */
  qsa('[data-widget]', wm).forEach(function(cb){
    cb.addEventListener('change', function(){
      const el = $(cb.dataset.widget+'Widget');
      if(el) el.style.display = cb.checked ? '' : 'none';
    });
  });
}

function initChartScroll(){
  const track = $('chartsTrack');
  const left  = $('chartScrollLeft');
  const right = $('chartScrollRight');
  if(!track) return;
  const SCROLL_BY = 300;
  if(left)  left.addEventListener('click',  function(){ track.scrollBy({left:-SCROLL_BY, behavior:'smooth'}); });
  if(right) right.addEventListener('click', function(){ track.scrollBy({left:SCROLL_BY,  behavior:'smooth'}); });
}

/* ── Dashboard Charts ── */
function initDashboardCharts(){
  Chart.defaults.font.family = "'Plus Jakarta Sans','Segoe UI',sans-serif";
  Chart.defaults.font.size   = 10;
  Chart.defaults.color       = '#6B7280';

  const months = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];

  /* Chart 1: Employee Addition */
  new Chart($('chartEmpAdd'),{
    type:'line',
    data:{
      labels:months,
      datasets:[{
        label:'Joined',
        data:[14,18,22,16,24,20,28,18,22,26,30,24],
        borderColor:'#7C3AED',
        backgroundColor:'rgba(124,58,237,.12)',
        borderWidth:2.5,
        pointBackgroundColor:'#7C3AED',
        pointRadius:3, pointHoverRadius:5,
        tension:.4, fill:true
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{
        x:{grid:{display:false}, ticks:{font:{size:9}}},
        y:{beginAtZero:true, grid:{color:'rgba(0,0,0,.05)'}, ticks:{stepSize:10,font:{size:9}}}
      }
    }
  });

  /* Chart 2: Years in Service */
  new Chart($('chartYearsService'),{
    type:'doughnut',
    data:{
      labels:['0-2 Years','3-5 Years','6-10 Years','10+ Years'],
      datasets:[{
        data:[87,69,50,42],
        backgroundColor:['#7C3AED','#EC4899','#F59E0B','#10B981'],
        borderWidth:2, borderColor:'#fff', hoverOffset:6
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      cutout:'68%',
      layout:{padding:{right:100}},
      plugins:{
        legend:{
          position:'right',
          labels:{
            boxWidth:10, boxHeight:10, padding:8, font:{size:10},
            generateLabels:function(c){
              return c.data.labels.map(function(lbl,i){
                const v=c.data.datasets[0].data[i];
                return { text:lbl+'  '+Math.round(v/248*100)+'% ('+v+')', fillStyle:c.data.datasets[0].backgroundColor[i], index:i };
              });
            }
          }
        }
      }
    }
  });

  /* Chart 3: Gender */
  new Chart($('chartGender'),{
    type:'doughnut',
    data:{
      labels:['Male','Female','Other'],
      datasets:[{
        data:[144,99,5],
        backgroundColor:['#7C3AED','#EC4899','#F59E0B'],
        borderWidth:2, borderColor:'#fff', hoverOffset:6
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      cutout:'68%',
      layout:{padding:{right:80}},
      plugins:{
        legend:{
          position:'right',
          labels:{
            boxWidth:10, boxHeight:10, padding:8, font:{size:10},
            generateLabels:function(c){
              return c.data.labels.map(function(lbl,i){
                const v=c.data.datasets[0].data[i];
                return { text:lbl+'  '+Math.round(v/248*100)+'% ('+v+')', fillStyle:c.data.datasets[0].backgroundColor[i], index:i };
              });
            }
          }
        }
      }
    }
  });

  /* Chart 4: Age Distribution */
  new Chart($('chartAge'),{
    type:'bar',
    data:{
      labels:['20-30','31-40','41-50','51-60','60+'],
      datasets:[{
        label:'Employees',
        data:[28,85,78,42,15],
        backgroundColor:'#7C3AED',
        borderRadius:5,
        hoverBackgroundColor:'#6D28D9'
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{
        x:{grid:{display:false}, ticks:{font:{size:9}}},
        y:{beginAtZero:true, max:100, grid:{color:'rgba(0,0,0,.05)'}, ticks:{stepSize:20,font:{size:9}}}
      }
    }
  });

  /* Chart 5: Employee Count Trend */
  new Chart($('chartEmpCount'),{
    type:'line',
    data:{
      labels:months,
      datasets:[{
        label:'Headcount',
        data:[205,208,214,218,220,225,228,230,235,240,244,248],
        borderColor:'#7C3AED',
        backgroundColor:'rgba(124,58,237,.1)',
        borderWidth:2.5,
        pointBackgroundColor:'#7C3AED',
        pointRadius:3, pointHoverRadius:5,
        tension:.4, fill:true
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{
        x:{grid:{display:false}, ticks:{font:{size:9}}},
        y:{min:180, grid:{color:'rgba(0,0,0,.05)'}, ticks:{stepSize:50,font:{size:9}}}
      }
    }
  });
}

/* ── Tasks ── */
function initTasks(){
  const user    = sessionStorage.getItem('paynest_user') || 'default';
  const addBtn  = $('addTaskBtn');
  const form    = $('addTaskForm');
  const saveBtn = $('saveTaskBtn');
  const cancel  = $('cancelTaskBtn');
  const txtEl   = $('newTaskText');
  const dateEl  = $('newTaskDate');
  if(!addBtn) return;

  let tasks = getTasks(user);
  if(!tasks){
    tasks = [
      {id:1,text:'Review payroll for April 2026',date:'2026-04-30',done:false},
      {id:2,text:'Approve leave requests',date:'2026-05-02',done:false},
      {id:3,text:'Update employee documents',date:'2026-05-05',done:false},
      {id:4,text:'Team meeting with HR',date:'2026-05-07',done:false}
    ];
    saveTasks(tasks,user);
  }
  renderTasks(tasks,user);

  addBtn.addEventListener('click', function(){ form.classList.toggle('open'); if(form.classList.contains('open')) txtEl.focus(); });
  cancel.addEventListener('click', function(){ form.classList.remove('open'); txtEl.value=''; dateEl.value=''; });
  saveBtn.addEventListener('click', function(){
    const txt = txtEl.value.trim();
    if(!txt){ txtEl.focus(); return; }
    tasks.push({id:Date.now(),text:txt,date:dateEl.value,done:false});
    saveTasks(tasks,user);
    renderTasks(tasks,user);
    form.classList.remove('open');
    txtEl.value=''; dateEl.value='';
  });
}

function renderTasks(tasks,user){
  const list  = $('tasksList');
  if(!list) return;
  const today = new Date().toISOString().slice(0,10);
  list.innerHTML = '';
  tasks.forEach(function(t){
    const overdue = t.date && t.date < today && !t.done;
    const row = document.createElement('div');
    row.className = 'task-row';
    row.innerHTML =
      '<div class="task-checkbox'+(t.done?' checked':'')+'" data-id="'+t.id+'"></div>'+
      '<span class="task-row-text'+(t.done?' done':'')+'">'+escHtml(t.text)+'</span>'+
      '<span class="task-row-date'+(overdue?' overdue':'')+'">'+fmtDate(t.date)+'</span>';
    row.querySelector('.task-checkbox').addEventListener('click', function(){
      t.done=!t.done; saveTasks(tasks,user); renderTasks(tasks,user);
    });
    list.appendChild(row);
  });
}

/* ════════════════════════════════
   EMPLOYEES MODULE
════════════════════════════════ */
let currentPage = 1;
const PAGE_SIZE  = 10;
let currentEmpId = null; /* viewing/editing profile */

function initEmployees(){
  initEmpTabs();
  initOverviewCharts();
  renderDirectory();
  renderOnboarding();
  renderIncrement();
  renderLifecycle();
  initDrawer();
  initDirSearch();
  updateOverviewKPIs();
}

/* ── Tabs ── */
function initEmpTabs(){
  qsa('.emp-tab').forEach(function(btn){
    btn.addEventListener('click', function(){
      qsa('.emp-tab').forEach(function(b){ b.classList.remove('active'); });
      qsa('.emp-panel').forEach(function(p){ p.classList.remove('active'); });
      btn.classList.add('active');
      const panel = $('tab-'+btn.dataset.tab);
      if(panel) panel.classList.add('active');
    });
  });
}

/* ── KPIs ── */
function updateOverviewKPIs(){
  const emps = getEmployees();
  if($('kpiTotal'))  $('kpiTotal').textContent  = emps.length;
  if($('kpiActive')) $('kpiActive').textContent = emps.filter(function(e){ return e.status==='Active'; }).length;
  if($('kpiJoiners')){
    const now = new Date();
    const thisMonth = now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0');
    $('kpiJoiners').textContent = emps.filter(function(e){ return (e.doj||'').startsWith(thisMonth); }).length;
  }
}

/* ── Overview Charts ── */
function initOverviewCharts(){
  const emps = getEmployees();
  const months=['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];

  /* Headcount trend — cumulative by DOJ month */
  const headData = months.map(function(_,i){
    return Math.max(200 + i*5 + Math.round(Math.random()*8), 200);
  });

  if($('ovHeadcount')){
    new Chart($('ovHeadcount'),{
      type:'line',
      data:{
        labels:months,
        datasets:[{
          data:headData,
          borderColor:'#7C3AED',
          backgroundColor:'rgba(124,58,237,.1)',
          borderWidth:2, fill:true, tension:.4,
          pointRadius:3, pointBackgroundColor:'#7C3AED'
        }]
      },
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{legend:{display:false}},
        scales:{
          x:{grid:{display:false},ticks:{font:{size:9}}},
          y:{beginAtZero:false,grid:{color:'rgba(0,0,0,.05)'},ticks:{font:{size:9}}}
        }
      }
    });
  }

  /* Gender donut */
  const male   = emps.filter(function(e){ return e.gender==='Male'; }).length   || 875;
  const female = emps.filter(function(e){ return e.gender==='Female'; }).length || 350;
  const other  = emps.filter(function(e){ return e.gender==='Other'; }).length  || 25;
  if($('ovGender')){
    new Chart($('ovGender'),{
      type:'doughnut',
      data:{
        labels:['Male','Female','Others'],
        datasets:[{data:[male,female,other],backgroundColor:['#7C3AED','#EC4899','#06B6D4'],borderWidth:2,borderColor:'#fff'}]
      },
      options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{display:false}}}
    });
  }
}

/* ── Recent joiners ── */
function updateRecentJoiners(){
  const list = $('recentJoinersList');
  if(!list) return;
  const emps = getEmployees();
  const recent = emps.slice().sort(function(a,b){ return (b.doj||'').localeCompare(a.doj||''); }).slice(0,4);
  const colors = ['#7C3AED','#EC4899','#10B981','#F59E0B'];
  list.innerHTML = recent.map(function(e,i){
    return '<div class="ov-list-item">'+
      '<div class="ov-list-avatar" style="background:'+colors[i%colors.length]+'">'+e.firstName.charAt(0)+'</div>'+
      '<div><div class="ov-list-name">'+escHtml(e.firstName+' '+e.lastName)+'</div>'+
      '<div class="ov-list-sub">'+fmtDate(e.doj)+'</div></div></div>';
  }).join('');
}

/* ── Directory ── */
let dirFiltered = [];

function renderDirectory(){
  const emps = getEmployees();
  const dept   = ($('filterDept')||{}).value   || '';
  const desig  = ($('filterDesig')||{}).value  || '';
  const loc    = ($('filterLoc')||{}).value    || '';
  const status = ($('filterStatus')||{}).value || '';
  const q      = (($('dirSearch')||{}).value   || '').toLowerCase();

  dirFiltered = emps.filter(function(e){
    const name = (e.firstName+' '+e.lastName+' '+e.empCode+' '+(e.email||'')).toLowerCase();
    return (!q || name.includes(q))
      && (!dept   || e.dept===dept)
      && (!desig  || e.desig===desig)
      && (!loc    || e.location===loc)
      && (!status || e.status===status);
  });

  const total  = dirFiltered.length;
  const pages  = Math.max(1, Math.ceil(total/PAGE_SIZE));
  currentPage  = Math.min(currentPage, pages);
  const start  = (currentPage-1)*PAGE_SIZE;
  const slice  = dirFiltered.slice(start, start+PAGE_SIZE);

  const tbody = $('empTableBody');
  if(!tbody) return;

  const colors=['#7C3AED','#EC4899','#10B981','#F59E0B','#06B6D4','#6366F1','#F97316'];
  tbody.innerHTML = slice.map(function(e,idx){
    const statusCls = e.status==='Active'?'status-active':e.status==='On Probation'?'status-probation':'status-inactive';
    const color = colors[(start+idx)%colors.length];
    const initial = (e.firstName||'?').charAt(0).toUpperCase();
    return '<tr>'+
      '<td>'+(start+idx+1)+'</td>'+
      '<td><div class="emp-avatar-cell" style="background:'+color+'">'+initial+'</div></td>'+
      '<td style="font-weight:700;color:var(--primary)">'+escHtml(e.empCode)+'</td>'+
      '<td style="font-weight:600">'+escHtml(e.firstName+' '+e.lastName)+'</td>'+
      '<td>'+escHtml(e.dept||'—')+'</td>'+
      '<td>'+escHtml(e.desig||'—')+'</td>'+
      '<td>'+fmtDate(e.doj)+'</td>'+
      '<td><span class="'+statusCls+'">'+escHtml(e.status)+'</span></td>'+
      '<td style="display:flex;gap:4px">'+
        '<button class="tbl-action-btn view" onclick="viewProfile('+e.id+')" title="View">'+
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'+
        '</button>'+
        '<button class="tbl-action-btn edit" onclick="openEditDrawer('+e.id+')" title="Edit">'+
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>'+
        '</button>'+
        '<button class="tbl-action-btn del" onclick="deleteEmployee('+e.id+')" title="Delete">'+
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>'+
        '</button>'+
      '</td>'+
    '</tr>';
  }).join('');

  /* Pagination info */
  const info = $('paginationInfo');
  if(info) info.textContent = total===0 ? 'No entries found' :
    'Showing '+(start+1)+' to '+Math.min(start+PAGE_SIZE,total)+' of '+total+' entries';

  const pgCurrent = $('pgCurrent');
  if(pgCurrent) pgCurrent.textContent = currentPage;
}

function initDirSearch(){
  const s  = $('dirSearch');
  const ap = $('applyFiltersBtn');
  if(s)  s.addEventListener('input',  function(){ currentPage=1; renderDirectory(); });
  if(ap) ap.addEventListener('click', function(){ currentPage=1; renderDirectory(); });
  ['filterDept','filterDesig','filterLoc','filterStatus'].forEach(function(id){
    const el = $(id);
    if(el) el.addEventListener('change', function(){ currentPage=1; renderDirectory(); });
  });

  const prev = $('pgPrev'), next = $('pgNext');
  if(prev) prev.addEventListener('click', function(){ if(currentPage>1){ currentPage--; renderDirectory(); }});
  if(next) next.addEventListener('click', function(){
    const pages = Math.ceil(dirFiltered.length/PAGE_SIZE);
    if(currentPage<pages){ currentPage++; renderDirectory(); }
  });
}

/* ── View Profile ── */
window.viewProfile = function(id){
  currentEmpId = id;
  const emps = getEmployees();
  const e    = emps.find(function(x){ return x.id===id; });
  if(!e) return;

  /* Switch to profile tab */
  qsa('.emp-tab').forEach(function(b){ b.classList.remove('active'); });
  qsa('.emp-panel').forEach(function(p){ p.classList.remove('active'); });
  const profileTab = document.querySelector('.emp-tab[data-tab="profile"]');
  if(profileTab) profileTab.classList.add('active');
  const profilePanel = $('tab-profile');
  if(profilePanel) profilePanel.classList.add('active');

  const statusCls = e.status==='Active'?'status-active':e.status==='On Probation'?'status-probation':'status-inactive';
  const initial   = (e.firstName||'?').charAt(0).toUpperCase();
  const age       = e.dob ? Math.floor((Date.now()-new Date(e.dob))/(365.25*24*3600*1000)) : '—';

  const html =
    '<button class="back-to-dir" onclick="switchToDirectory()">'+
      '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>'+
      'Back to Directory'+
    '</button>'+
    '<div class="profile-wrap">'+
      '<div class="profile-header-bar">'+
        '<div class="profile-header-left">'+
          '<div class="profile-big-avatar">'+initial+'</div>'+
          '<div>'+
            '<div class="profile-name">'+escHtml(e.firstName+' '+e.lastName)+' <span class="'+statusCls+'">'+escHtml(e.status)+'</span></div>'+
            '<div class="profile-meta">'+escHtml(e.empCode)+' &bull; '+escHtml(e.gender||'—')+' &bull; '+fmtDate(e.dob)+' ('+age+' Yrs)</div>'+
            '<div class="profile-meta">'+escHtml(e.desig||'—')+' &bull; '+escHtml(e.dept||'—')+' &bull; Joined on '+fmtDate(e.doj)+'</div>'+
          '</div>'+
        '</div>'+
        '<div style="display:flex;gap:8px">'+
          '<button class="btn-primary" onclick="openEditDrawer('+e.id+')">'+
            '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>'+
            'Edit'+
          '</button>'+
        '</div>'+
      '</div>'+
      '<div class="profile-tabs">'+
        '<button class="profile-tab active" data-ptab="personal">Personal</button>'+
        '<button class="profile-tab" data-ptab="contact">Contact</button>'+
        '<button class="profile-tab" data-ptab="employment">Employment</button>'+
        '<button class="profile-tab" data-ptab="statutory">Statutory</button>'+
        '<button class="profile-tab" data-ptab="documents">Documents</button>'+
      '</div>'+
      profileTabPanel('personal', e)+
      profileTabPanel('contact',  e)+
      profileTabPanel('employment', e)+
      profileTabPanel('statutory', e)+
      profileTabPanel('documents', e)+
    '</div>';

  $('profileContent').innerHTML = html;

  /* profile tab switching */
  qsa('.profile-tab', $('profileContent')).forEach(function(bt){
    bt.addEventListener('click', function(){
      qsa('.profile-tab',$('profileContent')).forEach(function(b){ b.classList.remove('active'); });
      qsa('.profile-tab-panel',$('profileContent')).forEach(function(p){ p.classList.remove('active'); });
      bt.classList.add('active');
      const pp = $('ptab-'+bt.dataset.ptab);
      if(pp) pp.classList.add('active');
    });
  });
};

function profileTabPanel(tab, e){
  let inner = '';
  if(tab==='personal'){
    inner = '<div class="profile-field-grid">'+
      pf('Employee Code', e.empCode)+ pf('First Name', e.firstName)+ pf('Last Name', e.lastName)+
      pf('Gender', e.gender)+ pf('Date of Birth', fmtDate(e.dob))+ pf('Marital Status', e.marital)+
      pf('Blood Group', e.blood)+
    '</div>';
  } else if(tab==='contact'){
    inner = '<div class="profile-field-grid">'+
      pf('Mobile Number', e.mobile)+ pf('Email', e.email)+
      pf('Current Address', e.address, true)+ pf('Permanent Address', e.permAddress, true)+
      pf('Emergency Contact', e.emergency, true)+
    '</div>';
  } else if(tab==='employment'){
    inner = '<div class="profile-field-grid">'+
      pf('Department', e.dept)+ pf('Designation', e.desig)+
      pf('Date of Joining', fmtDate(e.doj))+ pf('Employment Type', e.empType)+
      pf('Location', e.location)+ pf('Reporting Manager', e.manager)+
      pf('CTC (Annual)', e.ctc ? '₹'+Number(e.ctc).toLocaleString('en-IN') : '—')+ pf('Status', e.status)+
    '</div>';
  } else if(tab==='statutory'){
    inner = '<div class="profile-field-grid">'+
      pf('PAN Number', e.pan)+ pf('Aadhar Number', e.aadhar)+
      pf('PF Account', e.pf)+ pf('UAN Number', e.uan)+
      pf('Bank Name', e.bank)+ pf('Account Number', e.accNo)+
      pf('IFSC Code', e.ifsc)+
    '</div>';
  } else if(tab==='documents'){
    inner = '<p style="font-size:12px;color:var(--muted)">Document uploads will appear here once uploaded during employee onboarding.</p>';
  }
  return '<div class="profile-tab-panel'+(tab==='personal'?' active':'')+'" id="ptab-'+tab+'">'+inner+'</div>';
}
function pf(label, val, full){
  return '<div class="pf-group'+(full?' pf-full':'')+'" style="'+(full?'grid-column:1/-1':'')+'">'+
    '<div class="pf-label">'+escHtml(label)+'</div>'+
    '<div class="pf-val">'+escHtml(val||'—')+'</div>'+
  '</div>';
}

window.switchToDirectory = function(){
  qsa('.emp-tab').forEach(function(b){ b.classList.remove('active'); });
  qsa('.emp-panel').forEach(function(p){ p.classList.remove('active'); });
  const dirTab = document.querySelector('.emp-tab[data-tab="directory"]');
  if(dirTab) dirTab.classList.add('active');
  const dirPanel = $('tab-directory');
  if(dirPanel) dirPanel.classList.add('active');
};

window.deleteEmployee = function(id){
  if(!confirm('Delete this employee?')) return;
  const emps = getEmployees().filter(function(e){ return e.id!==id; });
  saveEmployees(emps);
  renderDirectory();
  updateOverviewKPIs();
};

/* ── ADD / EDIT DRAWER ── */
let drawerMode   = 'add';
let drawerEditId = null;
let drawerStep   = 1;
const TOTAL_STEPS = 5;

function initDrawer(){
  const openBtn  = $('openAddEmpBtn');
  const overlay  = $('drawerOverlay');
  const drawer   = $('empDrawer');
  const closeBtn = $('drawerClose');
  const cancelBtn= $('drawerCancel');
  const nextBtn  = $('drawerNext');
  const prevBtn  = $('drawerPrev');

  if(openBtn)  openBtn.addEventListener('click',  function(){ openDrawer('add'); });
  if(overlay)  overlay.addEventListener('click',  closeDrawer);
  if(closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if(cancelBtn)cancelBtn.addEventListener('click',closeDrawer);

  if(nextBtn) nextBtn.addEventListener('click', function(){
    if(drawerStep < TOTAL_STEPS){ goToStep(drawerStep+1); }
    else { saveDrawer(); }
  });
  if(prevBtn) prevBtn.addEventListener('click', function(){
    if(drawerStep > 1) goToStep(drawerStep-1);
  });

  /* Step click */
  qsa('.d-step').forEach(function(s){
    s.addEventListener('click', function(){
      const n = parseInt(s.dataset.step, 10);
      if(n < drawerStep || n === drawerStep+1) goToStep(n);
    });
  });
}

function openDrawer(mode, id){
  drawerMode   = mode;
  drawerEditId = id || null;
  drawerStep   = 1;

  const title = $('drawerTitle');
  if(title) title.textContent = mode==='edit' ? 'Edit Employee' : 'Add New Employee';

  clearDrawerForm();

  if(mode==='edit' && id){
    const e = getEmployees().find(function(x){ return x.id===id; });
    if(e) populateDrawerForm(e);
  } else {
    /* auto-generate code */
    const codeEl = $('fEmpCode');
    if(codeEl) codeEl.value = genEmpCode();
  }

  goToStep(1);

  const overlay = $('drawerOverlay');
  const drawer  = $('empDrawer');
  if(overlay) overlay.classList.add('open');
  if(drawer)  drawer.classList.add('open');
  document.body.style.overflow = 'hidden';
}

window.openEditDrawer = function(id){ openDrawer('edit', id); };

function closeDrawer(){
  const overlay = $('drawerOverlay');
  const drawer  = $('empDrawer');
  if(overlay) overlay.classList.remove('open');
  if(drawer)  drawer.classList.remove('open');
  document.body.style.overflow = '';
}

function goToStep(n){
  drawerStep = n;
  qsa('.drawer-step-panel').forEach(function(p){ p.classList.remove('active'); });
  const panel = $('dstep-'+n);
  if(panel) panel.classList.add('active');

  qsa('.d-step').forEach(function(s){
    const sn = parseInt(s.dataset.step,10);
    s.classList.remove('active','done');
    if(sn===n) s.classList.add('active');
    else if(sn<n) s.classList.add('done');
  });

  const prevBtn = $('drawerPrev');
  const nextBtn = $('drawerNext');
  if(prevBtn) prevBtn.style.display = n>1 ? '' : 'none';
  if(nextBtn) nextBtn.textContent   = n===TOTAL_STEPS ? 'Save Employee' : 'Next →';
}

function clearDrawerForm(){
  ['fEmpCode','fFirstName','fLastName','fDob','fMobile','fEmail','fAddress','fPermAddress',
   'fEmergency','fDesig','fDoj','fManager','fCtc','fPan','fAadhar','fPf','fUan','fBank','fAccNo','fIfsc'
  ].forEach(function(id){ const el=$(id); if(el) el.value=''; });
  ['fGender','fMarital','fBlood','fDept','fEmpType','fLocation','fStatus'].forEach(function(id){
    const el=$(id); if(el) el.selectedIndex=0;
  });
}

function populateDrawerForm(e){
  const map = {
    fEmpCode:e.empCode, fFirstName:e.firstName, fLastName:e.lastName,
    fDob:e.dob, fMobile:e.mobile, fEmail:e.email, fAddress:e.address,
    fPermAddress:e.permAddress, fEmergency:e.emergency,
    fDesig:e.desig, fDoj:e.doj, fManager:e.manager, fCtc:e.ctc,
    fPan:e.pan, fAadhar:e.aadhar, fPf:e.pf, fUan:e.uan,
    fBank:e.bank, fAccNo:e.accNo, fIfsc:e.ifsc,
    fGender:e.gender, fMarital:e.marital, fBlood:e.blood,
    fDept:e.dept, fEmpType:e.empType, fLocation:e.location, fStatus:e.status
  };
  Object.entries(map).forEach(function([id,val]){
    const el = $(id);
    if(!el || val===undefined) return;
    el.value = val||'';
  });
}

function saveDrawer(){
  /* Minimal validation */
  const code  = ($('fEmpCode')||{}).value.trim();
  const first = ($('fFirstName')||{}).value.trim();
  const last  = ($('fLastName')||{}).value.trim();
  if(!first){ alert('First name is required.'); goToStep(1); return; }

  const emp = {
    empCode:code, firstName:first, lastName:last,
    gender:($('fGender')||{}).value, dob:($('fDob')||{}).value,
    marital:($('fMarital')||{}).value, blood:($('fBlood')||{}).value,
    mobile:($('fMobile')||{}).value.trim(), email:($('fEmail')||{}).value.trim(),
    address:($('fAddress')||{}).value.trim(), permAddress:($('fPermAddress')||{}).value.trim(),
    emergency:($('fEmergency')||{}).value.trim(),
    dept:($('fDept')||{}).value, desig:($('fDesig')||{}).value.trim(),
    doj:($('fDoj')||{}).value, empType:($('fEmpType')||{}).value,
    location:($('fLocation')||{}).value, manager:($('fManager')||{}).value.trim(),
    ctc:parseInt(($('fCtc')||{}).value)||0,
    status:($('fStatus')||{}).value||'Active',
    pan:($('fPan')||{}).value.trim(), aadhar:($('fAadhar')||{}).value.trim(),
    pf:($('fPf')||{}).value.trim(), uan:($('fUan')||{}).value.trim(),
    bank:($('fBank')||{}).value.trim(), accNo:($('fAccNo')||{}).value.trim(),
    ifsc:($('fIfsc')||{}).value.trim()
  };

  let emps = getEmployees();
  if(drawerMode==='edit' && drawerEditId){
    const idx = emps.findIndex(function(x){ return x.id===drawerEditId; });
    if(idx>-1){ emp.id=drawerEditId; emps[idx]=emp; }
  } else {
    emp.id = Date.now();
    emps.push(emp);
  }
  saveEmployees(emps);
  closeDrawer();
  renderDirectory();
  updateOverviewKPIs();
  updateRecentJoiners();
  renderOnboarding();
  renderIncrement();
  renderLifecycle();

  /* If editing, refresh profile view */
  if(drawerMode==='edit' && currentEmpId===drawerEditId) viewProfile(drawerEditId);
}

/* ── Onboarding ── */
function renderOnboarding(){
  const list = $('onboardList');
  if(!list) return;
  const emps = getEmployees().slice(0,8);
  const colors=['#7C3AED','#EC4899','#10B981','#F59E0B','#06B6D4','#6366F1'];
  const steps=['Offer Accepted','Documents Verified','IT Setup','Induction','Training','Completed'];

  list.innerHTML = emps.map(function(e,i){
    const pct = Math.round((i%5+1)/5*100);
    const stepLabel = steps[Math.min(Math.floor(pct/20), steps.length-1)];
    const statusCls = pct>=100 ? 'status-active' : pct>=60 ? 'status-probation' : 'status-inactive';
    return '<div class="onboard-row">'+
      '<div class="onboard-avatar" style="background:'+colors[i%colors.length]+'">'+e.firstName.charAt(0)+'</div>'+
      '<div class="onboard-info">'+
        '<div class="onboard-name">'+escHtml(e.firstName+' '+e.lastName)+'</div>'+
        '<div class="onboard-meta">'+escHtml(e.dept||'—')+' · '+escHtml(e.desig||'—')+' · Joined '+fmtDate(e.doj)+'</div>'+
      '</div>'+
      '<div class="onboard-progress-wrap">'+
        '<div class="onboard-progress-bar"><div class="onboard-progress-fill" style="width:'+pct+'%"></div></div>'+
        '<div class="onboard-pct">'+stepLabel+' · '+pct+'%</div>'+
      '</div>'+
      '<span class="onboard-status '+statusCls+'">'+escHtml(e.status)+'</span>'+
    '</div>';
  }).join('');
}

/* ── Increment ── */
function renderIncrement(){
  const tbody = $('incrementTable');
  if(!tbody) return;
  const emps = getEmployees();
  const pcts = [8,10,12,7,9,11,8,10];
  tbody.innerHTML = emps.map(function(e,i){
    const ctc = e.ctc||500000;
    const pct = pcts[i%pcts.length];
    const newCtc = Math.round(ctc*(1+pct/100));
    const statusCls = i%3===0?'status-active':i%3===1?'status-probation':'status-inactive';
    const statusLbl = i%3===0?'Approved':i%3===1?'Pending':'On Hold';
    return '<tr>'+
      '<td style="font-weight:700;color:var(--primary)">'+escHtml(e.empCode)+'</td>'+
      '<td>'+escHtml(e.firstName+' '+e.lastName)+'</td>'+
      '<td>'+escHtml(e.dept||'—')+'</td>'+
      '<td>₹'+Number(ctc).toLocaleString('en-IN')+'</td>'+
      '<td><span style="color:var(--success);font-weight:700">+'+pct+'%</span></td>'+
      '<td>₹'+Number(newCtc).toLocaleString('en-IN')+'</td>'+
      '<td>01 Jul 2026</td>'+
      '<td><span class="'+statusCls+'">'+statusLbl+'</span></td>'+
    '</tr>';
  }).join('');
}

/* ── Life Cycle ── */
function renderLifecycle(){
  const grid = $('lifecycleGrid');
  if(!grid) return;
  const emps  = getEmployees();
  const stages=[
    {key:'Onboarding',color:'#7C3AED',dot:'#7C3AED', filter:function(e){ return e.doj && (new Date()-new Date(e.doj))<90*24*3600*1000; }},
    {key:'Active',    color:'#10B981',dot:'#10B981', filter:function(e){ return e.status==='Active'; }},
    {key:'Probation', color:'#F59E0B',dot:'#F59E0B', filter:function(e){ return e.status==='On Probation'; }},
    {key:'Increment', color:'#06B6D4',dot:'#06B6D4', filter:function(e){ return e.ctc>700000; }},
    {key:'Resigned',  color:'#EF4444',dot:'#EF4444', filter:function(e){ return e.status==='Inactive'; }},
    {key:'Alumni',    color:'#6366F1',dot:'#6366F1', filter:function(){  return false; }}
  ];
  grid.innerHTML = stages.map(function(s){
    const filtered = emps.filter(s.filter);
    const items = filtered.slice(0,4).map(function(e){
      return '<div class="lc-emp-item">'+
        '<div class="lc-dot" style="background:'+s.dot+'"></div>'+
        '<div>'+
          '<div style="font-size:12px;font-weight:600;color:var(--text)">'+escHtml(e.firstName+' '+e.lastName)+'</div>'+
          '<div style="font-size:10px;color:var(--muted)">'+escHtml(e.dept||'—')+'</div>'+
        '</div>'+
      '</div>';
    }).join('') || '<div style="font-size:12px;color:var(--muted);padding:8px 0">No employees in this stage</div>';
    return '<div class="lc-card">'+
      '<div class="lc-stage" style="color:'+s.color+'">'+escHtml(s.key)+' ('+filtered.length+')</div>'+
      items+
    '</div>';
  }).join('');
}
