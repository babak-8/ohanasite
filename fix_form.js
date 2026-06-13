const fs = require('fs');
let content = fs.readFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', 'utf8');

// 1. Center the toast notification
content = content.replace(
    /toast\.className = `flex items-center gap-3(.*?)`;/g,
    'toast.className = `flex flex-col items-center justify-center text-center gap-2$1`;'
);
content = content.replace(
    /toast\.innerHTML = `\$\{icon\} <span>\$\{message\}<\/span>`;/g,
    'toast.innerHTML = `<div class="flex items-center justify-center gap-2">${icon}</div> <span>${message}</span>`;'
);

// 2. Change the fetch endpoint to FormSubmit
let fetchReplacement = `        const payload = Object.fromEntries(formData);
        payload._subject = "Yeni Rezervasyon: " + (payload.name || "Müşteri");
        // Disable captcha
        payload._captcha = "false";
        
        fetch('https://formsubmit.co/ajax/babirapson19@gmail.com', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })`;

content = content.replace(
    /fetch\('index\.php', \{\s*method: 'POST',\s*body: formData\s*\}\)/g,
    fetchReplacement
);

// 3. Fix the response check for FormSubmit
content = content.replace(
    /if \(data\.status === 'success'\)/g,
    'if (data.success === "true" || data.status === "success")'
);

// Optional: Fix the container width to ensure text-center works perfectly on mobile
content = content.replace(
    /id="toast-container" class="([^"]*)"/g,
    'id="toast-container" class="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-4 z-50 flex flex-col gap-2 w-[90%] md:w-auto max-w-md items-center md:items-end"'
);

fs.writeFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', content, 'utf8');
console.log('Fixed email sending and centered toast.');
