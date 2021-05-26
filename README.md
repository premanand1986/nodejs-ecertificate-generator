# nodejs-ecertificate-generator

This is a service written in nodejs which generates e-certificates from an image template along with query parameters that needs to be printed on the certificate

#Query parameters
name
course
date

#there is certificate config json located at ./certJsons,
this describes the all details of the certificate, it should contain the following porperties

1. certificate_template: image location of the certificate template
2. certificate_template_out: location of the generated certifiacte
3. label_placeholders: this is a list of label_placeholder objects that contians details of each text that needs to be placed on the certificate (eg: certificate holder name , its font loation , its x,y cordinates , its text-alignment )
4. label_placeholder.param_name: query parameter name of this label (eg: name , course , date.. etc)
5. label_placeholder.alignmentX: text-alignment
6. label_placeholder.maxWidth: maximum width of the label
7. font_url: if u need the lable to be printed in a specfic font stlye, place the font file under ./fonts/ and mention the font file location here.
8. label_placeholder.x: x co-ordinate of the label
9. label_placeholder.y: x co-ordinate of the label
