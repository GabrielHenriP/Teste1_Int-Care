import download from 'download-pdf';
import puppeteer from 'puppeteer';

let getLink = async () => {
    
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('http://www.ans.gov.br/prestadores/tiss-troca-de-informacao-de-saude-suplementar/padrao-tiss-dezembro-2020');

  // link recebe o primeiro o link da primeira tag a da tabela
  const link = await page.$eval('a.btn.btn-primary.btn-sm.center-block', a => a.href );

  browser.close();

  return link;
};

getLink()
  .then(pdfLink => {
    let arrayLink = pdfLink.split("/");
    let options = {
      filename: arrayLink[arrayLink.length - 1]
    };

    download(pdfLink, options, err => {
      if(err){
        console.error(err)
        return
      }
      console.log(`${arrayLink[arrayLink.length - 1]} baixado com sucesso!!`)
    }) 
  })
  .catch(error => {
    console.error(error)
    return
  })