const wrapper=document.querySelector(".wrapper");
const inputFile=document.querySelector("form input");
const form=document.querySelector("form");



// generic fetch request function.
function fetchRequest(formData){
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
            console.log(data);
        }).catch(e=>console.log("error:", e.message))
}







// chage event on the fileInput.
inputFile.addEventListener("change", (e)=>{
    const file=e.target.files[0];
    const formData=new FormData();
    formData.append("file", file);
    fetchRequest(formData);
    
})

// Event listener on form submit event.
form.addEventListener("click",()=>{
    
    inputFile.click();
})