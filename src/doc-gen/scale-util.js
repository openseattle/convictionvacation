class ScaleUtil {
    contructor(original_width, original_height, new_width, new_height) {
        this.width_ratio = new_width / original_width ;
        this.height_ratio =  new_height / original_height;
        this.new_height = new_height;
        this.new_width = new_width;
    }

    scaleWidth = (old_x) => this.width_ratio * old_x;

    scaleHeight = (old_y) => this.height_ratio * old_y;

    getPageOffset = (page_number) => 
                        (page_number + 1) * new_height; //page_number is 0 indexed

    getNewXOffset = (page_number, old_x_offset) => 
                        getPageOffset(page_number) + this.scaleWidth(old_x_offset);

    getNewYOffset = (page_number, old_y_offset) => 
                        getPageOffset(page_number) + this.scaleHeight(old_y_offset);
}

function GenHTML(form_obj, fields_arr, new_dimension) {
    const scale_util = new ScaleUtil(
        form_obj.dimension.width, form_obj.dimension.height,
        new_dimension.width, new_dimension.height);
    
    //loop over all pages    
    const pages = form_pages.reduce(
            (acc, page_obj, page_no) => {

                acc += genOpenPageDiv(page_obj.id, page_obj.url);
                
                //loop over all fields
                acc += fields_arr.reduce(
                    (acc, field_obj) => {
                        //only process fields in current page
                        if(field_obj.page_number === page_no) {
                            acc += genField(field_obj, scale_util);
                        }
                        return acc;
                    },
                    ""
                );
                acc += "</div>"
                return acc;
            },
            ""
    )

    const body = `
        <body>
            ${pages}
        </body>
    `;

    const shared_styles = getSharedPrintableStyles(getPageCSS(dimension.width, dimension.height))

    const html = `
        <html>
            ${shared_styles}
            ${body}
        </html>
    `

    return html;
}

function genField(field_obj, scale_util) {
    var width = scale_util.scaleWidth(field_obj.top_right.x - field_obj.bottom_left.x);
    var height = scale_util.scaleHeight(field_obj.top_right.y - field_obj.bottom_left.y);
    var top = scale_util.getNewYOffset(field_obj.page_no, field_obj.top_right.y);
    var left = scale_util.getNewXOffset(field_obj.page_no, field_obj.bottom_left.x);
    return `
        <svg id="${field_obj.id}" class="text-box"
            style="top:${top}px;left:${left}px"  width="${width}in" height="${height}in" viewBox="0 0 ${width}in ${height}in">
            <text x="0" y="75%" textLength="100%">
                <!-- populate value here -->
            </text>
        </svg>
        `
}

function genOpenPageDiv(id, bg_image_url) {
    return `
        <div
            id="${id}",
            background_img:"${bg_image_url}"
        >
    `
}

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
                ${page_style},
                ${getTextBoxCSS()}
            }
        </style>
    `
}

function getTextBoxCSS() {
    return `
        .text-box {
            position: absolute;
        }
    `;
}

function getPageCSS(width, height) {
    return `
        .page {
            width: ${width}in;
            height: ${height}in;
        }
    `
}
