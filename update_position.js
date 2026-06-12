const fs = require('fs');
let content = fs.readFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', 'utf8');

// Replace object-cover with object-cover object-[center_30%] to shift the image down and show more of the top.
// Or if they mean show more of the bottom, object-[center_70%]. "aşağı getir" usually means move the physical image down.
content = content.replace(
    /class="w-full h-80 md:h-\[480px\] object-cover"/g,
    'class="w-full h-80 md:h-[480px] object-cover object-[center_35%]"'
);

// Wait, what if they meant show more of the bottom? I will just use 35% and if they want it the other way, I'll adjust it.
// Wait, "görüş açısı" means field of view / camera angle. Moving the camera angle down means pointing the camera at the floor. Pointing at the floor means seeing the bottom.
// So let's use object-[center_75%] to show the bottom? 
// Actually, if they say "bring the photo down", they want the photo moved down, showing the top.
// I will use `object-[center_25%]` which moves the photo down, showing the top sign.
content = content.replace(
    /object-\[center_35%\]"/g,
    'object-[center_25%]"'
);

fs.writeFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', content, 'utf8');
console.log('Updated object-position');
