import {
  Document,
  Packer,
  Paragraph,
  Header,
  Footer,
  HeadingLevel,
  PageBreak,
  ImageRun,
} from "docx";

export async function createWordFromStructuredJson(bodyJson, headerText, footerText, logoBuffer) {
  const pages = [];

  for (let i = 0; i < bodyJson.length; i++) {
    const page = bodyJson[i];
    const children = [];

    // Image
    if (logoBuffer) {
      children.push(
        new Paragraph({
          children: [
            new ImageRun({
                type: "jpg",
                data: logoBuffer,
                transformation: {
                    width: 100,
                    height: 100,
                },
                altText: {
                    title: "The image",
                    description: "Just an image",
                    name: "Image",
                },
            }),
            // new ImageRun({
            //   data: logoBuffer,
            //   transformation: { width: 100, height: 100 },
            // }),
          ],
          alignment: "center",
        })
      );
    }

    // Body content
    page.content.forEach(section => {
      section.paragraph.forEach(item => {
        children.push(
          new Paragraph({
            text: item.text,
            bullet: item.bullet ? { level: 0 } : undefined,
          })
        );
      });
    });

    // Add page break if not last page
    if (i < bodyJson.length - 1) {
      children.push(new Paragraph({ children: [new PageBreak()] }));
    }

    pages.push(...children);
  }

  const doc = new Document({
    sections: [{
            headers: {
                default: new Header({
                    children: [new Paragraph({
                      text: headerText,
                      heading: HeadingLevel.HEADING1,
                      alignment: "center",
                      spacing: { after: 300 },
                    })],
                }),
            },
            footers: {
                default: new Footer({
                    children: [new Paragraph({
                      text: footerText,
                      alignment: "center",
                      spacing: { before: 300 },
                    })],
                }),
            },
            children: pages,
        }],
  });

  return await Packer.toBlob(doc);
}
