const wrapper=document.querySelector(".wrapper");
const inputFile=document.querySelector("form input");
const form=document.querySelector("form");
const infoText=document.querySelector(".content p");
const textArea=document.querySelector(".details textarea");
console.log(textArea);


// generic fetch request function.
function fetchRequest(formData,file){
    infoText.innerText="Scanning QR Code..."
    const req=new Request("http://api.qrserver.com/v1/read-qr-code/",{
        method:"POST",
        body:formData
    });
    fetch(req)
        .then((result)=>{
            if(!result.ok){
                throw new Error("It's us. Don't worry");
            }else{
                return result.json();
            }
        }).then(data=>{
            const dataField=data[0].symbol[0].data;
            infoText.innerText=dataField?"Upload QR Code to Scan":"Cuoldn't scan QR Code";
            if(!dataField) return;
            textArea.innerText=dataField;
            document.querySelector("img").src=URL.createObjectURL(file)
            
            wrapper.classList.add("active");
            console.log(data);
        }).catch((e)=>{
            // Code 404
            console.log(e.message);
            infoText.textArea="Couldn't scan the QR Code"
        })
}






// chage event on the fileInput.
inputFile.addEventListener("change", (e)=>{
    const file=e.target.files[0];
    if(!file) return;
    const formData=new FormData();
    formData.append("file", file);
    fetchRequest(formData,file);
    
})

// Event listener on form click event.
form.addEventListener("click",()=>{
    
    inputFile.click();
})
document.getElementById("close").addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});
document.getElementById("copy").addEventListener("click", (e)=>{
    navigator.clipboard.writeText(textArea.textContent);
})