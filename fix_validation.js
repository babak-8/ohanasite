const fs = require('fs');
let content = fs.readFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', 'utf8');

// 1. Remove required attributes from form inputs
content = content.replace(/name="name" required/g, 'name="name"');
content = content.replace(/name="phone" required/g, 'name="phone"');
content = content.replace(/name="date" required/g, 'name="date"');
content = content.replace(/name="time" required/g, 'name="time"');
content = content.replace(/name="guests" required/g, 'name="guests"');
// seating never had required, but let's be safe
content = content.replace(/name="seating" required/g, 'name="seating"');

// 2. Add validateReservationForm function before the form submit listener
const validateFn = `
    function validateReservationForm(form) {
        let isValid = true;
        const fields = ['name', 'phone', 'date', 'time', 'guests', 'seating'];
        
        // Clear previous errors
        form.querySelectorAll('.error-text').forEach(el => {
            el.classList.add('hidden');
            el.innerText = '';
        });
        form.querySelectorAll('input, select, textarea').forEach(el => {
            el.classList.remove('border-red-500');
        });

        fields.forEach(field => {
            const input = form.querySelector(\`[name="\${field}"]\`);
            if (input && !input.value.trim()) {
                isValid = false;
                const errSpan = document.getElementById('err-' + field);
                if (errSpan) {
                    const errMsgKey = 'err_' + field;
                    errSpan.setAttribute('data-i18n', errMsgKey);
                    errSpan.innerText = i18n[currentLang][errMsgKey] || 'Zorunlu alan';
                    errSpan.classList.remove('hidden');
                    input.classList.add('border-red-500');
                }
            }
        });

        if (!isValid) {
            showToast(i18n[currentLang]['toast_err_form'] || 'Lütfen formdaki hataları düzeltin.', 'error');
        }
        
        return isValid;
    }

    form.addEventListener('submit', function(e) {`;

content = content.replace(/form\.addEventListener\('submit',\s*function\(e\)\s*\{/g, validateFn);

// 3. In the submit listener, return early if validation fails
content = content.replace(
    /const formData = new FormData\(this\);/g,
    `if (!validateReservationForm(this)) {
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
            return;
        }
        
        const formData = new FormData(this);`
);

// 4. Update the WhatsApp button to use the new validation
content = content.replace(
    /if \(resForm\.checkValidity\(\)\)/g,
    'if (validateReservationForm(resForm))'
);
content = content.replace(
    /else \{\s*resForm\.reportValidity\(\);\s*\}/g,
    '' // The validateReservationForm already shows the errors, so we don't need reportValidity
);

// 5. Fix corrupted Russian dictionary errors
content = content.replace(/err_name:\s*"\?+.*?",/g, 'err_name: "Пожалуйста, введите ваше полное имя.",');
content = content.replace(/err_phone:\s*"\?+.*?",/g, 'err_phone: "Пожалуйста, введите действительный номер телефона.",');
content = content.replace(/err_date:\s*"\?+.*?",/g, 'err_date: "Пожалуйста, выберите дату.",');
content = content.replace(/err_time:\s*"\?+.*?",/g, 'err_time: "Пожалуйста, выберите время.",');
content = content.replace(/err_guests:\s*"\?+.*?",/g, 'err_guests: "Пожалуйста, выберите количество гостей.",');
content = content.replace(/err_seating:\s*"\?+.*?",/g, 'err_seating: "Пожалуйста, выберите предпочтение по местам.",');
content = content.replace(/toast_err_form:\s*"\?+.*?",/g, 'toast_err_form: "Пожалуйста, исправьте ошибки в форме.",');
content = content.replace(/toast_err_server:\s*"\?+.*?"/g, 'toast_err_server: "Не удалось связаться с сервером. Пожалуйста, попробуйте еще раз."');

fs.writeFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', content, 'utf8');
console.log('Fixed manual validation.');
