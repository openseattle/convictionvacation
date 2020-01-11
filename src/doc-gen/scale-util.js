const width_units = "in";

class ScaleUtil {
    constructor(original_width, original_height, new_width, new_height) {
        this.width_ratio = new_width / original_width ;
        this.height_ratio =  new_height / original_height;
        this.new_height = new_height;
        this.new_width = new_width;
    }

    scaleWidth(old_x) {return this.width_ratio * old_x};

    scaleHeight(old_y) {return this.height_ratio * old_y};

    getPageOffset(page_number) {
        return (page_number) * this.new_height;
    }

    getNewXOffset(page_number, old_x_offset) { 
        return this.getPageOffset(page_number) + this.scaleWidth(old_x_offset);
    }

    getNewYOffset(page_number, old_y_offset) {
        return this.getPageOffset(page_number) + this.scaleHeight(old_y_offset);
    }
}

function GenHTML(form_obj, fields_arr, new_dimension) {
    const scale_util = new ScaleUtil(
        form_obj.dimension.width, form_obj.dimension.height,
        new_dimension.width, new_dimension.height);
    
    //loop over all pages    
    const pages = form_obj.pages.reduce(
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

    const shared_styles = getSharedPrintableStyles(getPageCSS(new_dimension.width, new_dimension.height))

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
    var height = scale_util.scaleHeight(field_obj.bottom_left.y - field_obj.top_right.y);
    var top = scale_util.getNewYOffset(field_obj.page_number, field_obj.top_right.y);
    var left = scale_util.getNewXOffset(field_obj.page_number, field_obj.bottom_left.x);
    return `
        <svg class="text-box"
            style="top:${top}${width_units};left:${left}${width_units}"  width="${width}${width_units}" height="${height}${width_units}">
            <text id="${field_obj.id}" x="0" y="75%">
                <!-- populate value here -->
                content
            </text>
        </svg>
        `
}

function genOpenPageDiv(id, bg_image_url) {
    return `
        <div
            id="${id}"
            class="page"
        >
            <img src="${bg_image_url}">
    `
}


function getSharedPrintableStyles(page_style) {
    return `
        <style>
            ${page_style}
            ${getTextBoxCSS()}
            ${getImgCSS()}
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
            width: ${width}${width_units};
            height: ${height}${width_units};
            position: relative;
            display: inline-block;
        }
    `
}

function getImgCSS() {
    return `
        img {
            max-width: 100%;
            max-height: 100%;
        }
    `
}


var oldDim = {width: 1700, height: 2200};
var newDim = {width: 1700/200, height: 2200/200};

var pages = [
    {
        id:"09.15",
        url:"./sample.png"
    }
];

var fields = [
    {
        id:"court",
        bottom_left: {
            x: 3,
            y: 6
        },
        top_right: {
            x: 7,
            y: 4
        },
        page_number: 0
    },
    {
        id:"convicteeName",
        bottom_left: {
            x: 228,
            y: 824
        },
        top_right: {
            x: 808,
            y: 756
        },
        page_number: 0
    },
    {
        id:"plaintiff",
        bottom_left: {
            x: 224,
            y: 728
        },
        top_right: {
            x: 796,
            y: 672
        },
        page_number: 0
    },
    {
        id:"defendant",
        bottom_left: {
            x: 228,
            y: 820
        },
        top_right: {
            x: 812,
            y: 752
        },
        page_number: 0
    },
    {
        id:"countyClerkName",
        bottom_left: {
            x: 584,
            y: 932
        },
        top_right: {
            x: 1012,
            y: 912
        },
        page_number: 0
    },
    {
        id:"countyName",
        bottom_left: {
            x: 320,
            y: 1056
        },
        top_right: {
            x: 764,
            y: 1020
        },
        page_number: 0
    },
    {
        id:"courtName",
        bottom_left: {
            x: 260,
            y: 1280
        },
        top_right: {
            x: 784,
            y: 1240
        },
        page_number: 0
    },
    {
        id:"hearingDate",
        bottom_left: {
            x: 568,
            y: 1224
        },
        top_right: {
            x: 1032,
            y: 1184
        },
        page_number: 0
    },
    {
        id:"hearingTime",
        bottom_left: {
            x: 1116,
            y: 1228
        },
        top_right: {
            x: 1276,
            y: 1184
        },
        page_number: 0
    },
    {
        id:"hearingAmorPm",
        bottom_left: {
            x: 1240,
            y: 1228
        },
        top_right: {
            x: 1292,
            y: 1196
        },
        page_number: 0
    },
    {
        id:"dateOfSubmission",
        bottom_left: {
            x: 304,
            y: 1488
        },
        top_right: {
            x: 776,
            y: 1416
        },
        page_number: 0
    },
    {
        id:"attorneyName",
        bottom_left: {
            x: 864,
            y: 1520
        },
        top_right: {
            x: 1112,
            y: 1464
        },
        page_number: 0
    },
    {
        id:"attorneyWsbaNumber",
        bottom_left: {
            x: 1184,
            y: 1520
        },
        top_right: {
            x: 1412,
            y: 1464
        },
        page_number: 0
    },
    
]

var form = {
    dimension: oldDim,
    pages: pages
}

console.log(GenHTML(form, fields, newDim));