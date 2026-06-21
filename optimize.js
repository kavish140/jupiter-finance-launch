import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

// 1. Add width/height to all logo imgs
walk('src', (filePath) => {
    if (filePath.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;

        // Replace w-8 h-8
        content = content.replace(
            /<img src="\/favicon\.png" alt="Jupiter Finance Logo" className="w-8 h-8 rounded-full" \/>/g,
            '<img src="/favicon.png" alt="Jupiter Finance Logo" className="w-8 h-8 rounded-full" width={32} height={32} />'
        );
        // Replace w-6 h-6
        content = content.replace(
            /<img src="\/favicon\.png" alt="Jupiter Finance Logo" className="w-6 h-6 rounded-full" \/>/g,
            '<img src="/favicon.png" alt="Jupiter Finance Logo" className="w-6 h-6 rounded-full" width={24} height={24} />'
        );

        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
});

// 2. StructuredData.tsx update
let sdPath = 'src/components/StructuredData.tsx';
let sd = fs.readFileSync(sdPath, 'utf8');
if (!sd.includes('postalCode')) {
    sd = sd.replace(
        'areaServed: serviceAreas,',
        'areaServed: serviceAreas,\n    address: {\n      "@type": "PostalAddress",\n      addressLocality: "Mulund",\n      addressRegion: "Maharashtra",\n      postalCode: "400080",\n      addressCountry: "IN"\n    },'
    );
    fs.writeFileSync(sdPath, sd, 'utf8');
}

// 3. HeroSection.tsx update
let hsPath = 'src/components/HeroSection.tsx';
let hs = fs.readFileSync(hsPath, 'utf8');
if (!hs.includes('fetchPriority')) {
    hs = hs.replace(
        /<img\s+src={heroBg}\s+alt="Financial growth abstract"\s+className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"\s*\/>/g,
        '<img\n          src={heroBg}\n          alt="Financial growth abstract"\n          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"\n          fetchPriority="high"\n          loading="eager"\n        />'
    );
    fs.writeFileSync(hsPath, hs, 'utf8');
}

console.log("Optimization complete");
