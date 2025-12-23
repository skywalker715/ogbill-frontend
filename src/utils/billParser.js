export function parseBillText(text) {
    // Florence-2 might return all text in one line or split by newlines.
    // We treat the whole text as a single buffer to be safe.
    // Regex matches: (Name - non-digits and spaces) + (Optional Space) + (Price - decimal)
    // We use a lookahead or non-greedy match for the name.

    // Pattern: 
    // Group 1: Name (detected as non-digit characters, allowing symbols like . or - if part of name, but stop at price)
    // Group 2: Price
    const itemRegex = /([^\d\n]+?)\s*(\d+\.\d{2})/g;

    const items = [];

    // Clean text: remove newlines to treat as stream, or keep them. 
    // Let's rely on matchAll scanning the whole string.
    const matches = text.matchAll(itemRegex);

    for (const match of matches) {
        let name = match[1].trim();
        const price = parseFloat(match[2]);

        // Filter out common non-item lines
        const lowerName = name.toLowerCase();
        if (lowerName.includes('total')) continue;
        if (lowerName.includes('tax')) continue;
        if (lowerName.includes('subtotal')) continue;
        if (lowerName.includes('amount')) continue;
        if (lowerName.includes('balance')) continue;

        // Cleanup noise from name (e.g. leading special chars)
        name = name.replace(/^[^a-zA-Z0-9]+/, '');

        if (name.length > 1 && !isNaN(price) && price > 0) {
            items.push({ name, price, quantity: 1 });
        }
    }

    return items;
}
