// Loader s animovanými texty a simulací načítání
const loaderSteps = [
    { text: 'Inicializace spojení...', time: 900 },
    { text: 'Navazování šifrovaného kanálu...', time: 1200 },
    { text: 'Ověřování identity serveru...', time: 1100 },
    { text: 'Načítání databázových struktur...', time: 1300 },
    { text: 'Přístupová práva: KONTROLA...', time: 900 },
    { text: 'Přístup povolen. Spouštění rozhraní...', time: 1000 }
];

window.onload = function() {
    const loader = document.getElementById('loader');
    const progress = document.querySelector('.loader-progress');
    const loaderText = document.getElementById('loaderText');
    const loaderFooter = document.getElementById('loaderFooter');
    let percent = 0;
    let step = 0;
    function nextStep() {
        if (step < loaderSteps.length) {
            loaderText.textContent = loaderSteps[step].text;
            percent += Math.floor(100 / loaderSteps.length);
            progress.style.width = percent + '%';
            loaderFooter.textContent = `[LOG] ${loaderSteps[step].text}`;
            setTimeout(() => {
                step++;
                nextStep();
            }, loaderSteps[step].time);
        } else {
            progress.style.width = '100%';
            loaderText.textContent = 'Přístup povolen.';
            loaderFooter.textContent = '[LOG] Přesměrování na přihlášení...';
            setTimeout(() => {
                loader.style.display = 'none';
                document.getElementById('login').style.display = 'flex';
            }, 900);
        }
    }
    nextStep();
};

// Přihlašování
const users = [
    { name: 'Jinx', pin: '2811' },
    { name: 'Jesster', pin: '1128' }
];


let loggedUser = null;
let currentFolder = null;

