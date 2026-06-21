import fs from 'fs';

let data = JSON.parse(fs.readFileSync('src/data/posts.json', 'utf8'));

function linkify(text, phrase, url) {
    // Only replace if it's not already inside a markdown link bracket
    const regex = new RegExp(`(?<!\\[)(?<!\\[.*)(${phrase})(?!.*\\])(?!\\])`, 'i');
    return text.replace(regex, `[$1](${url})`);
}

data = data.map(post => {
    let body = post.body;
    
    // Core services
    body = linkify(body, 'home loan in Mumbai', '/home-loan');
    body = linkify(body, 'home loans in Mumbai', '/home-loan');
    body = linkify(body, 'home loan in Mulund', '/mulund-mumbai-loans');
    body = linkify(body, 'home loans in Mulund', '/mulund-mumbai-loans');
    
    // If specific Mulund/Mumbai phrases aren't found, link general ones
    if (!body.includes('](/home-loan)') && !body.includes('](/mulund-mumbai-loans)')) {
        body = linkify(body, 'home loan', '/home-loan');
    }

    body = linkify(body, 'Loan Against Property', '/loan-against-property');
    body = linkify(body, 'health insurance', '/health-insurance');
    body = linkify(body, 'Jupiter Finance', '/');
    
    post.body = body;
    return post;
});

fs.writeFileSync('src/data/posts.json', JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('Successfully injected internal links into posts.json');
