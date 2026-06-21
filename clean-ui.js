import fs from 'fs';
import path from 'path';

const keep = ['toaster.tsx', 'toast.tsx', 'sonner.tsx', 'tooltip.tsx', 'accordion.tsx', 'sheet.tsx'];
const uiDir = path.join('src', 'components', 'ui');

if (fs.existsSync(uiDir)) {
    fs.readdirSync(uiDir).forEach(f => {
        if (!keep.includes(f) && f.endsWith('.tsx')) {
            fs.unlinkSync(path.join(uiDir, f));
            console.log(`Deleted redundant unused file: ${f}`);
        }
    });
}
