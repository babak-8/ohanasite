const fs = require('fs');
let content = fs.readFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', 'utf8');

// Find the block starting at resForm.addEventListener("submit" and ending at resForm.reportValidity(),
// and replace it with the new logic.

const regex = /resForm\.addEventListener\("submit"[\s\S]*?resForm\.reportValidity\(\),\s*\);/m;

const replacement = `const waBtn = document.getElementById("wa-btn");
        if (waBtn) {
          waBtn.addEventListener("click", () => {
            if (resForm.checkValidity()) {
              const formData = new FormData(resForm);
              const message = \`Merhaba, rezervasyon yaptırmak istiyorum.\\n\\n*İsim:* \${formData.get("name")}\\n*Telefon:* \${formData.get("phone")}\\n*Tarih:* \${formData.get("date")}\\n*Saat:* \${formData.get("time")}\\n*Kişi Sayısı:* \${formData.get("guests")}\\n*Oturma Tercihi:* \${formData.get("seating") === "outdoor" ? "Dışarıda" : "İçeride"}\\n*Notlar:* \${formData.get("notes") ? formData.get("notes") : "Yok"}\`;
              window.open(\`https://wa.me/905303831317?text=\${encodeURIComponent(message)}\`, "_blank");
            } else {
              resForm.reportValidity();
            }
          });
        }`;

content = content.replace(regex, replacement);

fs.writeFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', content, 'utf8');
console.log('WhatsApp listener fixed.');
