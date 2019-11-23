class ScaleUtil {
    contructor(original_width, original_height, new_width, new_height) {
        this.width_ratio = new_width / original_width ;
        this.height_ratio =  new_height / original_height;
    }

    scaleWidth = (old_x) => this.width_ratio * old_x;

    scaleHeight = (old_y) => this.height_ratio * old_y;
}

function GenHTML(form_obj, fields_arr, new_dimension) {
    const scale_util = new ScaleUtil(
        form_obj.dimension.width, form_obj.dimension.height,
        new_dimension.width, new_dimension.height);

    //loop over all pages    
    form_pages.reduce(
        (acc, page_obj, page_no) => {

            acc += genOpenPageDiv(page_obj.id, page_obj.url);
            
            //loop over all fields
            acc += fields_arr.reduce(
                (acc, field_obj) => {
                    //only process fields in current page
                    if(field_obj.page_number === page_no) {
                        acc += genField(field_obj);
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
}

function genField(field_obj) {
    var width = field_obj.top_right.x - field_obj.bottom_left.x;
    var height = field_obj.top_right.y - field_obj.bottom_left.y;
    var top = field_obj.top_right.y;
    var left = field_obj.bottom_left.x;
    return `
        <svg id="${field_obj.id}" class="text-box"
            style="top:${top}px;left:${left}px"  width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
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

        <style>
            .text-box {
                position: absolute;
            }
        </style>
    `
}
