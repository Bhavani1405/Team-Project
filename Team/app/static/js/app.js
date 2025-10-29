// LocalStorage Auth & Task Management
const usersKey = 'nexusboard_users';
const currentUserKey = 'nexusboard_current_user';

function getUsers(){ return JSON.parse(localStorage.getItem(usersKey)||'[]'); }
function setUsers(users){ localStorage.setItem(usersKey, JSON.stringify(users)); }
function getCurrentUser(){ return JSON.parse(localStorage.getItem(currentUserKey)); }
function setCurrentUser(user){ localStorage.setItem(currentUserKey, JSON.stringify(user)); }

// ----- Register -----
const registerForm = document.getElementById('registerForm');
if(registerForm){
    registerForm.addEventListener('submit', e=>{
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const users = getUsers();
        if(users.find(u=>u.username===username||u.email===email)){ alert('User exists'); return; }
        const user = {username,email,password}; users.push(user); setUsers(users);
        alert('Registered! Login now.'); window.location='.';
    });
}

// ----- Login -----
const loginForm = document.getElementById('loginForm');
if(loginForm){
    loginForm.addEventListener('submit', e=>{
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const users = getUsers();
        const user = users.find(u=>(u.username===username||u.email===username)&&u.password===password);
        if(!user){ alert('Invalid credentials'); return; }
        setCurrentUser(user); window.location='dashboard';
    });
}

// ----- Logout -----
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn) logoutBtn.addEventListener('click', ()=>{ localStorage.removeItem(currentUserKey); window.location='/'; });

// ----- Profile -----
const profileForm = document.getElementById('profileForm');
if(profileForm){
    const user=getCurrentUser(); if(!user) window.location='/';
    document.getElementById('profileUsername').value=user.username;
    document.getElementById('profileEmail').value=user.email;
    profileForm.addEventListener('submit', e=>{
        e.preventDefault();
        const users=getUsers(); const idx=users.findIndex(u=>u.username===user.username);
        users[idx].username=document.getElementById('profileUsername').value;
        users[idx].email=document.getElementById('profileEmail').value;
        setUsers(users); setCurrentUser(users[idx]); alert('Profile Updated!');
    });
}

// ----- Dashboard Tasks -----
const taskForm=document.getElementById('taskForm');
const taskBoard=document.getElementById('taskBoard');
if(taskForm && taskBoard){
    let tasks=JSON.parse(localStorage.getItem('tasks')||'[]');
    const user=getCurrentUser(); if(!user) window.location='/';
    document.getElementById('welcomeUser').innerText=`Welcome, ${user.username}`;
    function renderTasks(){
        taskBoard.innerHTML=''; tasks.filter(t=>t.user===user.username).forEach((t,i)=>{
            const div=document.createElement('div'); div.classList.add('task-card'); div.setAttribute('draggable',true);
            div.dataset.index=i; div.innerHTML=`<strong>${t.title}</strong><p>${t.desc}</p>`; taskBoard.appendChild(div);
        });
    }
    renderTasks();
    taskForm.addEventListener('submit', e=>{
        e.preventDefault();
        const title=document.getElementById('taskTitle').value;
        const desc=document.getElementById('taskDesc').value;
        tasks.push({title,desc,user:user.username});
        localStorage.setItem('tasks',JSON.stringify(tasks));
        taskForm.reset(); renderTasks();
    });
}