// Efekt psacího stroje
function typeWriter(element, text, speed = 28, callback) {
    element.textContent = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    // Lokace
    const locationsBtn = document.getElementById('locationsBtn');
    const locationsSection = document.getElementById('locationsSection');
    // Správa CCD
    const adminBtn = document.getElementById('adminBtn');
    const adminSection = document.getElementById('adminSection');
    const sendMsgBtn = document.getElementById('sendMsgBtn');
    const modalSendMsg = document.getElementById('modalSendMsg');
    const sendMsgForm = document.getElementById('sendMsgForm');
    const form = document.getElementById('loginForm');
    const errorDiv = document.getElementById('loginError');
    const main = document.getElementById('main');
    const login = document.getElementById('login');
    const welcomeText = document.getElementById('welcomeText');
    const backBtn = document.getElementById('backBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const foldersBtn = document.getElementById('foldersBtn');
    const foldersSection = document.getElementById('foldersSection');
    const foldersList = document.getElementById('foldersList');
    const requestFolderBtn = document.getElementById('requestFolderBtn');
    const modalRequestFolder = document.getElementById('modalRequestFolder');
    const requestFolderForm = document.getElementById('requestFolderForm');
    const folderContentSection = document.getElementById('folderContentSection');
    const folderTitle = document.getElementById('folderTitle');
    const folderContent = document.getElementById('folderContent');
    const requestAddonBtn = document.getElementById('requestAddonBtn');
    const modalRequestAddon = document.getElementById('modalRequestAddon');
    const requestAddonForm = document.getElementById('requestAddonForm');
    const tasksBtn = document.getElementById('tasksBtn');

    // Přihlášení
    form.onsubmit = function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const pin = document.getElementById('pin').value.trim();
        const user = users.find(u => u.name === username && u.pin === pin);
        if (user) {
            loggedUser = user;
            login.style.display = 'none';
            main.style.display = 'flex';
            typeWriter(welcomeText, `Vítej, ${user.name}! Vyber akci:`);
            errorDiv.textContent = '';
            if (adminBtn) {
                if (user.name === 'Jinx' || user.name === 'Jesster') {
                    adminBtn.style.display = '';
                } else {
                    adminBtn.style.display = 'none';
                }
            }
        } else {
            errorDiv.textContent = 'Neplatné jméno nebo PIN!';
        }
    };
    // Správa CCD tlačítko
    if (adminBtn) {
        adminBtn.onclick = function() {
            foldersSection.style.display = 'none';
            folderContentSection.style.display = 'none';
            welcomeText.style.display = 'none';
            tasksBtn.style.display = 'none';
            foldersBtn.style.display = 'none';
            adminSection.style.display = '';
        };
    }

    // Pošli zprávu (modal)
    if (sendMsgBtn) {
        sendMsgBtn.onclick = function() {
            modalSendMsg.style.display = 'flex';
        };
    }
    if (sendMsgForm) {
        sendMsgForm.onsubmit = function(e) {
            e.preventDefault();
            const webhookUrl = document.getElementById('webhookUrl').value.trim();
            const msgText = document.getElementById('msgText').value.trim();
            const msgFile = document.getElementById('msgFile').files[0];
            // Krásný embed
            const embed = {
                embeds: [{
                    title: '💬 Nová zpráva z ClowCrew Databáze',
                    description: msgText,
                    color: 0x00ffb3,
                    footer: { text: `ClowCrew MDT • Odeslal: ${loggedUser ? loggedUser.name : 'neznámý'}` },
                    timestamp: new Date().toISOString()
                }]
            };
            if (msgFile) {
                const formData = new FormData();
                formData.append('file', msgFile);
                formData.append('payload_json', JSON.stringify({ username: 'ClowCrew Databáze', embeds: embed.embeds }));
                fetch(webhookUrl, {
                    method: 'POST',
                    body: formData
                });
            } else {
                fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: 'ClowCrew Databáze', embeds: embed.embeds })
                });
            }
            closeModal('modalSendMsg');
            sendMsgForm.reset();
            alert('Zpráva byla odeslána.');
        };
    }

    // Zpět na hlavní menu
    if (backBtn) {
        backBtn.onclick = function() {
            foldersSection.style.display = 'none';
            folderContentSection.style.display = 'none';
            if (adminSection) adminSection.style.display = 'none';
            if (locationsSection) locationsSection.style.display = 'none';
            welcomeText.style.display = '';
            tasksBtn.style.display = '';
            foldersBtn.style.display = '';
            if (adminBtn && loggedUser && (loggedUser.name === 'Jinx' || loggedUser.name === 'Jesster')) {
                adminBtn.style.display = '';
            } else if (adminBtn) {
                adminBtn.style.display = 'none';
            }
        };
    }
    // Odhlásit se
    if (logoutBtn) {
        logoutBtn.onclick = function() {
            main.style.display = 'none';
            login.style.display = 'flex';
            form.reset();
            loggedUser = null;
            currentFolder = null;
            foldersSection.style.display = 'none';
            folderContentSection.style.display = 'none';
            if (adminSection) adminSection.style.display = 'none';
            welcomeText.style.display = '';
            tasksBtn.style.display = '';
            foldersBtn.style.display = '';
            if (adminBtn) adminBtn.style.display = 'none';
        };
    }

    // Složky - zobrazit sekci složek
    if (foldersBtn) {
        foldersBtn.onclick = function() {
            foldersSection.style.display = '';
            folderContentSection.style.display = 'none';
            if (adminSection) adminSection.style.display = 'none';
            if (locationsSection) locationsSection.style.display = 'none';
            welcomeText.style.display = 'none';
            tasksBtn.style.display = 'none';
            foldersBtn.style.display = 'none';
            if (adminBtn) adminBtn.style.display = 'none';
        };
    }

    // Žádost o složku - otevřít modální okno
    if (requestFolderBtn) {
        requestFolderBtn.onclick = function() {
            modalRequestFolder.style.display = 'flex';
        };
    }

    // Odeslání žádosti o složku
    if (requestFolderForm) {
        requestFolderForm.onsubmit = function(e) {
            e.preventDefault();
            const folderName = document.getElementById('folderName').value.trim();
            const folderReason = document.getElementById('folderReason').value.trim();
            if (!folderName || !folderReason) return;
            const embed = {
                username: 'ClowCrew Databáze',
                embeds: [{
                    title: '📁 Žádost o složku',
                    description: `Uživatel **${loggedUser ? loggedUser.name : 'neznámý'}** žádá o vytvoření složky s názvem **${folderName}**\n**Důvod:** ${folderReason}`,
                    color: 0x00ffb3,
                    footer: { text: 'ClowCrew MDT • Automatická žádost' },
                    timestamp: new Date().toISOString()
                }]
            };
            fetch('https://discord.com/api/webhooks/1486805284537110691/FSmwXgfZNTyUERk1rt_kP3IszMvntGDGDnldjGmhfJCnuYwQ_VCrNoWdHbWp871-0o84', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(embed)
            });
            closeModal('modalRequestFolder');
            requestFolderForm.reset();
            alert('Žádost byla odeslána.');
        };
    }

    // Kliknutí na složku - zobrazit obsah složky
    if (foldersList) {
        foldersList.addEventListener('click', function(e) {
            if (e.target.classList.contains('folderBtn')) {
                currentFolder = e.target.dataset.folder;
                foldersSection.style.display = 'none';
                folderContentSection.style.display = '';
                folderTitle.textContent = `Složka: ${currentFolder}`;
                // Obsah složek s efektem psacího stroje
                if (currentFolder === 'lsc') {
                    typeWriter(folderContent, 'Španělský přízvuk u Personálu');
                } else {
                    typeWriter(folderContent, 'Získáváme informace.');
                }
            }
        });
    }

    // Žádost o dodatek - otevřít modální okno
    if (requestAddonBtn) {
        requestAddonBtn.onclick = function() {
            modalRequestAddon.style.display = 'flex';
        };
    }

    // Odeslání žádosti o dodatek
    if (requestAddonForm) {
        requestAddonForm.onsubmit = function(e) {
            e.preventDefault();
            const addonText = document.getElementById('addonText').value.trim();
            const addonFile = document.getElementById('addonFile').files[0];
            const embed = {
                username: 'ClowCrew Databáze',
                embeds: [{
                    title: '📝 Žádost o dodatek',
                    description: `Uživatel **${loggedUser ? loggedUser.name : 'neznámý'}** žádá o úpravu či dodatek složky (${currentFolder}).\n**Doplňující informace:** ${addonText}`,
                    color: 0x00ffb3,
                    footer: { text: 'ClowCrew MDT • Automatická žádost' },
                    timestamp: new Date().toISOString()
                }]
            };
            if (addonFile) {
                const formData = new FormData();
                formData.append('file', addonFile);
                formData.append('payload_json', JSON.stringify(embed));
                fetch('https://discord.com/api/webhooks/1486806298350583922/3H1hIfUBvYa9O6_v2o0v5FkzInv-Sa6sqCxDMKlxIkXvDX0XztMO8T4pN6uiCIGYA4_3', {
                    method: 'POST',
                    body: formData
                });
            } else {
                fetch('https://discord.com/api/webhooks/1486806298350583922/3H1hIfUBvYa9O6_v2o0v5FkzInv-Sa6sqCxDMKlxIkXvDX0XztMO8T4pN6uiCIGYA4_3', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(embed)
                });
            }
            closeModal('modalRequestAddon');
            requestAddonForm.reset();
            alert('Žádost byla odeslána.');
        };
    }

    // Úkoly - zatím pouze návrat na hlavní menu
    if (tasksBtn) {
        tasksBtn.onclick = function() {
            foldersSection.style.display = 'none';
            folderContentSection.style.display = 'none';
            if (adminSection) adminSection.style.display = 'none';
            if (locationsSection) locationsSection.style.display = 'none';
            welcomeText.style.display = '';
            tasksBtn.style.display = '';
            foldersBtn.style.display = '';
            if (adminBtn && loggedUser && (loggedUser.name === 'Jinx' || loggedUser.name === 'Jesster')) {
                adminBtn.style.display = '';
            }
        };
    }

    // Lokace - zobrazit sekci
    if (locationsBtn) {
        locationsBtn.onclick = function() {
            if (foldersSection) foldersSection.style.display = 'none';
            if (folderContentSection) folderContentSection.style.display = 'none';
            if (adminSection) adminSection.style.display = 'none';
            if (welcomeText) welcomeText.style.display = 'none';
            if (tasksBtn) tasksBtn.style.display = 'none';
            if (foldersBtn) foldersBtn.style.display = 'none';
            if (adminBtn) adminBtn.style.display = 'none';
            if (locationsSection) locationsSection.style.display = '';
        };
    }
});
