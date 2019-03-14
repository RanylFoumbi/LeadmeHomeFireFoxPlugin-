


emailSearchView = {
    DivResult : document.getElementById('results'),
   // NbrEmail :  document.getElementById('NbrEmail'),
    searchBtn : document.getElementById('search__btn'),

    // This function display result. It takes emails, p and isshowmore boolean
    displayEmails: function(emails, p, canSearch) {
        var html = "";
        //this.NbrEmail.innerHTML = String(emails.length);
        if(emails.length >= 1){
            emails.forEach((email, i) => {
                var sourceUrls = "";
                var numberOfSource = "";
                // Verify if a email have many sources
                if(email.url.length > 1){
                    var urls =  String(email.url).split(',');
                    urls.forEach((url) => {
                        
                        sourceUrls += `<a href="${url}">${url}</a>`;
                    })
                     
                    numberOfSource = email.url.length+' sources';
                }else{
                    sourceUrls = `<a href="${email.url}">${email.url}</a>`;
                    numberOfSource = '1 source';
                }

                html += `<div class="single__result">
                            <div class="single__result__header"> 
                                <h5 class="email__result">${email.email}</h5>
                                <p role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne${(p+i)}" aria-expanded="false" aria-controls="collapseOne${(p+i)}" class="sources">${numberOfSource} <i class="fas fa-chevron-down"></i></p>
                            </div>
                            <div id="sources_list${(+i)}" class="sources_list">
                                <div id="collapseOne${(p+i)}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne${(p+i)}">
                                    ${sourceUrls}
                                </div>
                            </div>
                        </div>`;
            });
        }else{
            html += `<div class="single__result">
                        <h5>No Email</h5>
                    </div>`;
        }
       this.DivResult.innerHTML += html;
        // Display or not Show more button
        if(canSearch){
            showMoreBtn.style.display = "block";
        }else{
            showMoreBtn.style.display = "none";
        }
    },

    // this function display Error when url is invalid
    displayUrlErrorMessage: function(msg){
        this.DivResult.innerHTML = '<h5 class="url__error">'+msg+'</h5>';
    },

    Spinner: function () {
        const spinner = '<p class="loader"><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i></p>'
        this.searchBtn.innerHTML = spinner; 
     },

     removeSpinner(){
         var spinner = document.querySelector('.loader');
         if(spinner){
            spinner.parentElement.removeChild(spinner);
            this.searchBtn.innerHTML = "Emails Addresses";
         }
     }

}
