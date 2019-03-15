

var exportCtrl ={

    // This function take email and sources list, generate the csv file to download
    generateCSVFile :function(data) {
      
        let csvContent = "data:text/csv;charset=utf-8,";
        // Format our csv file content
        csvContent += "email , url" + "\r\n";
        data.forEach(function (rowArray) {
        row = rowArray.email + " , " + rowArray.url.join(",");
        csvContent += row + "\r\n";
        });
        
        // Creating the file
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "emailData.csv");
        document.body.appendChild(link);
        link.click();
     }
    
}
 
 