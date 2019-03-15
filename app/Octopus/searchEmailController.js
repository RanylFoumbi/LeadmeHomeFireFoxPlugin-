
const url = 'https://leadmehome.io/api/lead/testSharing';
const searchBtn = document.getElementById('search__btn');
const showMoreBtn = document.getElementById("showmore");
const DivResult = document.getElementById('results');
var searchField = document.getElementById('url__field');
var P = 0;
var EmailsAndSource = [];


var SearchEmailControler ={

  AddListnerExportBtn :function(){
    document.querySelector(`.emails__export`).addEventListener("click",function(){
      exportCtrl.generateCSVFile(EmailsAndSource)
    });
  },

    /* click on Email and copy it */
    getEmailTextOnClick: function (e) {
      e.preventDefault();
      var emailText = e.target.innerHTML;
      navigator.clipboard.writeText(emailText);
      //display the "copied" text
      document.querySelector('.copied span').style.visibility = 'visible';
      // Hide the "copied text" after 2 seconds
      setTimeout(function () { 
      document.querySelector('.copied span').style.visibility = 'hidden';
      }, 2000);
    },

    addListnerOnEmail: function (){
      var EmailList = document.getElementsByClassName("email__result");
      for(var i=0; i<EmailList.length; i++){
        EmailList[i].addEventListener("click", SearchEmailControler.getEmailTextOnClick)
      }
    },


    getEmail : async (url,domain,p) => {
        
          try {
              emailSearchView.Spinner();
              const request = await axios.post(url,{url: domain,p: p})
             var emailsAndSource =  await request.data.data[0];               
              P = await request.data.data[1];
              const cansearch = await request.data.data[2];
              /* we call the view to display request results */
              emailSearchView.removeSpinner()
              emailSearchView.displayEmails(emailsAndSource,p,cansearch);
              SearchEmailControler.addListnerOnEmail();
            

              for(var item=0; item < emailsAndSource.length; item++){
                 EmailsAndSource.push(emailsAndSource[item]);
              }

             /* if emailsAndSource array is not empty displayExportBtn else hide it */
            if(EmailsAndSource.length != 0){
              emailSearchView.displayExportBtn(EmailsAndSource.length);
              SearchEmailControler.AddListnerExportBtn();
            }else{
              emailSearchView.hideExportBtn();
            }

          } 
          catch (error) {
            console.log(error); 
            emailSearchView.removeSpinner()
          }
    
      },

      extractDomain :function (url) {
        var domain;
        //find & remove protocol (http, ftp, etc.) and get domain
        if (url.indexOf("://") > -1) {
          domain = url.split('/')[2];
        }
        else {
          domain = url.split('/')[0];
        }
        
        //find & remove www
        if (domain.indexOf("www.") > -1) { 
          domain = domain.split('www.')[1];
        }
        
        domain = domain.split(':')[0]; //find & remove port number
        domain = domain.split('?')[0]; //find & remove url params
      
        return domain;
      },

    verifyUrl :function (UserInput) {
        var regex = new RegExp(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/);

        if(regex.test(UserInput) == true) {
            
           var goodDomain = this.extractDomain(UserInput);
           this.getEmail(url,goodDomain,P);
           searchField.value = goodDomain;
        }
        else{
            var msg = "Sorry, enter Valid Url!"
            emailSearchView.displayUrlErrorMessage(msg);
        }
    },

     getCurrentBrowserLink :function (tabs) {
      let tab = tabs[0]; // Safe to assume there will only be one result
      /* remove the slash at the end of the url */ 
      var url = (tab.url).substring(0,(tab.url).length - 1);
      SearchEmailControler.verifyUrl(url);
    }

}



searchBtn.addEventListener("click", function(){
  DivResult.innerHTML = "";
  var domain = document.getElementById("url__field").value;
  SearchEmailControler.verifyUrl(domain);

});

var input = document.getElementById("url__field");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    DivResult.innerHTML = "";
    var domain = document.getElementById("url__field").value;
    SearchEmailControler.verifyUrl(domain)
  }
});
 
showMoreBtn.addEventListener("click", function() {
    var domain = document.getElementById("url__field").value;
    SearchEmailControler.getEmail(url,domain,P);

});



/* call the current browser tab value*/
browser.tabs.query({currentWindow: true, active: true}).then( SearchEmailControler.getCurrentBrowserLink );