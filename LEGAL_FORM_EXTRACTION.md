## Form Image Filename Convention

`PREFIX_Number.Number_Legal_Form_Title_YYYY_MM_pgN.png`

e.g.
`CrRLJ_09.0870_Order_on_Motion_to_Vacate_conviction_marijuana_2019_07_pg1.png`

See example of form numbers and title in [Washington State Court Forms](https://www.courts.wa.gov/forms/?fa=forms.static&staticID=14)

## Form Image Extraction
### Mac OSX Instructions

1. Download the legal form browser
1. Open the downloaded PDF form in "Preview" app.
1. Click on File->Export, a window will pop up
1. Click on the "Format" dropdown menu, and select "PNG"
1. Change to "Resolution" to "200" "Pixel/Inch"
1. Click "Save"
1. Goto the "Finder" app, locate the newly export .PNG image file
1. Make copies of the .PNG file until there are the same number of files as the number of pages in the form
1. Rename the PNG according to the naming convention.
1. Reopen each copy of the PNG file in the "Preview" app then...
    1. Make sure you can view the thumbnails by going to View->Thumbnails
    2. Select thumbnail of pages that does not correspond to the page # for this file
    3. Press "delete" on your keyboard to remove this pages
    4. Save the file via File->Save
1. Replace or upload to `/public/forms/` folder in the repo
