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
    form_pages.reduce(
        (acc, page_obj, page_no) => {

            acc += genOpenPageDiv(page_obj.id, page_obj.url);
            
            //loop over all fields
            acc += fields_arr.reduce(
                (acc, field_obj) => {
                    //only process fields in current page
                    if(field_obj.page_number === page_no) {

                    }
                    return acc;
                },
                ""
            );
            acc += "</div>"
            return acc;
        },
        ""
    );
}