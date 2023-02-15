const quenue = [];

function Person() {
  this.id = "";
  this.fullname = "";
  this.fname = "";
  this.lname = "";
  this.country = "";
  this.company = "";
  this.job = "";
  this.country = "";
  this.image = "";
  this.website = "";
  this.interests = "";
  this.fb = "";
  this.inst = "";
  this.link = "";
  this.twi = "";
  this.yout = "";

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


function toCSV(w) {
        const csvString = [
        [
          "ID",  
          "fullname",
          "fname",
          "lname",
          "country",
          "company",
          "job",
          "image",
          "website",
          "interests",
          "Facebook",
          "Inst",
          "Linkedin",
          "Twitter",
          "Youtube"

        ],
        ...w.map(item => [
          item.id,
          item.fullname,
          item.fname,
          item.lname,
          item.country,
          item.company,
          item.job,
          item.image,
          item.website,
          item.interests,
          item.fb,
          item.inst,
          item.link,
          item.twi,
          item.yout
        ])
      ].map(e => e.join(",")) 
       .join("\n");

       return(csvString);
}

function prsloc(min,max) {
    let i = min;
    fetch('https://ifxdubai-ultimatefintech.expoplatform.com/newfront/participant/'+i).then(function (response) {
      return response.text();
    }).then(function (html) {
      const parser = new DOMParser();
      let doc = parser.parseFromString(html, "text/html");
      let obj = JSON.parse(doc.getElementById("__NEXT_DATA__").innerHTML);
      
      let t1 = new Person();
      console.log(obj.props.pageProps.visitor);
      t1.id = obj.props.pageProps.visitor.id;
      t1.fullname = ""
      t1.fname = obj.props.pageProps.visitor.firstName;;
      t1.lname = obj.props.pageProps.visitor.lastName;;
      t1.country = "";
      t1.company = obj.props.pageProps.visitor.company_name;
      t1.job = obj.props.pageProps.visitor.position;
      t1.country = obj.props.pageProps.visitor.category_id;
      t1.image = obj.props.pageProps.visitor.photoURL;
      t1.website = obj.props.pageProps.visitor.company_website;
      t1.interests = obj.props.pageProps.visitor.category_id;
      t1.fb = obj.props.pageProps.visitor.social.facebook.value;
      t1.inst = obj.props.pageProps.visitor.social.instagram.value;
      t1.link = obj.props.pageProps.visitor.social.linkedin.value;
      t1.twi = obj.props.pageProps.visitor.social.twitter.value ;
      t1.yout = obj.props.pageProps.visitor.social.youtube.value;

quenue.push(t1)
console.log(quenue);

 return html;

}).catch(function (err) {
 // There was an error
 console.warn('Something went wrong.', err);
});

if(quenue.length > 1000) {
    download(toCSV(quenue), min+"qweasd.txt", 'text/plain');
    quenue.splice(0,quenue.length)
}

if (( i == 10000) | ( i == 11000) | ( i == 12000) | ( i == 13000) | ( i == 14000) | ( i == 17000) | ( i == 20000) | 
    ( i == 23000) | ( i == 25000) | ( i == 27000) | ( i == 29000) | ( i == 15000) | ( i == 18000) | ( i == 21000) | 
    ( i == 24000) | ( i == 26000) | ( i == 28000) | ( i == 30000) | ( i == 16000) | ( i == 19000) | ( i == 22000)) {
    download(toCSV(quenue), min+"ROUND.txt", 'text/plain');
}


  if(min<max) {
    setTimeout(() => {
      prsloc(min+1,max);
    }, "629")
  }
      download(toCSV(quenue), min+"qweasd.txt", 'text/plain');
}

prsloc(24000,26000)