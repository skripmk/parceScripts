const q = []; 
const quenue = [];
function prsloc(cur,max) {
    let i = cur;
    fetch('https://www.icelondon.uk.com/exhibitor-list?&sortby=customfield_12158%20desc%2Ccustomfield_11984%20desc%2Ctitle%20asc&page='+i+'&searchgroup=E7A7547F-exhibitors')
    .then(function (response) {     
      return response.text();
    })
    .then(function (response) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(response, 'text/html');
        let matches = doc.querySelectorAll('li[class~="js-librarylink-entry"]')

        for(let j = 0; j< matches.length; j++)
        {
            str = matches[j].dataset.href.substr(28);
            q.push(str.substr(0,str.indexOf("'")))
        }
       if(i<max) {
        console.log(q);
        prsloc(i+1,max)
       }
    })  
} 



function Company() {
    this.id = "";
    this.name = "";
    this.image = "";
    this.categ = "";
    this.adress = "";
    this.website = "";
    this.social = "";
  }

function prsComp(cur) {

    fetch('https://www.icelondon.uk.com/'+q[cur])
    .then(function (response) {     
      return response.text();
    })
    .then(function (response) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(response, 'text/html');    
        
        
        let t1 = new Company();  
        t1.id = q[cur];
        if(doc.getElementsByClassName("m-exhibitor-entry__item__header__infos__title").item(0)) { 
            t1.name = doc.getElementsByClassName("m-exhibitor-entry__item__header__infos__title").item(0).innerHTML;
        }

        if(doc.getElementsByClassName("m-exhibitor-entry__item__header__logo").item(0)) { 
            t1.image = doc.getElementsByClassName("m-exhibitor-entry__item__header__logo").item(0).style.backgroundImage; 
        }

        if(doc.getElementsByClassName("m-exhibitor-entry__item__header__infos__categories").item(0)) { 
            t1.categ = doc.getElementsByClassName("m-exhibitor-entry__item__header__infos__categories").item(0).innerHTML; 
        }

        if(doc.getElementsByClassName("m-exhibitor-entry__item__body__contacts__address").item(0)) { 
            t1.adress = doc.getElementsByClassName("m-exhibitor-entry__item__body__contacts__address").item(0).innerHTML; 
        }
 

        if(doc.querySelectorAll('div[class~="m-exhibitor-entry__item__body__contacts__additional__button__website"] a')[0].href) { 
            t1.website = doc.querySelectorAll('div[class~="m-exhibitor-entry__item__body__contacts__additional__button__website"] a')[0].href; 
        }
      
        if(doc.querySelectorAll('ul[class~="m-exhibitor-entry__item__body__contacts__additional__social"]')[0]) { 
            t1.social = doc.querySelectorAll('ul[class~="m-exhibitor-entry__item__body__contacts__additional__social"]')[0].innerHTML; 
        }

        quenue.push(t1)
        console.log(quenue);
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
       });
}

    



function toCSV(w) {
    const csvString = [
    [
        "id",
        "Cname",
        "image",
        "categ",
        "adress",
        "website",
        "social"
    ],
    ...w.map(item => [
        item.id,
        item.name,
        item.image,
        item.categ,
        item.adress,
        item.website,
        item.social
    ])
  ].map(e => e.join(",")) 
   .join("\n");

   return(csvString);
}

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}


prsloc(1,40) 

// wait while script finishes work. after it axacute the code bellow
for (let i = 0; i<q.length;i++) {   
    setTimeout(prsComp(i),5437);
}

download(toCSV(quenue), "ice.txt", 'text/plain');