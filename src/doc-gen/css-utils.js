function genOpenPageDiv(id, bg_image_url) {
    return `
        <div
            id="${id}"
            background_img:"${bg_image_url}"
            class="page"
        >       
    `
}

function getSharedPrintableStyles(page_style) {
    return `
        <stlye>
            @media print {
                ${page_style}
            }
        </style>
    `
}

function getPageCSS(width, height, margin_left=0, margin_top=0, margin_right=0, margin_bottom=0) {
    return `
        .page {
            width: ${width};
            height: ${height};
            margin: ${margin_left} ${margin_top} ${margin_right} ${margin_bottom};
        }
    `
}
